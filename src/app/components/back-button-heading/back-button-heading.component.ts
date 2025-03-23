import { Component, inject } from '@angular/core';
import { SharedModule } from '@src/app/shared/shared.module';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button-heading',
  imports: [SharedModule],
  templateUrl: './back-button-heading.component.html',
  styleUrl: './back-button-heading.component.scss',
})
export class BackButtonHeadingComponent {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
