import { Injectable } from '@angular/core';
import { CloudinaryImage } from '@app/shared/cloudinary/domain/models/cloudinary-image.model';

export interface ListingFormState {
  formData: any;
  uploadedImages: CloudinaryImage[];
  currentStep: number;
  lastSaved: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ListingFormStateService {
  private readonly STORAGE_KEY = 'listing-form-state';

  saveState(state: ListingFormState): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
      console.log('💾 Form state saved to localStorage');
    } catch (error) {
      console.error('Error saving form state:', error);
    }
  }

  loadState(): ListingFormState | null {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved);
        console.log('📁 Form state loaded from localStorage');
        return state;
      }
    } catch (error) {
      console.error('Error loading form state:', error);
    }
    return null;
  }

  clearState(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('🗑️ Form state cleared from localStorage');
    } catch (error) {
      console.error('Error clearing form state:', error);
    }
  }
}
