import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';

import CELLS from 'vanta/dist/vanta.cells.min';
import * as THREE from 'three';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  title = 'choppy';

  vantaInstance: any;

  constructor(private el: ElementRef) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Initialize a specific Vanta.js effect
    this.initializeVantaEffect(CELLS);
  }

  ngOnDestroy(): void {
    // Clean up the Vanta effect when the component is destroyed
    if (this.vantaInstance) {
      this.vantaInstance.destroy();
    }
  }

  private initializeVantaEffect(effect: any): void {
    // Check if window.THREE is defined (usually by including three.min.js via a <script> tag)

    // Initialize the Vanta effect on the component's native element
    this.vantaInstance = effect({
      el: document.body,
      // Configure effect options here...
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      scale: 10.0,
      color1: 0x0,
      color2: 0x9604e6,
      size: 3.6,
    });
  }
}
