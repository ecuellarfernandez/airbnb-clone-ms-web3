export interface Reservation {
    id: string;
    user: { id: number; name: string; avatar: string };
    listingId: string;
    listingTitle: string;
    checkIn: string;
    checkOut: string;
    paid: boolean;
    total: number;
    status?: 'active' | 'cancelled';
}
