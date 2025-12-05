export interface Listing {
    id: string;
    title: string;
    city: string;
    price: number;      
    capacity: number;  
    description: string;
    image: string;
    primaryImageUrl?: string;
    photos?: string[];
}
