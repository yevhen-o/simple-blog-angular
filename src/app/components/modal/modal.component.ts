import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { PortalComponent } from '../portal/portal.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matClose } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, PortalComponent, NgIcon],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ matClose })],
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Input() title: string = '';
  @Input() hasCloseButton: boolean = true;
  @Input() actions?: { title: string; onClick: () => void }[];
  @Output() onClose = new EventEmitter<void>();

  @ViewChild('modalWrapper') modalWrapper!: ElementRef;

  private listener: (event: KeyboardEvent) => void;

  constructor(private elementRef: ElementRef) {
    this.listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.onClose.emit();
      }
    };
  }

  ngAfterViewInit(): void {
    document.body.addEventListener('keyup', this.listener);
  }

  ngOnDestroy(): void {
    document.body.removeEventListener('keyup', this.listener);
  }

  handleOverlayClick(event: MouseEvent) {
    if (event.target === this.modalWrapper.nativeElement) {
      this.onClose.emit();
    }
  }
}
