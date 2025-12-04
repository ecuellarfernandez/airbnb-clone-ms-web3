import { Injectable } from '@angular/core';
import { CloudinaryImage } from '@app/shared/cloudinary/domain/models/cloudinary-image.model';

export interface ListingFormData {
    hostId: string;
    title: string;
    description: string;
    location: {
        city: string;
        country: string;
        address: string;
        latitude: number;
        longitude: number;
    };
    price: {
        amount: number;
        currency: string;
    };
    capacity: number;
    bedrooms: number;
    bathrooms: number;
    categoryIds: string[];
    amenityIds: string[];
    images: CloudinaryImage[];
}

export interface ListingFormState {
    formData: Partial<ListingFormData>;
    uploadedImages: CloudinaryImage[];
    currentStep: number;
    lastSaved: Date;
}

@Injectable({
    providedIn: 'root'
})
export class ListingFormStateService {
    private readonly STORAGE_KEY = 'listing_form_state';

    constructor() { }

    saveState(state: ListingFormState): void {
        try {
            const stateToSave = {
                ...state,
                lastSaved: new Date()
            };
            sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (error) {
            console.error('Error saving form state:', error);
        }
    }

    loadState(): ListingFormState | null {
        try {
            const savedState = sessionStorage.getItem(this.STORAGE_KEY);
            if (!savedState) {
                return null;
            }

            const state = JSON.parse(savedState) as ListingFormState;

            if (state.lastSaved) {
                state.lastSaved = new Date(state.lastSaved);
            }

            if (state.uploadedImages) {
                state.uploadedImages = state.uploadedImages.map(img => ({
                    ...img,
                    uploadedAt: img.uploadedAt ? new Date(img.uploadedAt) : undefined
                }));
            }

            return state;
        } catch (error) {
            console.error('Error loading form state:', error);
            return null;
        }
    }

    clearState(): void {
        try {
            sessionStorage.removeItem(this.STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing form state:', error);
        }
    }

    hasSavedState(): boolean {
        return sessionStorage.getItem(this.STORAGE_KEY) !== null;
    }

    getTemporaryImages(state: ListingFormState | null): CloudinaryImage[] {
        if (!state || !state.uploadedImages) {
            return [];
        }
        return state.uploadedImages.filter(img => img.isTemporary === true);
    }

    markImagesAsPermanent(images: CloudinaryImage[]): CloudinaryImage[] {
        return images.map(img => ({
            ...img,
            isTemporary: false
        }));
    }
}
