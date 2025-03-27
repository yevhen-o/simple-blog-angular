import { Component, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '@src/app/components/modal/modal.component';
import { LoginSignupFormComponent } from '../login-signup-form/login-signup-form.component';

@Component({
  selector: 'app-auth-modal',
  imports: [ModalComponent, LoginSignupFormComponent],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
})
export class AuthModalComponent {
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onAuthenticate(): void {
    // Add your authentication logic here
    console.log('Authentication successful!');
    this.close.emit();
  }
}
