import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '@src/app/components/button/button.component';
import { ControllerComponent } from '@src/app/components/form/controller/controller.component';
import { UploadFieldComponent } from '@src/app/components/form/upload-field/upload-field.component';
import { AuthService, AuthState } from '@src/app/services/authService';
import { BlogService } from '@src/app/services/blog.service';
import { PostInterface } from '@src/app/types/PostInterface';
import { getUrl, IDENTIFIERS, titleToSlug } from '@src/app/utils';
import { Subscription } from 'rxjs';

type FormData = Pick<PostInterface, 'title' | 'content' | 'slug'> & {
  tags: string;
};

@Component({
  selector: 'app-add-edit-post-form',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    ControllerComponent,
    UploadFieldComponent,
  ],
  templateUrl: './add-edit-post-form.component.html',
  styleUrl: './add-edit-post-form.component.scss',
})
export class AddEditPostFormComponent {
  authState: AuthState | null = null;
  private authSubscription: Subscription | undefined;
  blogService = inject(BlogService);
  hasCustomSlug = false;
  isSlugInUse = false;
  private router = inject(Router);
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
  titleValidation: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(3),
  ];
  tagsValidation: ValidatorFn[] = [];
  slugValidation: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(1),
  ];
  contentValidation: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(15),
  ];

  async blurHandler(): Promise<void> {
    const formData = this.form.value as FormData;
    const slug = titleToSlug(formData.title || '');
    this.form.patchValue({
      slug,
    });
    this.isSlugInUse = await this.blogService.isSlugInUse(slug);
    const slugControl = this.form.get('slug');
    if (slugControl) {
      if (this.isSlugInUse) {
        slugControl.setErrors({ slugInUse: true });
        slugControl.markAsDirty();
        slugControl.markAsTouched();
      } else {
        slugControl.setErrors(null);
      }
    }
  }

  async submit() {
    // do whatever you need with it...
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const formData = this.form.value as FormData;

    await this.blogService.postNewBlog({
      ...formData,
      image: this.image,
      tags: formData.tags.split(' ').map((tag) => tag.trim()),
      author_id: this.authState!.user!.id,
    });
    this.isSubmitting = false;
    this.form.reset();

    this.router.navigate([getUrl(IDENTIFIERS.BLOG)]);
  }

  resetForm(): void {
    this.form.reset();
    this.isDirty = false;
  }

  fileChanged(file: File | null): void {
    this.image = file;
  }
}
