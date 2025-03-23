import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent, resolveBlogPosts } from './pages/blog/blog.component';
import {
  BlogPostComponent,
  resolveSingleBlogPosts,
} from './pages/blog-post/blog-post.component';
import { resolveUsers, UsersComponent } from './pages/users/users.component';
import {
  resolveUserById,
  UserViewComponent,
} from './pages/user-view/user-view.component';
import { UserAddNewComponent } from './pages/user-add-new/user-add-new.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'blog',
        component: BlogComponent,
        resolve: { posts: resolveBlogPosts },
      },
      {
        path: 'blog/:slug',
        component: BlogPostComponent,
        resolve: { post: resolveSingleBlogPosts },
      },
      {
        path: 'users',
        component: UsersComponent,
        resolve: { users: resolveUsers },
      },
      {
        path: 'users/add-new',
        component: UserAddNewComponent,
      },
      {
        path: 'users/:id',
        component: UserViewComponent,
        resolve: {
          user: resolveUserById,
        },
      },
      { path: 'blog/add-new', component: HomeComponent },
      { path: '', redirectTo: 'first-component', pathMatch: 'full' }, // Default route
    ],
  },
];
