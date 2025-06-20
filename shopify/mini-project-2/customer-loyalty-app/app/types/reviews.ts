export interface Review {
    id: number,
    productId: string,
    email: string,
    rate: number,
    content: string,
    isApproved: boolean,
    createdAt: string;
}