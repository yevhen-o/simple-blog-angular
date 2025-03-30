import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { ButtonComponent } from '@src/app/components/button/button.component';
import { ControllerComponent } from '@src/app/components/form/controller/controller.component';
import { AuthService, type AuthState } from '@src/app/services/authService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-signup-form',
  templateUrl: './login-signup-form.component.html',
  styleUrl: './login-signup-form.component.scss',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    ControllerComponent,
  ],
})
export class LoginSignupFormComponent {
  authState: AuthState | null = null;
  private authSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authState$.subscribe((state) => {
      this.authState = state;
    });
    this.form.valueChanges.subscribe(() => {
      this.isDirty = this.form.dirty;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  @Output() onAuthenticate = new EventEmitter<void>();
  isLogin = true;
  isSubmitting = false;
  isDirty = false;

  form = new FormGroup({});
  emailValidation: ValidatorFn[] = [Validators.required, Validators.email];
  passwordValidation: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(6),
  ];

  submit() {
    // do whatever you need with it...
    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    const formData = this.form.value as { email: string; password: string };

    if (this.isLogin) {
      this.authService.login(formData.email, formData.password).subscribe();
    } else {
      this.authService.signUp(formData.email, formData.password).subscribe();
    }
    this.form.reset();
    this.onAuthenticate.emit();
  }

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.form.reset();
    this.isDirty = false;
  }

  resetForm(): void {
    this.form.reset();
    this.isDirty = false;
  }
}
