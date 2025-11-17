import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

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
import PlaceholderScreen from './src/screens/PlaceholderScreen';

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

export default function App() {
  return (
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
          <Stack.Screen 
            name="UserProfile" 
            component={(props: any) => <PlaceholderScreen title="User Profile" />} 
          />
          <Stack.Screen 
            name="EditProfile" 
            component={(props: any) => <PlaceholderScreen title="Edit Profile" />} 
          />

          {/* Communities */}
          <Stack.Screen name="Communities" component={CommunitiesScreen} />
          <Stack.Screen 
            name="CommunityDetail" 
            component={(props: any) => <PlaceholderScreen title="Community" />} 
          />
          <Stack.Screen 
            name="CreateCommunity" 
            component={(props: any) => <PlaceholderScreen title="Create Community" />} 
          />
          <Stack.Screen 
            name="Groups" 
            component={(props: any) => <PlaceholderScreen title="Groups" />} 
          />

          {/* Search */}
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen 
            name="AdvancedSearch" 
            component={(props: any) => <PlaceholderScreen title="Advanced Search" />} 
          />
          <Stack.Screen 
            name="AdvancedUserSearch" 
            component={(props: any) => <PlaceholderScreen title="Advanced User Search" />} 
          />

          {/* Messages */}
          <Stack.Screen 
            name="Messages" 
            component={(props: any) => <PlaceholderScreen title="Messages" />} 
          />
          <Stack.Screen 
            name="Chat" 
            component={(props: any) => <PlaceholderScreen title="Chat" />} 
          />

          {/* Settings */}
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen 
            name="PrivacySettings" 
            component={(props: any) => <PlaceholderScreen title="Privacy Settings" />} 
          />
          <Stack.Screen 
            name="NotificationSettings" 
            component={(props: any) => <PlaceholderScreen title="Notification Settings" />} 
          />
          <Stack.Screen 
            name="ExportUserData" 
            component={(props: any) => <PlaceholderScreen title="Export User Data" />} 
          />
          <Stack.Screen 
            name="BlockedUsers" 
            component={(props: any) => <PlaceholderScreen title="Blocked Users" />} 
          />

          {/* Support */}
          <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
          <Stack.Screen 
            name="FAQs" 
            component={(props: any) => <PlaceholderScreen title="FAQs" />} 
          />
          <Stack.Screen 
            name="ReportIssue" 
            component={(props: any) => <PlaceholderScreen title="Report an Issue" />} 
          />
          <Stack.Screen 
            name="ShareFeedback" 
            component={(props: any) => <PlaceholderScreen title="Share Your Feedback" />} 
          />

          {/* Legal */}
          <Stack.Screen name="AboutUs" component={AboutUsScreen} />
          <Stack.Screen 
            name="TermsOfService" 
            component={(props: any) => <PlaceholderScreen title="Terms of Service" />} 
          />
          <Stack.Screen 
            name="PrivacyPolicy" 
            component={(props: any) => <PlaceholderScreen title="Privacy Policy" />} 
          />
          <Stack.Screen 
            name="CommunityGuidelines" 
            component={(props: any) => <PlaceholderScreen title="Community Guidelines" />} 
          />

          {/* Admin */}
          <Stack.Screen 
            name="AdminOptions" 
            component={(props: any) => <PlaceholderScreen title="Admin Options" />} 
          />
          <Stack.Screen 
            name="ContentModeration" 
            component={(props: any) => <PlaceholderScreen title="Content Moderation" />} 
          />
          <Stack.Screen 
            name="CommunityModeration" 
            component={(props: any) => <PlaceholderScreen title="Community Moderation" />} 
          />

          {/* Other */}
          <Stack.Screen 
            name="SavedPosts" 
            component={(props: any) => <PlaceholderScreen title="Saved Posts" />} 
          />
          <Stack.Screen 
            name="SavedComments" 
            component={(props: any) => <PlaceholderScreen title="Saved Comments" />} 
          />
          <Stack.Screen 
            name="SavedSearches" 
            component={(props: any) => <PlaceholderScreen title="Saved Searches" />} 
          />
          <Stack.Screen 
            name="Drafts" 
            component={(props: any) => <PlaceholderScreen title="Drafts" />} 
          />
          <Stack.Screen 
            name="ArchivedPosts" 
            component={(props: any) => <PlaceholderScreen title="Archived Posts" />} 
          />
          <Stack.Screen 
            name="ActivityLog" 
            component={(props: any) => <PlaceholderScreen title="Activity Log" />} 
          />
          <Stack.Screen 
            name="TrendingTopics" 
            component={(props: any) => <PlaceholderScreen title="Trending Topics" />} 
          />
          <Stack.Screen 
            name="CollaborationRequests" 
            component={(props: any) => <PlaceholderScreen title="Collaboration Requests" />} 
          />
          <Stack.Screen 
            name="CommunityAwards" 
            component={(props: any) => <PlaceholderScreen title="Community Awards" />} 
          />
          <Stack.Screen 
            name="CommunityInsights" 
            component={(props: any) => <PlaceholderScreen title="Community Insights" />} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
