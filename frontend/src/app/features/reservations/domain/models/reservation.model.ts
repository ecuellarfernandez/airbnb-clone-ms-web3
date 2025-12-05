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

// Modelo para la respuesta del backend GET /api/bookings/me
export interface BookingSummary {
    id: string;
    listingId: string;
    guestId: number;
    checkIn: string;
    checkOut: string;
    nights: number;
    pricePerNight: number;
    totalPrice: number;
    currency: string;
    status: BookingStatus;
    createdAt: string;
    updatedAt: string;
}

// Modelo para la respuesta del backend GET /api/reservations/{id}
export interface BookingDetail {
    id: string;
    listingId: string;
    guestId: number;
    checkIn: string;
    checkOut: string;
    nights: number;
    pricePerNight: number;
    totalPrice: number;
    currency: string;
    status: BookingStatus;
    createdAt: string;
    updatedAt: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
