// jobs/syncCustomers.job.ts
import cron from 'node-cron';
import { syncCustomersFromShopify } from './services/shopifyCustomerSync.service';

export const startCustomerSyncJob = () => {
  cron.schedule('*/1 * * * *', async () => {
    console.log('[CRON] Syncing customers from Shopify...');
    try {
      await syncCustomersFromShopify();
      console.log('[CRON] Done syncing.');
    } catch (error) {
      console.error('[CRON] Error syncing customers:', error);
    }
  });
};
