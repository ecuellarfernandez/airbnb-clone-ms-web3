export interface Reservation {
    id: number;
    user: { id: number; name: string; avatar: string };
    listingId: number;
    listingTitle: string;
    checkIn: string;
    checkOut: string;
    paid: boolean;
    total: number;
    status?: 'active' | 'cancelled';
}
