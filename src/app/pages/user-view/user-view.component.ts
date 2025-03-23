import { Component, inject } from '@angular/core';
import { UserService } from '@src/app/services/user.service';
import { CommonModule } from '@angular/common';
import { getUrl, IDENTIFIERS } from '@src/app/utils';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { UserInterface } from '@src/app/types/UserInterface';
import { BackButtonHeadingComponent } from '@src/app/components/back-button-heading/back-button-heading.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss',
  standalone: true,
  imports: [CommonModule, BackButtonHeadingComponent],
})
export class UserViewComponent {
  private route = inject(ActivatedRoute);
  isLoading = false;
  error: string | null = null;
  user: UserInterface | null = null;
  IDENTIFIERS = IDENTIFIERS;
  getUrl = getUrl;

  ngOnInit() {
    this.isLoading = true;
    this.route.data.subscribe({
      next: (data) => {
        this.user = data['user'];
        this.isLoading = false;
      },
      error: (e) => {
        this.error = e.message || 'Failed to load user.';
        this.isLoading = false;
      },
    });
  }
}

export const resolveUserById: ResolveFn<Promise<UserInterface | null>> = async (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const userService = inject(UserService);
  try {
    const user = await userService.getUserById(activatedRoute.params['id']);
    return user;
  } catch (error) {
    console.error('Error fetching user in resolver:', error);
    return null;
  }
};
