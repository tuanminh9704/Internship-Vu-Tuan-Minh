import { Worker } from "bullmq"

export const customerSyncWorker = new Worker(
    'shopify-tasks',
    async (job) =>  {
        if(job.name === 'sync-customers') {
            console.log('sync customer successfully!');
        }
    },
    { connection: { host: "localhost" } }
)

customerSyncWorker.on('completed', job => {
  console.log(`${job.id} has completed!`);
})
