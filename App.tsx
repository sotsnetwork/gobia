import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import 'react-native-screens';

import { RootStackParamList } from './src/types/navigation';

// Auth Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

// Main Screens
import FeedScreen from './src/screens/FeedScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';

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
  BlockedUsersScreen,
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

// Community Screens
import CommunitiesScreen from './src/screens/CommunitiesScreen';

// Search Screens
import SearchScreen from './src/screens/SearchScreen';

// Settings Screens
import SettingsScreen from './src/screens/SettingsScreen';

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

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            {/* Auth */}
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />

            {/* Main */}
            <Stack.Screen name="Feed" component={FeedScreen} />
            <Stack.Screen name="PostDetail" component={PostDetailScreen} />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />

            {/* Profile */}
            <Stack.Screen name="MyProfile" component={MyProfileScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />

            {/* Communities */}
            <Stack.Screen name="Communities" component={CommunitiesScreen} />
            <Stack.Screen name="CommunityDetail" component={CommunityDetailScreen} />
            <Stack.Screen name="CreateCommunity" component={CreateCommunityScreen} />
            <Stack.Screen name="Groups" component={GroupsScreen} />

            {/* Search */}
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="AdvancedSearch" component={AdvancedSearchScreen} />
            <Stack.Screen name="AdvancedUserSearch" component={AdvancedUserSearchScreen} />

            {/* Messages */}
            <Stack.Screen name="Messages" component={MessagesScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />

            {/* Settings */}
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
            <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
            <Stack.Screen name="ExportUserData" component={ExportUserDataScreen} />
            <Stack.Screen name="BlockedUsers" component={BlockedUsersScreen} />

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
