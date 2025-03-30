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

@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [ReactiveFormsModule, LabelComponent, CommonModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  styleUrls: ['./controller.component.scss'],
  template: `
    <div class="input_field" [ngClass]="{ textarea: rows !== 1 }">
      <app-label *ngIf="!!label" [htmlFor]="name">
        {{ label }}
      </app-label>
      <input
        *ngIf="rows === 1"
        [placeholder]="placeholder"
        [formControlName]="name"
        [type]="type"
        [id]="name"
        (blur)="handleBlur($event)"
      />
      <textarea
        *ngIf="rows !== 1"
        [placeholder]="placeholder"
        [formControlName]="name"
        [rows]="rows"
        [id]="name"
        (blur)="handleBlur($event)"
      ></textarea>

      <div
        *ngIf="
          formControl.invalid && (formControl.dirty || formControl.touched)
        "
        class="invalid-text"
      >
        <div *ngIf="formControl.errors?.['required']">Field is required.</div>
        <div *ngIf="formControl.errors?.['slugInUse']">
          Sorry this slug already in use.
        </div>
        <div *ngIf="formControl.errors?.['email']">Invalid email format.</div>
        <div *ngIf="formControl.errors?.['minlength']">
          Value must be at least
          {{ formControl.errors?.['minlength'].requiredLength }} characters
          long.
        </div>
      </div>
    </div>
  `,
})
export class ControllerComponent implements OnInit, OnDestroy {
  @Input({ required: true }) name = '';
  @Input() label = '';
  @Input() validation: ValidatorFn[] = [];
  @Input() rows: number = 1;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Output() blur = new EventEmitter<FocusEvent>();

  parentContainer = inject(ControlContainer);

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
}
