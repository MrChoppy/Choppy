import {
  Component,
  ElementRef,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'choppy';
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/projects') {
          // Set cursor style for the ProjectsComponent route
          document.body.style.cursor = 'none'; // or the desired cursor style
        } else {
          // Reset cursor style for other routes
          document.body.style.cursor = 'none'; // or other styles
        }
      }
    });
  }
}
