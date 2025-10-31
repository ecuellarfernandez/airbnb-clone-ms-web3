import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Step {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}

@Component({
  selector: 'app-listing-form-page',
  standalone: true,
  templateUrl: './listing-form-page.component.html',
  styleUrls: ['./listing-form-page.component.scss'],
  imports: [CommonModule]
  
})
export class ListingFormPageComponent implements OnInit {
  currentStep = 'basics';
  form: FormGroup;

  steps: Step[] = [
    { id: 'basics', label: 'Basics', completed: false, current: true },
    { id: 'details', label: 'Details', completed: false, current: false },
    { id: 'amenities', label: 'Amenities', completed: false, current: false },
    { id: 'photos', label: 'Photos', completed: false, current: false },
    { id: 'pricing', label: 'Pricing & Availability', completed: false, current: false }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      location: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.updateStepStates();
  }

  trackByStepId(index: number, step: Step): string { // Añadir este método
    return step.id;
  }

  onStepClick(stepId: string): void {
    this.currentStep = stepId;
    this.updateStepStates();
  }

  updateStepStates(): void {
    this.steps = this.steps.map(step => ({
      ...step,
      current: step.id === this.currentStep
    }));
  }

  onInputChange(field: string, value: string): void {
    this.form.patchValue({ [field]: value });
  }

  onSaveDraft(): void {
    console.log('Saving draft...', this.form.value);
  }

  onBack(): void {
    console.log('Going back...');
  }

  onNextStep(): void {
    if (this.form.valid) {
      console.log('Next step...', this.form.value);
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched();
    }
  }

  getFieldError(fieldName: string): string | null {
    const field = this.form.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} is too short`;
    }
    return null;
  }
}