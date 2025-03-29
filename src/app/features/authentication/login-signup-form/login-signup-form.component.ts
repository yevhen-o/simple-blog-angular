import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '@src/app/components/button/button.component';
import { InputFieldComponent } from '@src/app/components/form/input-field/input-field.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-signup-form',
  templateUrl: './login-signup-form.component.html',
  styleUrl: './login-signup-form.component.scss',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    InputFieldComponent,
  ],
})
export class LoginSignupFormComponent implements OnInit {
  @Output() onAuthenticate = new EventEmitter<void>();
  isLogin = true;
  form!: FormGroup;
  isSubmitting = false;
  isDirty = false;
  private passwordSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Subscribe to password value changes
    this.passwordSubscription = this.password?.valueChanges.subscribe(() => {
      console.log('Password Errors:', this.password?.errors);
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.form.valueChanges.subscribe(() => {
      this.isDirty = true;
    });
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { email, password } = this.form.value;

    console.log('Form submitted:', this.form.value);

    // const authPromise = this.isLogin
    //   ? this.authService.login(email, password)
    //   : this.authService.signup(email, password);

    // authPromise
    //   .then(() => {
    //     this.onAuthenticate.emit();
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   })
    //   .finally(() => {
    //     this.isSubmitting = false;
    //   });
  }

  toggleMode(): void {
    console.log('toggleMode');
    this.isLogin = !this.isLogin;
    this.form.reset();
    this.isDirty = false;
  }

  resetForm(): void {
    this.form.reset();
    this.isDirty = false;
  }
}
