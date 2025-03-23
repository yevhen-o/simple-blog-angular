import { Component, inject } from '@angular/core';
import { ListWrapperComponent } from '@src/app/components/list-wrapper/list-wrapper.component';
import { UserService } from '@src/app/services/user.service';
import { CommonModule } from '@angular/common';
import { getUrl, IDENTIFIERS } from '@src/app/utils';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterStateSnapshot,
} from '@angular/router';
import { UserInterface } from '@src/app/types/UserInterface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  standalone: true,
  imports: [ListWrapperComponent, CommonModule, RouterLink],
})
export class UsersComponent {
  private route = inject(ActivatedRoute);
  isLoading = false;
  error: string | null = null;
  users: UserInterface[] = [];
  IDENTIFIERS = IDENTIFIERS;
  getUrl = getUrl;

  ngOnInit() {
    this.isLoading = true;
    this.route.data.subscribe({
      next: (data) => {
        this.users = data['users'];
        this.isLoading = false;
      },
      error: (e) => {
        this.error = e.message || 'Failed to load blog users.';
        this.isLoading = false;
      },
    });
  }
}

export const resolveUsers: ResolveFn<Promise<UserInterface[] | null>> = async (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const userService = inject(UserService);
  try {
    const users = await userService.getUsers();
    return users;
  } catch (error) {
    console.error('Error fetching users in resolver:', error);
    return null;
  }
};
