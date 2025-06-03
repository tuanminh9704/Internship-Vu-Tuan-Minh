export interface Product {
  id: string;
  title: string;
  description: string;
  totalInventory: string;
  images: {
    edges: {
      node: {
        url: string;
      };
    }[];
  };
}

export interface ProductDetail {
  id: string;
  title: string;
  description: string;
  colors: [];
  sizes: [],
  images: [];
  
  variants: [
    {
      id: string;
      title: string;
      price: number;
      inventoryQuantity: string;
      size: string,
      color: string
    },
  ];
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor: string;
  startCursor: string;
}

export interface Variant {
  id: string,
  title: string,
  price: number,
  inventoryQuantity: number,
  selectedOptions: [
    {
      name: string,
      value: string
    }
  ]
  optionValuesVariant: {
    Color: [],
    Size: [],
    'Age group': []
  }
  fomatOptionsSelected: {
    Color: string,
    Size: string,
    'Age group': string,
  }
    inventoryItem: {
    id: string,
    sku: string,
    tracked: boolean,
    inventoryLevels: {
      edges: [
        {
          node: {
            id: string,
            quantity: [
              {
                name: string,
                quantity: number
              }
            ],
            location: {
              id: string,
              name: string
            }
          }
        }
      ]
    }
  }
}

export interface VariantSelected {
  id: string,
  title: string,
  price: number,
  inventoryQuantity: number,
  selectedOptions: [
    {
      name: string,
      value: string
    }
  ]
  optionValuesVariant: {
    Color: string[],
    Size: string[],
    'Age group': []
  }
  inventoryItem: {
    id: string,
    sku: string,
    tracked: boolean,
    inventoryLevels: {
      edges: [
        {
          node: {
            id: string,
            quantity: [
              {
                name: string,
                quantity: number
              }
            ],
            location: {
              id: string,
              name: string
            }
          }
        }
      ]
    }
  }
}

export interface BaseProduct {
  id: string,
  description: string,
  title: string,
  images: [],
  allLocation: string[];
  optionValuesMapObj: {
    Color: [],
    Size: [],
    'Age group': []
  }
}

export interface ProductStatistics {
    countProduct: {
      count: number
    },
    inventoryTotal: number,
    totalDiscountProduct: number
}





