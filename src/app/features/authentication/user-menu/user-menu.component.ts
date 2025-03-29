import { Component } from '@angular/core';
import { ButtonComponent } from '@src/app/components/button/button.component';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { CommonModule } from '@angular/common';
import { AuthService, type AuthState } from '@src/app/services/authService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-menu',
  imports: [ButtonComponent, AuthModalComponent, CommonModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  showAuthModal = false;
  authState: AuthState | null = null;
  private authSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authState$.subscribe((state) => {
      console.log('Auth state changed:', state);
      this.authState = state;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logOut() {
    this.authService.logOut().subscribe();
  }
}
