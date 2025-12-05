export interface CloudinaryImage {
    publicId: string;
    url: string;
    uploadedAt?: Date;
    isTemporary?: boolean;
    listingId?: string;
    isPrimary?: boolean;
}