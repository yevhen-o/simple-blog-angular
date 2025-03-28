import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() id?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() isPrimary: boolean = false;
  @Input() isFlat: boolean = false;
  @Input() isRounded: boolean = false;
  @Input() className?: string;
  @Input() style?: { [key: string]: string };
  @Input() ariaLabel?: string;
}
