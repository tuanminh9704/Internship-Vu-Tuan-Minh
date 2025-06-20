export interface RedeemCode {
    id: string;
    code: string;
    amount: number;
    pointUsed: number;
    createdAt: string;
    email: string;
    name: string,
    expiresAt: string,
    isUsed: boolean
}