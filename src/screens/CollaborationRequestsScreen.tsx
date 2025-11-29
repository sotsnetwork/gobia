import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CollaborationRequest {
  id: string;
  fromUser: string;
  fromHandle: string;
  project: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'accepted' | 'declined';
}

const sampleRequests: CollaborationRequest[] = [
  {
    id: '1',
    fromUser: 'Sarah Johnson',
    fromHandle: '@sarahj',
    project: 'AI Design Tool',
    message: 'I saw your post about building an AI app. I have experience with ML models and would love to collaborate!',
    timestamp: '2h',
    status: 'pending',
  },
  {
    id: '2',
    fromUser: 'Mike Davis',
    fromHandle: '@miked',
    project: 'SaaS Platform',
    message: 'Looking for a co-founder with your skillset. Interested in discussing a partnership?',
    timestamp: '1d',
    status: 'pending',
  },
  {
    id: '3',
    fromUser: 'Elena Martinez',
    fromHandle: '@elena_dev',
    project: 'Mobile App',
    message: 'Would you be interested in joining our team? We need someone with your expertise.',
    timestamp: '3d',
    status: 'accepted',
  },
];

export default function CollaborationRequestsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [requests, setRequests] = useState<CollaborationRequest[]>(sampleRequests);

  const handleAccept = (requestId: string) => {
    setRequests(
      requests.map((r) => (r.id === requestId ? { ...r, status: 'accepted' as const } : r))
    );
    Alert.alert('Accepted', 'Collaboration request accepted!');
  };

  const handleDecline = (requestId: string) => {
    Alert.alert('Decline Request', 'Are you sure you want to decline this request?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Decline',
        style: 'destructive',
        onPress: () => {
          setRequests(
            requests.map((r) => (r.id === requestId ? { ...r, status: 'declined' as const } : r))
          );
        },
      },
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return Colors.success;
      case 'declined':
        return Colors.error;
      default:
        return Colors.warning;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Collaboration Requests" />
      <ScrollView style={styles.scrollView}>
        {requests.length > 0 ? (
          requests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <TouchableOpacity
                style={styles.userHeader}
                onPress={() =>
                  navigation.navigate('UserProfile', {
                    userId: request.id,
                    username: request.fromHandle,
                  })
                }
              >
                <View style={styles.avatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{request.fromUser}</Text>
                  <Text style={styles.userHandle}>{request.fromHandle}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.projectBadge}>
                <Ionicons name="briefcase-outline" size={16} color={Colors.primary} />
                <Text style={styles.projectText}>{request.project}</Text>
              </View>

              <Text style={styles.message}>{request.message}</Text>
              <Text style={styles.timestamp}>{request.timestamp}</Text>

              {request.status === 'pending' ? (
                <View style={styles.actions}>
                  <Button
                    title="Accept"
                    onPress={() => handleAccept(request.id)}
                    style={styles.acceptButton}
                    textStyle={styles.acceptButtonText}
                  />
                  <Button
                    title="Decline"
                    variant="outline"
                    onPress={() => handleDecline(request.id)}
                    style={styles.declineButton}
                  />
                </View>
              ) : (
                <View style={styles.statusBadge}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(request.status) }]} />
                  <Text style={styles.statusText}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="handshake-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No collaboration requests</Text>
            <Text style={styles.emptyText}>
              Collaboration requests from other users will appear here.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  requestCard: {
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primaryLight,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  userHandle: {
    fontSize: 14,
    color: Colors.textLight,
  },
  projectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.primaryLight + '30',
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  projectText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  message: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  acceptButton: {
    flex: 1,
  },
  acceptButtonText: {
    fontSize: 14,
  },
  declineButton: {
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    minHeight: 400,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

