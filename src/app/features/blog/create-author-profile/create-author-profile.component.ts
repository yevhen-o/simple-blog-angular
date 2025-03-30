import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@src/app/components/button/button.component';
import { ControllerComponent } from '@src/app/components/form/controller/controller.component';
import { UploadFieldComponent } from '@src/app/components/form/upload-field/upload-field.component';
import { AuthService, AuthState } from '@src/app/services/authService';
import { createAuthorProfile } from '@src/app/services/author.service';
import { PostAuthorInterface } from '@src/app/types/AuthorInterface';
import { Subscription } from 'rxjs';

type FormData = Pick<
  PostAuthorInterface,
  'first_name' | 'last_name' | 'short_bio'
>;

@Component({
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    ControllerComponent,
    UploadFieldComponent,
  ],
  selector: 'app-create-author-profile',
  templateUrl: './create-author-profile.component.html',
  styleUrl: './create-author-profile.component.scss',
})
export class CreateAuthorProfileComponent {
  authState: AuthState | null = null;
  private authSubscription: Subscription | undefined;
  private image: File | null = null;

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

  isSubmitting = false;
  isDirty = false;

  form = new FormGroup({});
  fieldValidation: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(3),
  ];

  async submit() {
    // do whatever you need with it...
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const formData = this.form.value as FormData;

    await createAuthorProfile({
      ...formData,
      image: this.image,
      author_id: this.authState!.user!.id,
    });
    this.isSubmitting = false;
    this.form.reset();
  }

  resetForm(): void {
    this.form.reset();
    this.isDirty = false;
  }

  fileChanged(file: File | null): void {
    this.image = file;
  }
}
