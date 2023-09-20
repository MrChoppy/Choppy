import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
declare var particlesJS: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  isLoading: boolean = true;
  public ngOnInit(): void {
    this.initParticles();
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
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
  }
  initParticles(): void {
    this.http.get('assets/particles-config-bubble.json').subscribe((config) => {
      particlesJS('bg', config, null);
    });
  }
}
