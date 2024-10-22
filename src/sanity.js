import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'n031luuh',
  dataset: 'production',
  useCdn: false, // Set to `false` for fresh data
});
