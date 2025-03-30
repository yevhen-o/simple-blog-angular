import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserMenuComponent } from '@src/app/features/authentication/user-menu/user-menu.component';
import { AddEditPostFormComponent } from '@src/app/features/blog/add-edit-post-form/add-edit-post-form.component';
import { AuthService, AuthState } from '@src/app/services/authService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-add-new',
  imports: [UserMenuComponent, CommonModule, AddEditPostFormComponent],
  templateUrl: './blog-add-new.component.html',
  styleUrl: './blog-add-new.component.scss',
})
export class BlogAddNewComponent {
  authState: AuthState | null = null;
  private authSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authState$.subscribe((state) => {
      this.authState = state;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
