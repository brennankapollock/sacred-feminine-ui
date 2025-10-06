# Sacred Feminine - Frontend Application

The frontend web application for Sacred Feminine, built with Next.js 13. This application serves the public website for retreat management, resource sharing, and community engagement.

> **Note**: This is part of a larger platform. See the [main project README](../README.md) for complete documentation.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

## 🛠️ Tech Stack

- **Framework**: Next.js 13.2.4 with Pages Router
- **Styling**: Tailwind CSS + Shadcn UI Components  
- **Content**: Sanity CMS integration
- **Payments**: Stripe integration
- **Email**: EmailJS, Mailchimp, Resend
- **Analytics**: Vercel Analytics
- **Secret Management**: Doppler integration

## 📁 Project Structure

```
sacred-feminine-ui/
├── pages/                 # Next.js pages and API routes
│   ├── api/              # Backend API endpoints
│   ├── admin/            # Admin panel pages
│   ├── retreats/         # Dynamic retreat pages
│   └── *.js              # Static pages
├── src/
│   ├── components/       # Reusable React components
│   ├── contexts/         # React context providers
│   ├── layout/          # Layout components
│   └── pages/           # Page-specific components
├── lib/                 # Utility functions and configs
├── public/              # Static assets (images, icons)
├── styles/              # Global CSS and Tailwind config
└── components.json      # Shadcn UI configuration
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` from `.env.example`:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_USE_CDN=true

# Stripe Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Email Services
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_USER_ID=your_user_id
RESEND_API_KEY=your_resend_key

# Mailchimp
MAILCHIMP_API_KEY=your_api_key
MAILCHIMP_AUDIENCE_ID=your_audience_id

# Admin Authentication
ADMIN_CODE=your_secure_admin_code

# Optional: Doppler
DOPPLER_TOKEN=your_doppler_token
```

### Doppler Integration

This project supports Doppler for secure secret management:

```bash
# Install Doppler CLI
curl -Ls https://cli.doppler.com/install.sh | sh

# Login and configure
doppler login
doppler setup

# Run with Doppler secrets
npm run dev:doppler
npm run build:doppler
npm run start:doppler
```

## 🏗️ Key Features

### Retreat Management
- **Dynamic Retreat Pages**: Individual pages for each retreat with full details
- **Multi-tier Pricing**: Full price, partial scholarship, full scholarship options
- **Secure Checkout**: Stripe integration with PCI compliance
- **Lodging Options**: Additional accommodation booking
- **Preparation Materials**: Pre-retreat resources and guides

### Resource Library  
- **Categorized Content**: Books, music, films organized by type
- **Dynamic Loading**: Content managed through Sanity CMS
- **External Links**: Direct purchase/access integration
- **Search & Filter**: Easy content discovery

### Admin Panel
- **Code-based Auth**: Secure admin access with custom codes
- **Protected Routes**: Middleware-protected admin areas
- **Analytics Dashboard**: Retreat and user engagement metrics
- **Content Management**: Direct CMS integration

### Payment Processing
- **Stripe Integration**: Secure payment processing
- **Multiple Payment Types**: One-time and recurring payments
- **Scholarship Support**: Automated pricing tiers
- **Success/Failure Handling**: Robust payment flow management

## 📱 Pages & Components

### Main Pages
- **Homepage** (`pages/index.js`): Main landing with all sections
- **Retreat Details** (`pages/retreats/[slug].js`): Dynamic retreat pages
- **Checkout** (`pages/checkout.js`): Payment processing
- **Admin** (`pages/admin/`): Administrative interface

### Key Components

#### Layout Components
- `Layout.js` - Main application wrapper
- `Header.js` - Navigation and branding
- `Footer.js` - Site footer with contact info

#### Feature Components  
- `Retreats.js` - Retreat listing and filtering
- `RetreatDetails.js` - Individual retreat display
- `Checkout.js` - Payment form handling
- `Resources.js` - Resource library display
- `Contact.js` - Contact form with email integration

#### Admin Components
- `AdminAuth.tsx` - Authentication interface
- `AdminDashboard.js` - Main admin panel

## 🎨 Styling System

### Tailwind Configuration
Custom design system with Sacred Feminine branding:

```javascript
// Primary colors
persian_red: '#D13835'     // Main brand color
desert_sand: '#e4b79b'     // Secondary/accent color

// Typography
fontFamily: {
  inter: ['Inter', 'sans-serif']
}
```

### Component System
- **Shadcn UI**: Base component library
- **Custom Components**: Branded variations
- **Responsive Design**: Mobile-first approach
- **Dark Mode Support**: System preference detection

## 🛡️ Security

### Authentication
- **Admin Code System**: Simple but secure admin access
- **Protected Routes**: Middleware-based route protection
- **Session Management**: Secure cookie handling

### Data Protection
- **Environment Variables**: Secure secret management
- **API Rate Limiting**: Built-in Next.js protection
- **HTTPS Enforcement**: Production security headers

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Connect to Vercel
vercel

# Configure environment variables in Vercel dashboard
# Deploy automatically on git push
```

### Manual Deployment
```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

### Environment Setup
1. Set all environment variables in deployment platform
2. Configure domain and SSL certificates
3. Set up webhook endpoints for Stripe
4. Configure CORS settings in Sanity

## 🔍 API Routes

- `POST /api/checkout-sessions` - Create Stripe checkout sessions
- `POST /api/contact` - Handle contact form submissions  
- `POST /api/subscribe` - Mailchimp newsletter subscription
- `GET /api/retreats` - Fetch retreat data from Sanity
- `GET /api/config` - Application configuration

## 📊 Analytics & Monitoring

- **Vercel Analytics**: Page views, performance metrics
- **Stripe Dashboard**: Payment analytics and monitoring
- **Mailchimp Reports**: Email campaign performance
- **Custom Events**: User interaction tracking

## 🧪 Development

### Available Scripts
```bash
npm run dev            # Development server
npm run dev:doppler    # Development with Doppler secrets
npm run build          # Production build
npm run build:doppler  # Build with Doppler secrets  
npm run start          # Production server
npm run lint           # ESLint checking
```

### Code Standards
- **ESLint**: Configured linting rules
- **Prettier**: Code formatting (configured in package.json)
- **Component Pattern**: Functional components with hooks
- **File Naming**: PascalCase for components, camelCase for utilities

### Testing Locally
1. Start development server: `npm run dev`
2. Test payment flow with Stripe test cards
3. Verify email delivery in test mode
4. Check mobile responsiveness
5. Test admin authentication flow

## 🔧 Troubleshooting

### Common Issues

**Build Failures**
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**Environment Variables Not Loading**
- Ensure `.env.local` exists and has correct variables
- Restart development server after changes
- Check variable names match exactly (case-sensitive)

**Stripe Integration Issues**  
- Verify test/live mode consistency
- Check webhook endpoints are configured
- Ensure API keys are valid and active

**Sanity Connection Problems**
- Verify project ID and dataset configuration
- Check CORS settings in Sanity dashboard
- Ensure API token has proper permissions

## 📞 Support

For technical support or questions specific to the frontend application:

1. Check the [main project documentation](../README.md)
2. Review error logs in browser console
3. Verify environment configuration
4. Test integrations individually

---

*Part of the Sacred Feminine platform - see main README for complete project documentation.*
