import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import 'react-native-screens';

import { RootStackParamList } from './src/types/navigation';
import * as AuthService from './src/services/authService';

// Auth Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

// Main Tab Navigator
import MainTabNavigator from './src/navigators/MainTabNavigator';

// Main Screens
import PostDetailScreen from './src/screens/PostDetailScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import QuotePostScreen from './src/screens/QuotePostScreen';
import PostAnalyticsScreen from './src/screens/PostAnalyticsScreen';

// Profile Screens
import MyProfileScreen from './src/screens/MyProfileScreen';
import {
  UserProfileScreen,
  EditProfileScreen,
  CommunityDetailScreen,
  CreateCommunityScreen,
  GroupsScreen,
  AdvancedSearchScreen,
  AdvancedUserSearchScreen,
  MessagesScreen,
  ChatScreen,
  PrivacySettingsScreen,
  NotificationSettingsScreen,
  ExportUserDataScreen,
  FAQsScreen,
  ReportIssueScreen,
  ShareFeedbackScreen,
  TermsOfServiceScreen,
  PrivacyPolicyScreen,
  CommunityGuidelinesScreen,
  AdminOptionsScreen,
  ContentModerationScreen,
  CommunityModerationScreen,
  SavedPostsScreen,
  SavedCommentsScreen,
  SavedSearchesScreen,
  DraftsScreen,
  ArchivedPostsScreen,
  ActivityLogScreen,
  TrendingTopicsScreen,
  CollaborationRequestsScreen,
  CommunityAwardsScreen,
  CommunityInsightsScreen,
} from './src/screens/PlaceholderScreens';

// Community Screens (already imported in MainTabNavigator)

// Settings Screens
import SettingsScreen from './src/screens/SettingsScreen';
import BlockedUsersScreen from './src/screens/BlockedUsersScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import EmailAddressScreen from './src/screens/EmailAddressScreen';
import ConnectedAccountsScreen from './src/screens/ConnectedAccountsScreen';
import DisplayThemeScreen from './src/screens/DisplayThemeScreen';
import AccessibilityScreen from './src/screens/AccessibilityScreen';
import LanguageScreen from './src/screens/LanguageScreen';
import RateAppScreen from './src/screens/RateAppScreen';

// Support Screens
import HelpSupportScreen from './src/screens/HelpSupportScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={errorStyles.container}>
          <Text style={errorStyles.title}>Something went wrong</Text>
          <Text style={errorStyles.message}>{this.state.error?.message}</Text>
          <Text style={errorStyles.stack}>{this.state.error?.stack}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  message: {
    fontSize: 16,
    color: '#ff0000',
    marginBottom: 16,
    textAlign: 'center',
  },
  stack: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'monospace',
  },
});

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
});

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const loggedIn = await AuthService.isLoggedIn();
      setIsAuthenticated(loggedIn);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ErrorBoundary>
        <SafeAreaProvider>
          <View style={loadingStyles.container}>
            <ActivityIndicator size="large" color="#C0561F" />
            <Text style={loadingStyles.text}>Loading...</Text>
          </View>
        </SafeAreaProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName={isAuthenticated ? 'MainTabs' : 'Welcome'}
            screenOptions={{
              headerShown: false,
              animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
              animationDuration: 400,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              fullScreenGestureEnabled: Platform.OS === 'ios',
            }}
          >
            {/* Auth */}
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

            {/* Main Tabs */}
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />

            {/* Detail Screens */}
            <Stack.Screen 
              name="PostDetail" 
              component={PostDetailScreen}
              options={{
                animation: 'slide_from_bottom',
                animationDuration: 400,
                gestureEnabled: true,
                gestureDirection: 'vertical',
                fullScreenGestureEnabled: Platform.OS === 'ios',
              }}
            />
            <Stack.Screen 
              name="CreatePost" 
              component={CreatePostScreen}
              options={{
                animation: 'slide_from_bottom',
                animationDuration: 400,
                gestureEnabled: true,
                gestureDirection: 'vertical',
                fullScreenGestureEnabled: Platform.OS === 'ios',
              }}
            />
            <Stack.Screen 
              name="QuotePost" 
              component={QuotePostScreen}
              options={{
                animation: 'slide_from_bottom',
                animationDuration: 400,
                gestureEnabled: true,
                gestureDirection: 'vertical',
                fullScreenGestureEnabled: Platform.OS === 'ios',
              }}
            />
            <Stack.Screen 
              name="PostAnalytics" 
              component={PostAnalyticsScreen}
              options={{
                animation: 'slide_from_right',
                animationDuration: 400,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                fullScreenGestureEnabled: Platform.OS === 'ios',
              }}
            />

            {/* Profile */}
              <Stack.Screen
                name="MyProfile"
                component={MyProfileScreen}
                options={{ 
                  animation: 'slide_from_left',
                  animationDuration: 400,
                  gestureEnabled: true,
                  gestureDirection: 'horizontal',
                  fullScreenGestureEnabled: Platform.OS === 'ios',
                }}
              />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />

            {/* Communities */}
            <Stack.Screen name="CommunityDetail" component={CommunityDetailScreen} />
            <Stack.Screen name="CreateCommunity" component={CreateCommunityScreen} />
            <Stack.Screen name="Groups" component={GroupsScreen} />

            {/* Search */}
            <Stack.Screen name="AdvancedSearch" component={AdvancedSearchScreen} />
            <Stack.Screen name="AdvancedUserSearch" component={AdvancedUserSearchScreen} />

            {/* Messages */}
            <Stack.Screen name="Chat" component={ChatScreen} />

            {/* Settings */}
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
            <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
            <Stack.Screen name="ExportUserData" component={ExportUserDataScreen} />
            <Stack.Screen name="BlockedUsers" component={BlockedUsersScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="EmailAddress" component={EmailAddressScreen} />
            <Stack.Screen name="ConnectedAccounts" component={ConnectedAccountsScreen} />
            <Stack.Screen name="DisplayTheme" component={DisplayThemeScreen} />
            <Stack.Screen name="Accessibility" component={AccessibilityScreen} />
            <Stack.Screen name="Language" component={LanguageScreen} />
            <Stack.Screen name="RateApp" component={RateAppScreen} />

            {/* Support */}
            <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
            <Stack.Screen name="FAQs" component={FAQsScreen} />
            <Stack.Screen name="ReportIssue" component={ReportIssueScreen} />
            <Stack.Screen name="ShareFeedback" component={ShareFeedbackScreen} />

            {/* Legal */}
            <Stack.Screen name="AboutUs" component={AboutUsScreen} />
            <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="CommunityGuidelines" component={CommunityGuidelinesScreen} />

            {/* Admin */}
            <Stack.Screen name="AdminOptions" component={AdminOptionsScreen} />
            <Stack.Screen name="ContentModeration" component={ContentModerationScreen} />
            <Stack.Screen name="CommunityModeration" component={CommunityModerationScreen} />

            {/* Other */}
            <Stack.Screen name="SavedPosts" component={SavedPostsScreen} />
            <Stack.Screen name="SavedComments" component={SavedCommentsScreen} />
            <Stack.Screen name="SavedSearches" component={SavedSearchesScreen} />
            <Stack.Screen name="Drafts" component={DraftsScreen} />
            <Stack.Screen name="ArchivedPosts" component={ArchivedPostsScreen} />
            <Stack.Screen name="ActivityLog" component={ActivityLogScreen} />
            <Stack.Screen name="TrendingTopics" component={TrendingTopicsScreen} />
            <Stack.Screen name="CollaborationRequests" component={CollaborationRequestsScreen} />
            <Stack.Screen name="CommunityAwards" component={CommunityAwardsScreen} />
            <Stack.Screen name="CommunityInsights" component={CommunityInsightsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
