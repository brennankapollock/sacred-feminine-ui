// Client-side configuration utility
let configCache = null;
let configPromise = null;
let retryCount = 0;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getConfig() {
  // Return cached config if available
  if (configCache) {
    return configCache;
  }

  // Return existing promise if already fetching
  if (configPromise) {
    return configPromise;
  }

  // Fetch config from API with retry logic
  configPromise = fetchConfigWithRetry()
    .then(config => {
      configCache = config;
      configPromise = null; // Reset promise after completion
      retryCount = 0; // Reset retry count on success
      return configCache;
    })
    .catch(error => {
      configPromise = null; // Reset promise on error
      console.error('Failed to fetch configuration after retries:', error);
      
      // Fallback to environment variables for backwards compatibility
      const fallbackConfig = {
        stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      };
      
      if (!fallbackConfig.stripePublishableKey) {
        console.error('No Stripe publishable key available in fallback configuration');
        throw new Error('Configuration not available and no fallback found');
      }
      
      console.warn('Using fallback configuration from environment variables');
      return fallbackConfig;
    });

  return configPromise;
}

async function fetchConfigWithRetry() {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Fetching config, attempt ${attempt + 1}/${MAX_RETRIES + 1}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch('/api/config', {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'API returned failure response');
      }
      
      console.log('Successfully fetched configuration from API');
      return data.config;
      
    } catch (error) {
      console.warn(`Config fetch attempt ${attempt + 1} failed:`, error.message);
      
      if (attempt === MAX_RETRIES) {
        throw error; // Last attempt failed, throw the error
      }
      
      // Wait before retrying (exponential backoff)
      await sleep(RETRY_DELAY * Math.pow(2, attempt));
    }
  }
}

export async function getStripePublishableKey() {
  try {
    const config = await getConfig();
    return config.stripePublishableKey;
  } catch (error) {
    console.error('Failed to get Stripe publishable key:', error);
    // Final fallback to environment variable
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  }
}

// Clear cache function for testing/development
export function clearConfigCache() {
  configCache = null;
  configPromise = null;
}