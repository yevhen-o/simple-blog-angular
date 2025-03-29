import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  @Input() label?: string;
  @Input() required?: boolean;
  @Input() htmlFor?: string;
  @Input() isInField?: boolean;
  @Input() isFilled?: boolean;
  @Input() isFocused?: boolean;
}
