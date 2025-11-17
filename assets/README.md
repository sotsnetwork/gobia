# Assets Directory

## Logo Setup

To add your app logo:

1. **Place your logo file** in this directory (`assets/`) with the name `logo.png`
   - Supported formats: PNG, JPG, JPEG
   - Recommended size: 512x512px or larger (square format works best)
   - The logo will be automatically resized as needed

2. **The logo will automatically appear** in:
   - Welcome Screen
   - Login Screen
   - Sign Up Screen
   - Feed Screen header

3. **To use the logo in other screens**, import and use the Logo component:
   ```typescript
   import Logo from '../components/Logo';
   
   // Then use it:
   <Logo size={60} />  // Adjust size as needed
   ```

## App Icons

For app icons (the icon that appears on the home screen), you'll need:
- `icon.png` - Main app icon (1024x1024px recommended)
- `splash.png` - Splash screen image
- `adaptive-icon.png` - Android adaptive icon foreground
- `favicon.png` - Web favicon

These are referenced in `app.json` and should be placed in the `assets/` directory.

