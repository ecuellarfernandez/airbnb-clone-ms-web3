import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    saveState(state: ListingFormState): void {
        if (!this.isBrowser) {
            return;
        }
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
        if (!this.isBrowser) {
            return null;
        }
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
        if (!this.isBrowser) {
            return;
        }
        try {
            sessionStorage.removeItem(this.STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing form state:', error);
        }
    }

    hasSavedState(): boolean {
        if (!this.isBrowser) {
            return false;
        }
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
