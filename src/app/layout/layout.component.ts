import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true, // Make it standalone
  imports: [CommonModule, RouterOutlet, RouterLink], // Import CommonModule and RouterOutlet
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  currentYear: number = new Date().getFullYear();
}
