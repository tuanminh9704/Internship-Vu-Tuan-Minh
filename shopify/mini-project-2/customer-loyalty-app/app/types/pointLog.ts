export interface PointLogs {
  id: number;
  customerId: number;
  change: number;
  reason: string;
  createdAt: string;
  customer: {
    id: number;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    customerIdShopify: string;
  };
}

export interface PointLogData {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  change: number;
  reason: string;
  createdAt: string;
}
