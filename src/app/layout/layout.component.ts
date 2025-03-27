import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { getUrl, IDENTIFIERS } from '../utils';
import { UserMenuComponent } from '../features/authentication/user-menu/user-menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    UserMenuComponent,
  ],
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
