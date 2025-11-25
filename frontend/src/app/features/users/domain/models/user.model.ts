export interface User {
    id: number;
    name: string;
    email: string;
    role: 'guest' | 'host' | 'admin';
    active: boolean;
    avatar: string;
}
