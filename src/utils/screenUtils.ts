/**
 * Utility functions for screen creation and navigation
 */

export const createScreenName = (imageName: string): string => {
  // Convert image name to screen name
  // e.g., "login-screen.png" -> "LoginScreen"
  return imageName
    .replace(/\.(png|jpg|jpeg|svg)$/i, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

export const getImagePath = (imageName: string): any => {
  // This will be used to import images dynamically
  // For now, returns a require path
  return require(`../../assets/designs/${imageName}`);
};

