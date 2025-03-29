import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  imports: [CommonModule, LabelComponent, ReactiveFormsModule],
  providers: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input({ required: true }) name: string = '';
  @Input() type: string = 'text';
  @Input() rows: string = '1';
  @Input() ariaLabel: string = '';
  @Input() ariaDescribedby: string = '';
  @Input() ariaInvalid: string | null = null;
  @Input() ariaRequired: string | null = null;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() placeholder: string = '';

  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(this.name, new FormControl(''));
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.name);
  }

  isFocused: boolean = false;
  isTouched: boolean = false;
  modelValue: any;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.modelValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleBlur(event: FocusEvent): void {
    this.isFocused = false;
    this.isTouched = true;
    this.onTouched();
  }

  handleFocus(event: FocusEvent): void {
    this.isFocused = true;
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.modelValue = target.value;
    this.onChange(this.modelValue);
  }
}
