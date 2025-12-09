export interface CreateListingDto {
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
    images: {
        url: string;
        publicId: string;
        isPrimary: boolean;
    }[];
}

export interface ListingResponse {
    id: string;
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
    images: {
        url: string;
        publicId: string;
        isPrimary: boolean;
    }[];
    createdAt: Date;
    updatedAt: Date;

    // comentario xd
}
