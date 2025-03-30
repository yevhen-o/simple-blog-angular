import {
  Component,
  Input,
  inject,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matClose } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-upload-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LabelComponent,
    CommonModule,
    ButtonComponent,
    NgIcon,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  providers: [provideIcons({ matClose })],
  styleUrls: ['./upload-field.component.scss'],
  template: `
    <div class="input_field">
      <app-label *ngIf="!!label" [htmlFor]="name">
        {{ label }}
      </app-label>
      <input
        [placeholder]="placeholder"
        [formControlName]="name"
        type="file"
        [accept]="accept"
        [id]="name"
        (blur)="handleBlur($event)"
        (change)="handleChange($event)"
      />

      <div *ngIf="previewUrl">
        <div class="input_field__preview">
          <img
            [src]="previewUrl"
            alt="Preview"
            style="max-width: 200px; max-height: 200px"
          />
          <app-button
            [isFlat]="true"
            [isRounded]="true"
            (click)="handleClear()"
            class="input_field__clear"
          >
            <ng-icon name="matClose">matClose</ng-icon>
          </app-button>
        </div>
      </div>
      <div
        *ngIf="
          formControl.invalid && (formControl.dirty || formControl.touched)
        "
        class="invalid-text"
      >
        Sorry, something went wrong. Please try again.
      </div>
    </div>
  `,
})
export class UploadFieldComponent implements OnInit, OnDestroy {
  @Input({ required: true }) name = '';
  @Input() label = '';
  @Input() validation: ValidatorFn[] = [];
  @Input() accept: string = 'image/*';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() fileChanged = new EventEmitter<File | null>();

  parentContainer = inject(ControlContainer);
  previewUrl: string | ArrayBuffer | null = null;

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  get formControl() {
    return this.parentFormGroup.get(this.name) as FormControl;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(
      this.name,
      new FormControl({ value: '', disabled: this.disabled }, this.validation)
    );
  }
  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.name);
  }

  handleBlur(event: FocusEvent) {
    this.formControl.markAsTouched();
    this.blur.emit(event);
  }

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.fileChanged.emit(file);
    } else {
      this.fileChanged.emit(null);
    }
  }

  handleClear() {
    this.formControl.setValue(null);
    this.previewUrl = null;
    this.fileChanged.emit(null);
  }
}
