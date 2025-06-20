import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { currentBulkOperation } from "app/graphql/mutation";

export const action = async ({ request }: ActionFunctionArgs) => {
    const { payload, session, topic, shop, admin } = await authenticate.webhook(request);
    console.log(`Received ${topic} webhook for ${shop}`);

    if (session) {
        const response = await admin.graphql(currentBulkOperation);
        const result = await response.json();
        const url = result.data.currentBulkOperation.url;
        console.log('url====', url)
        if(!url){
            throw new Error('Not Found URL!');
        }

        const text = await fetch(url).then((response) => response.text());


    }
    return new Response();
};
