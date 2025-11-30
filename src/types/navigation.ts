export type RootStackParamList = {
  // Auth
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  
  // Main Tabs
  MainTabs: undefined;
  
  // Detail Screens
  PostDetail: { postId?: string; post?: any };
  CreatePost: undefined;
  QuotePost: { post?: any; reply?: any };
  
  // Profile
  MyProfile: undefined;
  UserProfile: { userId: string; username?: string };
  EditProfile: undefined;
  
  // Communities
  Communities: undefined;
  CommunityDetail: { communityId: string; communityName?: string };
  CreateCommunity: undefined;
  Groups: { projectId: string; projectName?: string };
  
  // Search
  Search: undefined;
  AdvancedSearch: undefined;
  AdvancedUserSearch: undefined;
  
  // Messages
  Messages: undefined;
  Chat: { chatId: string; userName?: string };
  
  // Settings
  Settings: undefined;
  PrivacySettings: undefined;
  NotificationSettings: undefined;
  ExportUserData: undefined;
  BlockedUsers: undefined;
  ChangePassword: undefined;
  EmailAddress: undefined;
  ConnectedAccounts: undefined;
  DisplayTheme: undefined;
  Accessibility: undefined;
  Language: undefined;
  RateApp: undefined;
  
  // Support
  HelpSupport: undefined;
  FAQs: undefined;
  ReportIssue: undefined;
  ShareFeedback: undefined;
  
  // Legal
  AboutUs: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  CommunityGuidelines: undefined;
  
  // Admin
  AdminOptions: undefined;
  ContentModeration: undefined;
  CommunityModeration: undefined;
  
  // Other
  SavedPosts: undefined;
  SavedComments: undefined;
  SavedSearches: undefined;
  Drafts: undefined;
  ArchivedPosts: undefined;
  ActivityLog: undefined;
  TrendingTopics: undefined;
  CollaborationRequests: undefined;
  CommunityAwards: undefined;
  CommunityInsights: undefined;
};
