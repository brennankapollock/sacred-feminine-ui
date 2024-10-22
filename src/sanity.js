import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'n031luuh',
  dataset: 'production',
  useCdn: true, // Set to `false` for fresh data
});
