import { Queue } from "bullmq";

export const shopifyQueue = new Queue('shopify-tasks', {
    connection: {
        host: '127.0.0.1',
        port: 6379
    }
})