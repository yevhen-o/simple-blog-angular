import { Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'first-component', component: FirstComponent },
      { path: 'second-component', component: SecondComponent },
      { path: '', redirectTo: 'first-component', pathMatch: 'full' }, // Default route
    ],
  },
];
