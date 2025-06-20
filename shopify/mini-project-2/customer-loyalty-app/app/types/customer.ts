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

export interface CustomerDetail {
    id: number;
    email: string;
    name: string,
    firstName: string;
    lastName: string;
    customerIdShopify: number;
    points: {
        totalPoints: number;
    }
    pointLogs: [
        {
            id: number;
            customerId: number;
            change: number;
            reason: string;
            type: string;
            createdAt: string
        }
    ]
}