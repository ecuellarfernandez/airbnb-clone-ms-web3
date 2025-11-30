export interface Role {
    id: number;
    active: boolean;
    description: string;
    name: string;
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