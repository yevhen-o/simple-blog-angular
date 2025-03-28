import { Component, inject } from '@angular/core';
import { SharedModule } from '@src/app/shared/shared.module';
import { Location } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matArrowBack } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-back-button-heading',
  imports: [SharedModule, NgIcon],
  templateUrl: './back-button-heading.component.html',
  styleUrl: './back-button-heading.component.scss',
  providers: [provideIcons({ matArrowBack })],
})
export class BackButtonHeadingComponent {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
