import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent, resolveBlogPosts } from './pages/blog/blog.component';

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
      { path: 'users', component: HomeComponent },
      { path: 'blog/add-new', component: HomeComponent },
      { path: '', redirectTo: 'first-component', pathMatch: 'full' }, // Default route
    ],
  },
];
