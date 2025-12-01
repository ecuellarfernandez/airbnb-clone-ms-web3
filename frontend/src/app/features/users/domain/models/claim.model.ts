export interface Claim {
    id: number;
    name: string;
    description: string;
    active: boolean;
}

export interface CreateClaimDTO {
    name: string;
    description: string;
    active: boolean;
}