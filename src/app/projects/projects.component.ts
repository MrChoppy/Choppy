import { HttpClient } from '@angular/common/http';
import {
  Component,
  HostListener,
  ElementRef,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
declare var particlesJS: any;
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements AfterViewInit {
  showBubble: boolean = false;
  activeProject: number = -1;
  private progress = 50;
  private startX = 0;
  private active = 0;
  private isDown = false;
  private readonly speedWheel = 0.5;
  private readonly speedDrag = -0.1;
  private items: HTMLElement[] | undefined;
  private cursors: HTMLElement[] | undefined;
  isLoading: boolean = true;

  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private renderer: Renderer2
  ) {}

  public ngOnInit(): void {
    this.initParticles();
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
  ngAfterViewInit() {
    const cursor = this.el.nativeElement.querySelector('#cursor');
    this.items = Array.from(
      this.el.nativeElement.querySelectorAll('.carousel-item')
    ) as HTMLElement[];
    this.cursors = Array.from(
      this.el.nativeElement.querySelectorAll('.cursor')
    ) as HTMLElement[];
    this.animate();
    this.onItemClick(0);
    document.addEventListener('mousemove', (e) => {
      const offsetPercentageX = 5; // Adjust as needed
      const offsetPercentageY = 5; // Adjust as needed

      // Calculate the offset values
      const offsetX = (window.innerWidth * offsetPercentageX) / 100;
      const offsetY = (window.innerHeight * offsetPercentageY) / 100;

      // Update the cursor's position
      this.renderer.setStyle(cursor, 'top', e.pageY - offsetY + 'px');
      this.renderer.setStyle(cursor, 'left', e.pageX - offsetX + 'px');
    });
  }

  private getZindex(array: HTMLElement[], index: number): number[] {
    return array.map((_, i) =>
      index === i ? array.length : array.length - Math.abs(index - i)
    );
  }

  private displayItems(item: HTMLElement, index: number): void {
    const zIndex = this.getZindex([...this.items!], this.active)[index];
    item.style.setProperty('--zIndex', zIndex.toString());
    item.style.setProperty(
      '--active',
      ((index - this.active) / this.items!.length).toString()
    );
  }

  private animate(): void {
    this.progress = Math.max(0, Math.min(this.progress, 100));
    this.active = Math.floor((this.progress / 100) * (this.items!.length - 1));

    this.items!.forEach((item, index) => this.displayItems(item, index));
    //this.getCurrentItem();
  }

  onItemClick(i: number): void {
    this.progress = (i / this.items!.length) * 100 + 10;
    this.animate();
  }

  @HostListener('document:mousewheel', ['$event'])
  handleWheel(e: WheelEvent): void {
    const wheelProgress = e.deltaY * this.speedWheel;
    this.progress += wheelProgress;
    this.animate();
    this.showBubble = false;
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  handleMouseMove(e: MouseEvent | TouchEvent): void {
    if (e.type === 'mousemove' && this.cursors) {
      this.cursors.forEach(($cursor) => {
        $cursor.style.transform = `translate({e.clientX}px, {e.clientY}px)`;
      });
    }
    if (!this.isDown) return;
    const x =
      e instanceof MouseEvent
        ? e.clientX
        : (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - this.startX) * this.speedDrag;
    this.progress += mouseProgress;
    this.startX = x;
    this.animate();
  }

  @HostListener('document:mousedown', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  handleMouseDown(e: MouseEvent | TouchEvent): void {
    this.isDown = true;
    this.startX =
      e instanceof MouseEvent
        ? e.clientX
        : (e.touches && e.touches[0].clientX) || 0;
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  handleMouseUp(): void {
    this.isDown = false;
  }
  getCurrentItem(): HTMLElement | undefined {
    if (this.items) {
      console.log(this.items[this.active]);
      this.showBubble = false;
    }
    return this.items && this.items[this.active];
  }
  initParticles(): void {
    this.http.get('assets/particles-config-snow.json').subscribe((config) => {
      particlesJS('bg', config, null);
    });
  }
  showSpeechBubble(index: number) {
    this.activeProject = index;
    this.showBubble = true;
  }

  hideSpeechBubble() {
    this.activeProject = 0;
    this.showBubble = false;
  }

  projects = [
    {
      title: 'Written and signed',
      description:
        'A simple yet elegant and immersive website for your daily poems & quotes',
      links: [
        {
          text: 'Repo',
          url: 'https://github.com/MrChoppy/WrittenAndSIgned',
        },
        {
          text: 'Page',
          url: 'https://writtenandsigned.com/',
        },
      ],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/choppy-b93b4.appspot.com/o/wns.png?alt=media&token=6097a3bd-980e-46d0-96dd-dfa0577282ee',
    },
    {
      title: 'Mercury',
      description:
        'Game where you have to type the word that appears on the bottom of the screen before the tower reaches the top',
      links: [
        {
          text: 'Repo',
          url: 'https://github.com/MrChoppy/mercury',
        },
        {
          text: 'Page',
          url: 'https://mercury.choppy.zip/',
        },
      ],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/choppy-b93b4.appspot.com/o/mercury.png?alt=media&token=63671060-b973-4b7b-a0df-03659ea10b53',
    },
    {
      title: 'Seshat',
      description:
        'Done in C#. Sorts files from a source directory to a destination directory depending on the extension',
      links: [
        {
          text: 'Repo',
          url: 'https://github.com/MrChoppy/Seshat',
        },
        {
          text: 'Page',
          url: 'https://seshat.choppy.zip/',
        },
      ],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/choppy-b93b4.appspot.com/o/Seshat.png?alt=media&token=cac39bc4-6ff9-445c-a5b3-6539bca51595',
    },
  ];
}
