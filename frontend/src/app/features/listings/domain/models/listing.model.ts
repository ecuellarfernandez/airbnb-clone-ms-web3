export interface Listing {
    id: string;
    title: string;
    city: string;
    country?: string;
    priceAmount?: number;
    priceCurrency?: string;
    price: number;      
    capacity: number;  
    description: string;
    image: string;
    primaryImageUrl?: string;
    photos?: string[];
    active?: boolean;
}
