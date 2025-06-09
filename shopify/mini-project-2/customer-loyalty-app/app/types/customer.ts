export interface Customer {
    id: number;
    email: string;
    name: string;
    firstName: string;
    lastName: string,
    customerIdShopify: string,
    points: {
        totalPoints: number
    },
}