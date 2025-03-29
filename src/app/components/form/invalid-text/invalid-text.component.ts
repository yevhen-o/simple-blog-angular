import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

const VALIDATION_MESSAGES = {
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  minlength: (params: { requiredLength: number }) =>
    `Must be at least ${params.requiredLength} characters long.`,
  maxlength: (params: { requiredLength: number }) =>
    `Must be at most ${params.requiredLength} characters long.`,
  pattern: 'Invalid format.',
  // Add more custom error messages here...
};

function getValidationMessage(
  errors: ValidationErrors | null | undefined
): string | null {
  if (!errors) {
    return null;
  }

  const firstErrorKey = Object.keys(errors)[0];
  const errorMessage =
    VALIDATION_MESSAGES[firstErrorKey as keyof typeof VALIDATION_MESSAGES];

  if (typeof errorMessage === 'function') {
    return errorMessage(errors[firstErrorKey]);
  }

  return errorMessage || null;
}

@Component({
  selector: 'app-invalid-text',
  imports: [CommonModule],
  templateUrl: './invalid-text.component.html',
  styleUrl: './invalid-text.component.scss',
})
export class InvalidTextComponent implements OnChanges {
  @Input() hasSpace?: boolean;
  @Input() errors: ValidationErrors | null | undefined = null;
  errorMessage: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['errors']) {
      console.log('Errors:', this.errors);
      this.errorMessage = getValidationMessage(this.errors);
    }
  }
}
