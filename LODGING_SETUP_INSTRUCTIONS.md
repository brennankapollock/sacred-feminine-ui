# Lodging Management Setup Instructions

## Overview
This setup enables your client to manage lodging options through the admin interface, similar to how checkout pages are managed. The lodging options will be stored in Sanity CMS and displayed dynamically on the lodging page.

## What Has Been Implemented

### 1. API Endpoint
- **File**: `pages/api/lodging-options.js`
- **Purpose**: Fetches lodging options from Sanity CMS
- **URL**: `/api/lodging-options`

### 2. Admin Interface
- **File**: `pages/admin/lodging-options.js`
- **Purpose**: Admin page to view and manage lodging options
- **URL**: `/admin/lodging-options`
- **Features**:
  - Lists all active lodging options
  - Links to Sanity Studio for editing
  - Instructions for managing options

### 3. Updated Lodging Component
- **File**: `src/components/Lodging.js`
- **Changes**: 
  - Removed hardcoded lodging data
  - Added API integration to fetch lodging options dynamically
  - Added loading states and error handling
  - Maintains existing UI/UX design

### 4. Admin Dashboard Integration
- **File**: `pages/admin/index.js`
- **Changes**: Added "Lodging Options" card to admin dashboard

## Required Sanity Studio Setup

To complete this implementation, you need to add a new document type to your Sanity Studio schema:

### Create `lodgingOption.js` Schema

Create a new file in your Sanity Studio schema folder:

```javascript
// schemas/lodgingOption.js
export default {
  name: 'lodgingOption',
  title: 'Lodging Option',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g., "Bedroom w/ Queen Bed", "Private Room"',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description of the accommodation',
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      title: 'Type/Category',
      type: 'string',
      description: 'e.g., "Premium Plus", "Premium", "Standard", "Basic"',
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in USD (without $ symbol)',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
      description: 'Image filename (optional, will use default if not provided)'
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this option appears (lower numbers first)',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this option is currently available for selection',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      price: 'price',
      isActive: 'isActive'
    },
    prepare(selection) {
      const {title, subtitle, price, isActive} = selection
      return {
        title: title,
        subtitle: `${subtitle} - $${price} ${isActive ? '(Active)' : '(Inactive)'}`
      }
    }
  }
}
```

### Update Schema Index

Add the new schema to your main schema index file:

```javascript
// schemas/index.js (or schema.js)
import lodgingOption from './lodgingOption'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // ... your existing schemas
    lodgingOption,
  ]),
})
```

### Create Sample Data

After deploying the schema, create some sample lodging options in Sanity Studio:

1. **Bedroom w/ Queen Bed**
   - Type: "Premium Plus"
   - Price: 350
   - Display Order: 1
   - Is Active: true

2. **Private Room**
   - Type: "Premium"
   - Price: 300
   - Display Order: 2
   - Is Active: true

3. **Shared Room**
   - Type: "Standard"
   - Price: 200
   - Display Order: 3
   - Is Active: true

4. **Barn Bed**
   - Type: "Basic"
   - Price: 50
   - Display Order: 4
   - Is Active: true

## How Your Client Will Use This

### Accessing Lodging Management
1. Go to `/admin` (admin dashboard)
2. Click on "Lodging Options" card
3. View all current lodging options
4. Click "Create New Lodging Option in Sanity" to add new options
5. Click "Edit in Sanity" next to any option to modify it

### Managing Lodging Options in Sanity Studio
1. **Add New Option**: Create new lodging option documents
2. **Edit Existing**: Modify prices, descriptions, types
3. **Activate/Deactivate**: Toggle `isActive` to show/hide options
4. **Reorder**: Change `displayOrder` to control appearance order
5. **Categorize**: Use `type` field to group similar accommodations

### Key Features
- **Real-time Updates**: Changes in Sanity appear immediately on the lodging page
- **Order Control**: Use `displayOrder` to arrange options as desired
- **Easy Activation**: Toggle `isActive` to temporarily hide options without deleting
- **Flexible Pricing**: Easy price updates without code changes
- **Rich Descriptions**: Full text descriptions for each accommodation type

## Current Lodging Page Location

The lodging functionality is accessible at:
- **Public URL**: `/lodging` (requires access code "LODGE")
- **Component**: `src/components/Lodging.js`
- **Page**: `pages/lodging.js`

The hardcoded lodging options have been replaced with dynamic data from Sanity CMS, maintaining the same user experience while giving your client full control over the content.
