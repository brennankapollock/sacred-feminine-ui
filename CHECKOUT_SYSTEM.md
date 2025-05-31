# Dynamic Checkout Pages System

This system allows you to create and manage multiple checkout pages directly from the Sanity CMS without needing to code new pages.

## 🚀 Quick Start

1. **Access Sanity Studio**: Go to your Sanity Studio (typically at `https://your-project.sanity.studio`)
2. **Create Checkout Page**: Navigate to "Checkout Page" content type and create a new document
3. **Configure Settings**: Fill in retreat details, payment options, colors, and access code
4. **Publish**: Make sure the page is set to "Active" and publish
5. **Access**: Your page will be live at `/checkout/your-slug`

## 📋 Content Management

### Required Fields

- **Page Title**: Browser tab title
- **URL Slug**: The URL path (e.g., `mens-retreat` becomes `/checkout/mens-retreat`)
- **Retreat Name**: Display name for the retreat
- **Payment Options**: At least one payment option with name, type, and price
- **Access Code**: Code users need to enter to access checkout

### Optional Customization

- **Description**: Text shown on the page
- **Color Scheme**: Primary, secondary, background, and text colors
- **Header Image**: Optional image for branding
- **Contact Email**: Support email (defaults to team@sacredfeminine.co)

## 💳 Payment Options

Each checkout page can have multiple payment options:

- **Full Payment**: Complete retreat cost
- **Deposit**: Initial payment to secure spot
- **Second Payment**: Remaining balance
- **Custom**: Any other payment type

### Payment Option Fields

- **Name**: Display name (e.g., "Full Retreat Payment")
- **Type**: Category label (e.g., "Full Payment", "Deposit")
- **Price**: Amount in dollars
- **Description**: Optional details about this option
- **Display Order**: Controls the order options appear (1, 2, 3, etc.)
- **Active**: Toggle to show/hide this option

## 🎨 Customization

### Color Schemes

- **Primary Color**: Main buttons and accents
- **Secondary Color**: Hover states and gradients
- **Background Gradient**: Page background (from/to colors)
- **Text Color**: Main text color

### Branding

- Upload header images
- Customize all text content
- Set custom support email

## 🔐 Access Control

Each checkout page is protected by an access code:

- Users must enter the correct code to proceed
- Codes are case-sensitive (automatically converted to uppercase)
- Custom messaging for the access page

## 📱 Features

- **Fully Responsive**: Works on all devices
- **Stripe Integration**: Automatic payment processing
- **Real-time Updates**: Changes in Sanity appear immediately
- **SEO Friendly**: Custom titles and metadata
- **Performance**: Static generation with revalidation

## 🛠 Technical Details

### File Structure

```
/src/components/
  ├── DynamicCheckout.js          # Main checkout component
  ├── DynamicCheckoutPage.js      # Access code + checkout wrapper
  └── MensCheckout.js             # Legacy static component

/pages/
  ├── checkout/[slug].js          # Dynamic route handler
  ├── admin/checkout-pages.js     # Admin overview page
  └── api/checkout-pages.js       # API to fetch all pages

/sacred-feminine-cms/schemaTypes/
  └── checkoutPageType.ts         # Sanity schema definition
```

### API Endpoints

- `GET /api/checkout-pages` - List all active checkout pages
- Dynamic pages at `/checkout/[slug]` - Individual checkout pages

## 📊 Admin Dashboard

Visit `/admin/checkout-pages` to:

- View all active checkout pages
- See payment option summaries
- Quick links to edit in Sanity
- Direct links to live pages

## 🔄 Data Flow

1. **Create in Sanity**: Content creators build checkout pages in Sanity Studio
2. **Static Generation**: Next.js generates static pages for performance
3. **Revalidation**: Pages update automatically when content changes
4. **Access Control**: Users enter code to access checkout
5. **Payment**: Stripe processes payments using dynamic product data

## 🎯 Use Cases

- **Retreat Types**: Men's retreats, women's retreats, couples retreats
- **Seasonal Offerings**: Special pricing for different times of year
- **Workshops**: Single-day or multi-day workshop registrations
- **Membership Tiers**: Different levels with various pricing
- **Early Bird Pricing**: Time-sensitive payment options

## 🚨 Important Notes

- **Access Codes**: Keep them secure and unique per retreat
- **Pricing**: Always specify prices in whole dollars (no cents)
- **Slugs**: Use URL-friendly slugs (lowercase, hyphens, no spaces)
- **Active Status**: Remember to set pages as "Active" to make them live
- **Payment Options**: At least one active payment option is required

## 🆘 Troubleshooting

### Page Not Found

- Check if the page is set to "Active" in Sanity
- Verify the slug matches the URL
- Ensure the page is published in Sanity

### Styling Issues

- Verify color values are properly set in Sanity
- Check that all required color fields have values
- Clear browser cache if styles aren't updating

### Payment Problems

- Ensure Stripe environment variables are set
- Verify payment options have valid prices
- Check that at least one payment option is active

## 📞 Support

For technical issues or questions about the checkout system:

- Email: team@sacredfeminine.co
- Admin Dashboard: `/admin/checkout-pages`
- Sanity Studio: Your studio URL
