import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonHeadingComponent } from '@src/app/components/back-button-heading/back-button-heading.component';

@Component({
  selector: 'app-user-add-new',
  templateUrl: './user-add-new.component.html',
  styleUrl: './user-add-new.component.scss',
  standalone: true,
  imports: [CommonModule, BackButtonHeadingComponent],
})
export class UserAddNewComponent {}
