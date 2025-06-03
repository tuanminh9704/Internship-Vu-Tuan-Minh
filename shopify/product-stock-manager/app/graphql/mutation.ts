export const UPDATE_PRICE = `
    mutation productVariantsBulkUpdate(
        $productId: ID!
        $variants: [ProductVariantsBulkInput!]!
    ) {
        productVariantsBulkUpdate(
        productId: $productId
        variants: $variants
        ) {
        product {
            id
        }
        productVariants {
            id
            price
            inventoryQuantity
        }
        userErrors {
            field
            message
        }
        }
    }
`;

export const UPDATE_QUANTITY = `
    mutation InventorySet($input: InventorySetQuantitiesInput!) {
        inventorySetQuantities(input: $input) {
            inventoryAdjustmentGroup {
                createdAt
                reason
                changes {
                name
                delta
                }
            }
            userErrors {
                field
                message
            }
        }
    }
`;
