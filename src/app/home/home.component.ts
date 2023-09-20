import { Component, Renderer2, ElementRef, HostListener } from '@angular/core';

declare var particlesJS: any;

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title = 'choppy';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient
  ) {}

  isLoading: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.adjustFontSize();
  }

  public ngOnInit(): void {
    this.initParticles();
    setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }
  ngAfterViewInit() {
    const cursor = this.el.nativeElement.querySelector('#cursor');
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
    this.adjustFontSize();
  }
  adjustFontSize(): void {
    const holdWidth = window.innerWidth;
    const newPercentage = (window.innerWidth / holdWidth) * 100 + '%';
    this.renderer.setStyle(
      document.documentElement,
      'font-size',
      newPercentage
    );
  }
  initParticles(): void {
    this.http.get('assets/particles-config.json').subscribe((config) => {
      particlesJS('bg', config, null);
    });
  }
}
