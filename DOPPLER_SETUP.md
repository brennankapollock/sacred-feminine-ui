# Doppler Integration Setup Guide

This guide explains how to set up and use Doppler for automatic secret management and Stripe API key rotation.

## 🎯 Overview

Doppler has been integrated to handle all secret management, including automatic Stripe API key rotation. This eliminates the need for manual key updates when Stripe rotates your API keys.

## 🚀 Initial Setup

### 1. Create Doppler Account & Project

1. **Sign up for Doppler**: Go to [doppler.com](https://doppler.com) and create an account
2. **Create a new project**: Name it `sacred-feminine`
3. **Set up environments**: Create `dev`, `staging`, and `production` environments

### 2. Install Doppler CLI

```bash
# macOS
brew install dopplerhq/cli/doppler

# Windows
scoop install doppler

# Linux
curl -Ls https://cli.doppler.com/install.sh | sh
```

### 3. Authenticate Doppler CLI

```bash
doppler login
```

### 4. Configure Project

```bash
# Navigate to your project directory
cd sacred-feminine-ui

# Setup Doppler project (this will create doppler.yaml)
doppler setup
# Select: sacred-feminine (project)
# Select: dev (config for local development)
```

## 📝 Migrating Secrets to Doppler

### 1. Add Secrets to Doppler

You can add secrets via the Doppler dashboard or CLI:

#### Via Doppler Dashboard:
1. Go to your Doppler project dashboard
2. Select the appropriate environment (dev/staging/production)
3. Add the following secrets:

#### Required Secrets:
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
SANITY_PROJECT_ID=n031luuh
SANITY_DATASET=production
SANITY_USE_CDN=true
SANITY_API_TOKEN=sk9rJWgKJENKieNxIJzEytaW0AnCDrH6LeKUq9sCx3FI6sKL6zC9up4tYa04i7xb3DtWjgAXJUT78rdnzw7ettyGAjC1dLIgs669CzAOY8ccIRMN2xE83bstUrgBKKcze91mmOaWIC1PgObWWXIoYqK7BMMwtDfKi5ZctyUR0uSG7BoNQDEG
MAILCHIMP_API_KEY=31288d4bb7a3531c811cec658e208c1c-us19
MAILCHIMP_API_SERVER_PREFIX=us19
MAILCHIMP_AUDIENCE_ID=749f2b97d8
MAILCHIMP_U=1c626d0a1b41d23def1efb5c8
MAILCHIMP_ID=749f2b97d8
MAILCHIMP_URL=https://sacredfeminineretreats.us19.list-manage.com/subscribe/post?u=1c626d0a1b41d23def1efb5c8&amp;id=749f2b97d8&amp;f_id=00b46fe7f0
CHECKOUT_CODE=TEMECULA
RESEND_API_KEY=re_BQ9QRkLC_KEFGKFAmwM6ndpwXF5QL2U1C
```

#### Via CLI:
```bash
# Set secrets via CLI
doppler secrets set STRIPE_SECRET_KEY=sk_test_...
doppler secrets set STRIPE_PUBLISHABLE_KEY=pk_test_...
# ... add other secrets
```

### 2. Generate Service Token

For production deployment, generate a service token:

```bash
# Generate token for production environment
doppler configs tokens create production --name="vercel-production"
```

Save this token - you'll need it for Vercel configuration.

## 🔄 Enable Stripe Auto-Rotation

### 1. Connect Stripe Account

1. In Doppler dashboard, go to **Integrations** → **Stripe**
2. Connect your Stripe account
3. Enable automatic rotation for:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`

### 2. Configure Rotation Schedule

- **Recommended**: Set rotation to happen monthly
- **Notification**: Enable email notifications for rotation events
- **Webhook**: Doppler will automatically update secrets when Stripe rotates keys

## 🚀 Deployment Configuration

### Vercel Integration

#### Option 1: Doppler-Vercel Integration (Recommended)
1. Install Doppler's Vercel integration from the Vercel marketplace
2. Connect your Doppler project to your Vercel project
3. Select which environments to sync (production → production, staging → preview, etc.)
4. Doppler will automatically sync secrets to Vercel

#### Option 2: Manual Token Setup
1. In Vercel dashboard, go to your project settings
2. Add environment variable:
   - Name: `DOPPLER_TOKEN`
   - Value: The service token you generated above
3. Set this for production environment

### Environment Variables in Vercel

After setting up Doppler integration, verify these environment variables are available in Vercel:
- `DOPPLER_TOKEN` (only needed if using manual setup)

All other secrets will be automatically synced from Doppler.

## 💻 Local Development

### Option 1: Using Doppler (Recommended)

```bash
# Run development server with Doppler
npm run dev:doppler

# Run build with Doppler
npm run build:doppler

# Run production server with Doppler
npm run start:doppler
```

### Option 2: Fallback to .env.local

If Doppler is unavailable, the application will automatically fall back to environment variables in `.env.local`.

Keep your `.env.local` file as a backup but ensure it's not committed to git.

## 🔍 Monitoring & Troubleshooting

### Checking Secret Status

```bash
# List all secrets
doppler secrets

# Get specific secret
doppler secrets get STRIPE_SECRET_KEY

# Check if secrets are syncing properly
doppler activity
```

### Verifying Integration

1. **Check Doppler Dashboard**: Monitor secret sync status
2. **Test API Endpoints**: Ensure `/api/config` returns proper Stripe keys
3. **Monitor Logs**: Check Vercel function logs for any Doppler-related errors

### Common Issues

#### "Failed to fetch secret from Doppler"
- **Cause**: Missing or invalid `DOPPLER_TOKEN`
- **Solution**: Regenerate service token and update Vercel environment variables

#### "Stripe key not found"
- **Cause**: Secret name mismatch between Doppler and application
- **Solution**: Ensure secret names in Doppler match exactly:
  - `STRIPE_SECRET_KEY` (not `STRIPE_SECRET`)
  - `STRIPE_PUBLISHABLE_KEY` (not `STRIPE_PUBLISHABLE`)

#### Application using old/cached secrets
- **Cause**: Secret caching in application
- **Solution**: Restart application or clear cache using deployment

## 🔐 Security Best Practices

1. **Service Tokens**: Use separate service tokens for each environment
2. **Access Control**: Limit who has access to production secrets
3. **Rotation Monitoring**: Set up alerts for failed rotations
4. **Backup Access**: Keep emergency access to Stripe dashboard
5. **Audit Logs**: Regularly review Doppler audit logs

## 📋 Maintenance

### Regular Tasks (Automated)
- ✅ Stripe key rotation (handled by Doppler)
- ✅ Secret syncing to Vercel (handled by integration)
- ✅ Application restart on secret changes (handled by Vercel)

### Periodic Manual Tasks
- 📅 **Monthly**: Review Doppler audit logs
- 📅 **Quarterly**: Rotate service tokens
- 📅 **Annually**: Review access permissions

## 🆘 Emergency Procedures

### If Doppler is Down
1. Application will automatically fall back to environment variables
2. Update `.env.local` with current secrets if needed
3. Deploy with environment variables until Doppler is restored

### If Stripe Keys are Compromised
1. Immediately rotate keys in Stripe dashboard
2. Doppler will automatically sync new keys within minutes
3. Monitor application logs to ensure new keys are working

### If You Need to Disable Doppler
1. Copy all secrets from Doppler to `.env.local`
2. Update Vercel environment variables manually
3. Remove `DOPPLER_TOKEN` from Vercel
4. Application will fall back to environment variables

## 📞 Support

- **Doppler Support**: [support.doppler.com](https://support.doppler.com)
- **Doppler Documentation**: [docs.doppler.com](https://docs.doppler.com)
- **Sacred Feminine Technical Issues**: Contact the development team

## 🔄 Migration Checklist

- [ ] Doppler account created
- [ ] Project and environments configured
- [ ] All secrets migrated to Doppler
- [ ] Stripe integration enabled
- [ ] Auto-rotation configured
- [ ] Vercel integration set up
- [ ] Local development tested with `npm run dev:doppler`
- [ ] Production deployment tested
- [ ] Monitoring and alerts configured
- [ ] Team trained on new workflow
- [ ] Documentation updated
- [ ] Old `.env.local` files secured/archived