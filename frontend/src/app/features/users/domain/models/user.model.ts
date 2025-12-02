export interface Claim {
    id: number;
    name: string;
    description: string;
}

export interface Role {
    id: number;
    active: boolean;
    description: string;
    name: string;
    claims?: string[]; // Array de strings con los nombres de los claims
}

export interface User {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    username: string;
    roles: Role[];
    
    avatar?: string; // el model de la db no incluye avatar, pero solo se usara para asignar un avatar random
}