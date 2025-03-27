import { Component } from '@angular/core';
import { ButtonComponent } from '@src/app/components/button/button.component';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-menu',
  imports: [ButtonComponent, AuthModalComponent, CommonModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  showAuthModal = false;
}
