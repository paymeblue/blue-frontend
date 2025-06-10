# YouVerify Verification Portal Implementation

## Overview

This implementation provides a complete web verification portal using YouVerify SDKs. Users can verify their identity by entering their BVN (Bank Verification Number) or NIN (National Identification Number) and completing a liveness test.

## Features

- ✅ BVN/NIN document verification form
- ✅ Real-time form validation with Zod
- ✅ YouVerify liveness test integration
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript support
- ✅ Error handling and user feedback
- ✅ Multi-step verification flow

## File Structure

```
app/
├── (kyc_verification)/
│   └── youverify-verification/
│       ├── page.tsx                    # Main page with metadata
│       └── verification-portal.tsx     # Main verification component
├── components/ui/
│   ├── card.tsx                       # Card component for UI
│   ├── button.tsx                     # Button component
│   ├── input.tsx                      # Input component
│   ├── label.tsx                      # Label component
│   └── select.tsx                     # Select component
└── lib/
    ├── constants.ts                   # YouVerify configuration
    └── validations.ts                 # Form validation schemas
```

## Configuration

### 1. Environment Setup

Update your `.env.local` file:

```env
# YouVerify Configuration
YOUVERIFY_PUBLIC_MERCHANT_KEY_SANDBOX=test_yvpk_your_test_key
YOUVERIFY_PUBLIC_MERCHANT_KEY_PROD=prod_yvpk_your_prod_key
YOUVERIFY_VFORM_ID_SANDBOX=test_vform_id
YOUVERIFY_VFORM_ID_PROD=prod_vform_id
```

### 2. Constants Configuration

The constants are automatically configured based on `NODE_ENV`:

- Development: Uses sandbox environment
- Production: Uses production environment

## Usage

### Accessing the Portal

Navigate to: `/youverify-verification`

### Verification Flow

1. **Document Selection**: User selects BVN or NIN
2. **Form Filling**: User enters document number, first name, and last name
3. **Document Validation**: Form validates input (11-digit numbers for BVN/NIN)
4. **Liveness Test**: YouVerify SDK performs liveness detection
5. **Completion**: Success or error feedback

### Form Validation Rules

- **Document Type**: Required (BVN or NIN)
- **Document Number**:
  - Required
  - Must be exactly 11 digits
  - Auto-formatted (removes non-digits)
- **First Name**:
  - Required
  - 2-50 characters
- **Last Name**:
  - Required
  - 2-50 characters

## Technical Implementation

### YouVerify SDK Integration

```typescript
// SDK loaded dynamically
const livenessModule = window.YouverifySDK.liveness({
  publicMerchantKey: YOUVERIFY_PUBLIC_MERCHANT_KEY,
  sandboxEnvironment: process.env.NODE_ENV === "development",
  personalInformation: {
    firstName: formData.firstName,
    lastName: formData.lastName,
  },
  appearance: {
    greeting: "We need to perform a liveness test to verify your identity.",
    actionText: "Start Liveness Test",
    buttonBackgroundColor: "#4341CD",
    buttonTextColor: "#ffffff",
    primaryColor: "#4341CD",
  },
  metadata: {
    documentType: formData.documentType,
    documentNumber: formData.documentNumber,
    timestamp: new Date().toISOString(),
  },
  onSuccess: () => {
    // Handle successful verification
  },
  onFailure: (error) => {
    // Handle failed verification
  },
  onClose: () => {
    // Handle modal close
  },
});
```

### Form Management

- Uses React Hook Form for form state management
- Zod for schema validation
- Real-time validation feedback

### State Management

```typescript
interface VerificationStep {
  step: "form" | "liveness" | "success" | "error";
  data?: any;
  error?: string;
}
```

## Customization

### Styling

- Uses Tailwind CSS classes
- Card components for consistent UI
- Responsive design (mobile-first)
- Color scheme follows the app's design system

### Error Handling

- Network errors (SDK loading failures)
- Validation errors (form input)
- Verification errors (liveness test failures)
- User-friendly error messages

### Appearance Customization

Update the appearance object in the liveness configuration:

```typescript
appearance: {
  greeting: "Custom greeting message",
  actionText: "Custom button text",
  buttonBackgroundColor: "#your-color",
  buttonTextColor: "#your-color",
  primaryColor: "#your-color",
}
```

## Security Considerations

1. **API Keys**: Only public merchant keys are exposed to the frontend
2. **Data Validation**: Both client and server-side validation should be implemented
3. **HTTPS**: Always use HTTPS in production
4. **CSP**: Configure Content Security Policy for external script loading

## Dependencies

### New Dependencies Added

- `youverify-web-sdk@2.2.0`: YouVerify Web SDK

### Existing Dependencies Used

- `@hookform/resolvers`: Form validation
- `react-hook-form`: Form management
- `zod`: Schema validation
- `@radix-ui/*`: UI components
- `tailwindcss`: Styling
- `lucide-react`: Icons

## Testing

### Manual Testing Steps

1. Navigate to `/youverify-verification`
2. Test form validation:
   - Submit empty form (should show validation errors)
   - Enter invalid document numbers (should show format errors)
   - Enter valid data (should proceed to liveness test)
3. Test liveness flow:
   - Complete liveness test successfully
   - Cancel liveness test
   - Test failure scenarios

### Automated Testing (Recommended)

```typescript
// Example test structure
describe("YouVerify Verification Portal", () => {
  it("should validate form inputs correctly", () => {
    // Test validation logic
  });

  it("should handle liveness test success", () => {
    // Test success flow
  });

  it("should handle liveness test failure", () => {
    // Test error handling
  });
});
```

## Production Deployment

### Prerequisites

1. Valid YouVerify merchant account
2. Production API keys configured
3. Domain whitelisted with YouVerify

### Environment Variables

Ensure production environment variables are set:

```env
NODE_ENV=production
YOUVERIFY_PUBLIC_MERCHANT_KEY_PROD=your_prod_key
YOUVERIFY_VFORM_ID_PROD=your_prod_vform_id
```

### Performance Considerations

- SDK is loaded dynamically to reduce initial bundle size
- Images and icons are optimized SVGs
- Responsive design ensures mobile performance

## Troubleshooting

### Common Issues

1. **SDK Loading Errors**

   - Check network connectivity
   - Verify YouVerify CDN accessibility
   - Check console for script loading errors

2. **Liveness Test Not Starting**

   - Verify API keys are correct
   - Check merchant account status
   - Ensure domain is whitelisted

3. **Form Validation Issues**
   - Check Zod schema configuration
   - Verify form field names match schema
   - Check React Hook Form setup

### Debug Mode

Set `NODE_ENV=development` to enable:

- Sandbox environment
- Console logging
- Development API endpoints

## API Reference

### YouVerify Liveness SDK Methods

- `initialize()`: Prepares the liveness module
- `start()`: Starts the liveness test
- `close()`: Manually closes the liveness modal

### Callback Events

- `onSuccess()`: Verification completed successfully
- `onFailure(error)`: Verification failed
- `onClose()`: Modal was closed by user

## Support

For YouVerify-specific issues:

- Documentation: https://docs.youverify.co
- Support: https://youverify.co/support

For implementation issues:

- Check the console for error messages
- Verify all dependencies are installed
- Ensure environment variables are set correctly
