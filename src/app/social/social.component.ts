import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
declare var particlesJS: any;
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
})
export class SocialComponent {
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
      this.renderer.setStyle(cursor, 'top', e.pageY + 'px');
      this.renderer.setStyle(cursor, 'left', e.pageX + 'px');
    });
  }
  initParticles(): void {
    this.http.get('assets/particles-config-bubble.json').subscribe((config) => {
      particlesJS('bg', config, null);
    });
  }

  sendEmail(event: Event, email: string) {
    if (this.isValidEmail(email)) {
      event.preventDefault(); // Prevent the default behavior of the link
      window.location.href = 'mailto:' + email;
    }
  }
  isValidEmail(email: string): boolean {
    return email.includes('@');
  }
  social = [
    {
      name: 'Github',
      description: 'MrChoppy',
      link: 'https://github.com/MrChoppy',
      image:
        'https://firebasestorage.googleapis.com/v0/b/choppy-b93b4.appspot.com/o/github.svg?alt=media&token=0ab944fc-9c73-4f60-a087-7106ae4647d7',
    },
    {
      name: 'E-Mail',
      description: 'jhayek.professional@gmail.com',
      link: '',
      image:
        'https://firebasestorage.googleapis.com/v0/b/choppy-b93b4.appspot.com/o/email.svg?alt=media&token=133e4053-d748-40d6-a439-8c91a0a6470b',
    },
    {
      name: 'LinkedIn',
      description: '',
      link: 'https://www.linkedin.com/in/joseph-el-hayek-09350528b/',
      image:
        'https://firebasestorage.googleapis.com/v0/b/choppy-b93b4.appspot.com/o/linkedin.svg?alt=media&token=21fb5e8e-526e-4a52-9029-ae9ccbc251fd',
    },
  ];
}
