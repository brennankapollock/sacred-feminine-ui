import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET;
const apiVersion = '2021-10-21';
const useCdn = (process.env.NEXT_PUBLIC_SANITY_USE_CDN || 'true') === 'true';

// Export a safe client that doesn't crash import-time if env is missing.
// When not configured, methods will throw a clear error only when called.
export const client = projectId && dataset
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : {
      fetch: async () => {
        throw new Error(
          'Sanity client is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in your environment.'
        );
      },
      listen: () => ({ subscribe: () => ({ unsubscribe() {} }) }),
      config: () => {},
    };
