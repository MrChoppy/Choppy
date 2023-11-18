import { HttpClient } from '@angular/common/http';
import {
  Component,
  HostListener,
  ElementRef,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute } from '@angular/router';
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
  private readonly speedWheel = 0.2;
  private readonly speedDrag = -0.1;
  private items: HTMLElement[] | undefined;
  private cursors: HTMLElement[] | undefined;
  isLoading: boolean = true;
  projects!: any[];
  projectsLoading: boolean = true;
  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.projects = data['projects'];
      this.projectsLoading = false;
      console.log(this.projects);
    });

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
}
