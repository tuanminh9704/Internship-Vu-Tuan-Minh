import { useLoaderData, useNavigation } from "@remix-run/react";
import shopify from "app/shopify.server";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { GET_PRODUCT } from "app/graphql/queries";
import type { ProductDetail } from "app/types/product";
import { GetProductDetail } from "app/components/GetProductDetail";
import {
  getOptionValuesMapObj,
  getOptionValuesVariant,
} from "app/utils/getOptionValuesMapObj";
import { getOptionValuesMapObjRecordKeys } from "app/utils/getOptionValuesMapObjRecordKeys";
import { fomatSelectedOption } from "app/utils/fomatSelectedOption";
import { UPDATE_PRICE, UPDATE_QUANTITY } from "app/graphql/mutation";
import invariant from "tiny-invariant";
import { requireShopifySession } from "app/middleware/requireShopifySession";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) {
    throw new Error("Product id is missing!");
  }
  try {
    const deCodedId: string = decodeURIComponent(id as string);
    const { admin } = await requireShopifySession(request);
    const response = await admin.graphql(GET_PRODUCT, {
      variables: {
        id: deCodedId,
        first: 10,
      },
    });
    const productData = await response.json();

    const product = productData.data.product;

    const variants = product.variants.edges.map((variant: any) => variant.node);
    const optionValuesMapObj = getOptionValuesMapObj(variants);

    const optionValuesMapObjRecordKeys =
      getOptionValuesMapObjRecordKeys(optionValuesMapObj);

    const url = new URL(request.url);
    const variantId = url.searchParams.get("variantId");

    let variantSelected = variants.find(
      (variant: any) => variant.id === variantId,
    );

    if (!variantSelected) {
      variantSelected = variants[0];
    }

    const optionValuesVariant = getOptionValuesVariant(variantSelected);
    variantSelected.optionValuesVariant = optionValuesVariant;

    let allLocation : any = [];

    for (const variant of variants) {
      const optionValuesVariant = getOptionValuesVariant(variant);
      variant.optionValuesVariant = optionValuesVariant;
      const fomatOptionsSelected = fomatSelectedOption(optionValuesVariant);
      variant.fomatOptionsSelected = fomatOptionsSelected;
      const inventoryItem = variant?.inventoryItem;
      if(inventoryItem) {
        const locations = inventoryItem?.inventoryLevels.edges.map((edge: any) => edge.node.location['name']);
        for (const location of locations) {
          if (location && !allLocation.includes(location)) {
            allLocation.push(location);
          }
        }
      }
    }
    const baseProduct = {
      id: product.id,
      description: product.description,
      title: product.title,
      images: product.images.edges.map((edge: any) => edge.node.url),
      optionValuesMapObj: optionValuesMapObj,
      allLocation: allLocation
    };
    return {
      baseProduct,
      variants,
      variantSelected,
      optionValuesMapObjRecordKeys,
    };
  } catch (error) {
    console.log("[ERROR]: ", error);
    throw new Error("Interal Server Error!");
  }
};

export const updateVariant = async (graphql: any, variables: any, mutationCommandGql : any) => {
  try {
    const response = await graphql(mutationCommandGql, {variables})
    const data = response.json();
    return data;
  } catch (error) {
    console.log('[ERROR]: ', error);
    throw new Error('Price variant updated failed')
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { admin: {graphql}, session } = await shopify.authenticate.admin(request);
    invariant(session.shop, "Shop not found");

    const formData = await request.formData();
    const price = Number(formData.get("price"));
    const quantity = Number(formData.get("quantity"));
    const variantId = formData.get("variantId")?.toString().trim();
    const inventoryItemId = formData.get('inventoryItemId')?.toString().trim();
    const compareQuantity = Number(formData.get('compareQuantity'));
    const locationId = formData.get('locationId')?.toString().trim();
    const productId = formData.get("productId")?.toString().trim();
    if (
      !variantId || !inventoryItemId || !locationId || !productId ||
      isNaN(price) || isNaN(quantity) || isNaN(compareQuantity)
    ) {
      return {
        error: "Invalid input data." , 
        status: 400 
      }
    }

    const listUpdatePromise = [];
    const variableUpdatePrice = {
      productId: productId,
      variants: {
        id: variantId,
        price: price,
      }
    }
    listUpdatePromise.push(updateVariant(graphql, variableUpdatePrice, UPDATE_PRICE));

    const variablesUpdateQuantity = {
      input: {
        name: "available",
        reason: "correction",
        quantities: [
          {
            inventoryItemId: inventoryItemId,
            locationId: locationId,
            quantity: quantity,
            compareQuantity: Number(compareQuantity),
          }
        ]
      }
    }    

    listUpdatePromise.push(updateVariant(graphql, variablesUpdateQuantity, UPDATE_QUANTITY));
    await Promise.allSettled(listUpdatePromise);

    return {
      message: 'Updated successfully!',
      success: true
    };

  } catch (error) {
    console.log('[ERROR]: ', error)
    throw new Error("Interal Server Error!");
  }
};

export default function ProductDetail() {
  const {
    baseProduct,
    variants,
    variantSelected,
    optionValuesMapObjRecordKeys,
  }: any = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <GetProductDetail
      baseProduct={baseProduct}
      variants={variants}
      variantSelected={variantSelected}
      optionValuesMapObjRecordKeys={optionValuesMapObjRecordKeys}
      isLoading={isLoading}
    />
  );
}
