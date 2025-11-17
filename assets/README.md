# Assets Directory

## Logo Setup

The app uses the Gobia logo (stylized orange 'g' on black background).

1. **Place your logo file** in this directory (`assets/`) with the name `logo.png`
   - Supported formats: PNG, JPG, JPEG
   - Recommended size: 512x512px or larger (square format works best)
   - The logo will be automatically resized as needed
   - The Logo component will automatically use it once the file is added

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

**Note:** The app will work without these icons, but you'll see warnings. Add them when you're ready to publish.

