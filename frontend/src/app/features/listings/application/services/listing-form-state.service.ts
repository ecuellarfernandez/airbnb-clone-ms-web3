import { Injectable } from '@angular/core';
import { CloudinaryImage } from '@app/shared/cloudinary/domain/models/cloudinary-image.model';

export interface ListingFormState {
  formData: any;
  uploadedImages: CloudinaryImage[];
  currentStep: number;
  lastSaved: Date;
  hostId?: string; // Para validar cambio de usuario
}

@Injectable({
  providedIn: 'root'
})
export class ListingFormStateService {
  private readonly STORAGE_KEY = 'listing-form-state';
  private readonly EDIT_DATA_KEY = 'listing-edit-data';

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

  /**
   * Verifica si el estado guardado es válido para el usuario actual
   * Si el hostId no coincide, el estado no es válido
   */
  isStateValidForUser(currentHostId: string): boolean {
    const state = this.loadState();
    if (!state) return false;

    // Si el estado tiene hostId y no coincide con el usuario actual, invalidar
    if (state.hostId && state.hostId !== currentHostId) {
      console.log('⚠️ Saved state belongs to different user, invalidating...');
      this.clearState();
      return false;
    }

    return true;
  }

  clearState(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('🗑️ Form state cleared from localStorage');
    } catch (error) {
      console.error('Error clearing form state:', error);
    }
  }

  /**
   * Limpia todos los datos relacionados con el formulario de listing
   * Incluyendo datos de edición
   */
  clearAllFormData(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.EDIT_DATA_KEY);
      console.log('🗑️ All form data cleared from localStorage');
    } catch (error) {
      console.error('Error clearing all form data:', error);
    }
  }
}
