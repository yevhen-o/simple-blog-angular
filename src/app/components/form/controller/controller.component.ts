import { Component, Input, inject, OnInit, OnDestroy } from '@angular/core';
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
    <div class="input_field">
      <app-label *ngIf="!!label" [htmlFor]="name">
        {{ label }}
      </app-label>
      <input [formControlName]="name" type="text" [id]="name" />
      <div
        *ngIf="
          formControl.invalid && (formControl.dirty || formControl.touched)
        "
        class="invalid-text"
      >
        <div *ngIf="formControl.errors?.['required']">Field is required.</div>
        <div *ngIf="formControl.errors?.['email']">Invalid email format.</div>
        <div *ngIf="formControl.errors?.['minlength']">
          Password must be at least 6 characters long.
        </div>
      </div>
    </div>
  `,
})
export class ControllerComponent implements OnInit, OnDestroy {
  @Input({ required: true }) name = '';
  @Input() label = '';
  @Input() validation: ValidatorFn[] = [];

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
      new FormControl('', this.validation)
    );
  }
  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.name);
  }
}
