import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent {
  sections: any[] = [
    {
      title: 'About',
      info: [
        {
          description:
            "I'm Joseph, a developer with a passion for innovation and a love for turning ideas into digital reality.",
        },
      ],
      cssClass: 'section1', // Add a class name for this section
    },

    {
      title: 'Projects',
      info: [
        {
          name: 'Written and signed',
          description:
            'A simple yet elegant and immersive website for your daily poems & quotes',
          link: 'https://writtenandsigned.com/',
        },
        {
          name: 'ChoppySorter',
          description:
            'Organizes files in a directory based on their file extensions',
          link: 'https://github.com/MrChoppy/ChoppySorter',
        },
        { name: 'link 2', description: 'Desc link 2' },
      ],
      cssClass: 'section2', // Add a class name for this section
    },
    {
      title: 'Social',
      info: [
        {
          name: 'Github',
          description: 'MrChoppy',
          link: 'https://github.com/MrChoppy',
          image: 'https://example.com/image3.jpg',
        },
      ],
      cssClass: 'section1', // Add a class name for this section
    },
  ];
}
