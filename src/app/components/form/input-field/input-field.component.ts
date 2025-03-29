import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InvalidTextComponent } from '../invalid-text/invalid-text.component';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  imports: [CommonModule, InvalidTextComponent, LabelComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() rows: string = '1';
  @Input() errors: any | null = null;
  @Input() ariaLabel: string = '';
  @Input() ariaDescribedby: string = '';
  @Input() ariaInvalid: string | null = null;
  @Input() ariaRequired: string | null = null;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() placeholder: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['errors']) {
      console.log('InputFieldComponent - Errors changed:', this.errors);
    }
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
