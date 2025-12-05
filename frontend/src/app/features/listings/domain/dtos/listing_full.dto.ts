export interface ListingCategoryDto {
	id: string;
	name: string;
	icon: string;
	categoryTypeName: string;
}
export interface ListingImageDto {
	id: string;
	mediaId: string | null;
	mediaUrl: string;
	publicId: string | null;
	isPrimary: boolean;
	displayOrder: number;
}

export interface ListingFullDto {
	id: string;
	hostId: number;
	title: string;
	description: string;
	city: string;
	country: string;
	address: string;
	latitude: number;
	longitude: number;
	priceAmount: number;
	priceCurrency: string;
	capacity: number;
	bedrooms: number;
	bathrooms: number;
	images: Array<ListingImageDto>;
	categories: Array<ListingCategoryDto>;
	amenities: any[];
	createdAt: string;
	updatedAt: string;
	active: boolean;
}
