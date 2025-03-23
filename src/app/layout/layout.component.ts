import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { getUrl, IDENTIFIERS } from '../utils';

@Component({
  selector: 'app-layout',
  standalone: true, // Make it standalone
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive], // Import CommonModule and RouterOutlet
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  currentYear: number = new Date().getFullYear();
  items = [
    { link: getUrl(IDENTIFIERS.HOME), title: 'Home' },
    { link: getUrl(IDENTIFIERS.BLOG), title: 'Blog' },
    { link: getUrl(IDENTIFIERS.USERS), title: 'Users' },
    {
      link: getUrl(IDENTIFIERS.BLOG_ADD),
      title: 'Add new post',
      className: 'primary',
    },
  ];
}
