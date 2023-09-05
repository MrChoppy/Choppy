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
      cssClass: 'section1',
    },

    {
      title: 'Projects',
      info: [
        {
          name: 'Written and signed',
          description:
            'A simple yet elegant and immersive website for your daily poems & quotes',
          links: [
            {
              text: 'Page',
              url: 'https://writtenandsigned.com/',
            },
          ],
        },
        {
          name: 'ChoppySorter',
          description:
            'Organizes files in a directory based on their file extensions',
          links: [
            {
              text: 'Repo',
              url: 'https://github.com/MrChoppy/ChoppySorter',
            },
          ],
        },
        {
          name: 'Seshat',
          description:
            'Remade the ChoppySorter but a lot better and in c#. Simple UI to get the job done. Might add some functionalities if any idea comes to mind.',
          links: [
            {
              text: 'Repo',
              url: 'https://github.com/MrChoppy/Seshat',
            },
            {
              text: 'Page',
              url: 'https://seshat.choppy.zip/',
            },
            // Add more links as needed
          ],
        },
      ],
      cssClass: 'section2',
    },
    {
      title: 'Social',
      info: [
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
      ],
      cssClass: 'section3',
    },
  ];

  sendEmail(event: Event, email: string) {
    if (this.isValidEmail(email)) {
      event.preventDefault(); // Prevent the default behavior of the link
      window.location.href = 'mailto:' + email;
    }
  }
  isValidEmail(email: string): boolean {
    return email.includes('@');
  }
}
