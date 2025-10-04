import { DopplerSDK } from '@dopplerhq/node-sdk'

// Initialize Doppler SDK
const doppler = new DopplerSDK({
  accessToken: process.env.DOPPLER_TOKEN
})

// Cache for secrets to avoid repeated API calls
const secretsCache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function getSecret(key, fallbackValue = null) {
  try {
    // Check cache first
    const cached = secretsCache.get(key)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.value
    }

    // Only try Doppler if token is available
    if (!process.env.DOPPLER_TOKEN) {
      console.warn(`No DOPPLER_TOKEN found, skipping Doppler for ${key}`)
      throw new Error('DOPPLER_TOKEN not available')
    }

    // Fetch from Doppler with timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Doppler request timeout')), 10000)
    )
    
    const secretPromise = doppler.secrets.get(key)
    const secret = await Promise.race([secretPromise, timeoutPromise])
    const value = secret.computed

    // Cache the result
    secretsCache.set(key, {
      value,
      timestamp: Date.now()
    })

    console.log(`Successfully fetched ${key} from Doppler`)
    return value
  } catch (error) {
    console.error(`Failed to fetch secret ${key} from Doppler:`, error.message)
    
    // Try environment variable fallback
    const envValue = process.env[key]
    if (envValue) {
      console.warn(`Using environment variable fallback for ${key}`)
      // Cache the fallback value briefly
      secretsCache.set(key, {
        value: envValue,
        timestamp: Date.now()
      })
      return envValue
    }

    // Use provided fallback
    if (fallbackValue !== null) {
      console.warn(`Using provided fallback for ${key}`)
      return fallbackValue
    }

    throw new Error(`Secret ${key} not found in Doppler or environment variables`)
  }
}

export async function getStripeKeys() {
  try {
    const [publishableKey, secretKey] = await Promise.all([
      getSecret('STRIPE_PUBLISHABLE_KEY'),
      getSecret('STRIPE_SECRET_KEY')
    ])

    return {
      publishableKey,
      secretKey
    }
  } catch (error) {
    console.error('Failed to fetch Stripe keys:', error.message)
    throw error
  }
}

export async function getAllSecrets() {
  try {
    const secrets = await doppler.secrets.list()
    return secrets.reduce((acc, secret) => {
      acc[secret.name] = secret.computed
      return acc
    }, {})
  } catch (error) {
    console.error('Failed to fetch all secrets from Doppler:', error.message)
    throw error
  }
}

// Clear cache function for testing/debugging
export function clearSecretsCache() {
  secretsCache.clear()
}