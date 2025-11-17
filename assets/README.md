# Assets Directory

## Logo Setup

- The app now uses the Gobia logo stored at `assets/logo.png`.
- Replace that file with any updated branding (keep the filename).
- Recommended format: 512x512px PNG with transparent or solid background.
- The `Logo` component automatically displays this asset across:
  - Welcome Screen
  - Login Screen
  - Sign Up Screen
  - Feed Screen header

To reuse the logo elsewhere:
```typescript
import Logo from '../components/Logo';
<Logo size={60} />
```

## App Icons

For app icons (the icon that appears on the home screen), you'll need:
- `icon.png` - Main app icon (1024x1024px recommended)
- `splash.png` - Splash screen image
- `adaptive-icon.png` - Android adaptive icon foreground
- `favicon.png` - Web favicon

These are referenced in `app.json` and should be placed in the `assets/` directory.

**Note:** The app will work without these icons, but you'll see warnings. Add them when you're ready to publish.

