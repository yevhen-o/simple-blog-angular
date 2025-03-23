import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import classNames from 'classnames';

@Component({
  selector: 'app-list-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-wrapper.component.html',
  styleUrl: './list-wrapper.component.scss',
})
export class ListWrapperComponent {
  @Input() className: string = '';
  classNames = classNames;
}
