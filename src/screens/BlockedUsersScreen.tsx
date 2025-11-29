import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface BlockedUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  blockedDate: string;
  bio?: string;
}

// Sample blocked users data
const sampleBlockedUsers: BlockedUser[] = [
  {
    id: '1',
    name: 'John Smith',
    username: '@johnsmith',
    blockedDate: '2024-01-15',
    bio: 'Software developer and tech enthusiast',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    username: '@sarahj',
    blockedDate: '2024-02-20',
    bio: 'Content creator and designer',
  },
  {
    id: '3',
    name: 'Mike Davis',
    username: '@miked',
    blockedDate: '2024-03-10',
  },
];

export default function BlockedUsersScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>(sampleBlockedUsers);
  const [selectedUser, setSelectedUser] = useState<BlockedUser | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleUnblock = (user: BlockedUser) => {
    Alert.alert(
      'Unblock User',
      `Are you sure you want to unblock ${user.name}? You will be able to see their posts and they will be able to interact with you again.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Unblock',
          style: 'destructive',
          onPress: () => {
            setBlockedUsers(blockedUsers.filter((u) => u.id !== user.id));
            if (selectedUser?.id === user.id) {
              setShowDetailsModal(false);
              setSelectedUser(null);
            }
          },
        },
      ]
    );
  };

  const handleViewDetails = (user: BlockedUser) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const UserItem = ({ user }: { user: BlockedUser }) => (
    <View style={styles.userItem}>
      <View style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userHandle}>{user.username}</Text>
        <Text style={styles.blockedDate}>Blocked on {formatDate(user.blockedDate)}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleViewDetails(user)}
        >
          <Ionicons name="information-circle-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleUnblock(user)}
        >
          <Ionicons name="ban-outline" size={22} color={Colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Blocked Users</Text>
        <View style={styles.headerRight} />
      </View>

      {blockedUsers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="ban-outline" size={64} color={Colors.textLight} />
          <Text style={styles.emptyTitle}>No Blocked Users</Text>
          <Text style={styles.emptyText}>
            Users you block will appear here. You can unblock them at any time.
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.infoContainer}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.info} />
            <Text style={styles.infoText}>
              Blocked users cannot see your posts, send you messages, or follow you.
            </Text>
          </View>

          <View style={styles.usersList}>
            {blockedUsers.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </View>
        </ScrollView>
      )}

      {/* User Details Modal */}
      <Modal
        visible={showDetailsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDetailsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedUser && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>User Details</Text>
                  <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
                    <Ionicons name="close" size={24} color={Colors.text} />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.modalAvatar} />
                  <Text style={styles.modalUserName}>{selectedUser.name}</Text>
                  <Text style={styles.modalUserHandle}>{selectedUser.username}</Text>
                  {selectedUser.bio && (
                    <Text style={styles.modalBio}>{selectedUser.bio}</Text>
                  )}
                  <Text style={styles.modalBlockedDate}>
                    Blocked on {formatDate(selectedUser.blockedDate)}
                  </Text>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setShowDetailsModal(false);
                      navigation.navigate('UserProfile', {
                        userId: selectedUser.id,
                        username: selectedUser.username,
                      });
                    }}
                  >
                    <Ionicons name="person-outline" size={20} color={Colors.primary} />
                    <Text style={styles.modalButtonText}>View Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.unblockButton]}
                    onPress={() => {
                      setShowDetailsModal(false);
                      handleUnblock(selectedUser);
                    }}
                  >
                    <Ionicons name="ban-outline" size={20} color={Colors.error} />
                    <Text style={[styles.modalButtonText, styles.unblockButtonText]}>
                      Unblock User
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  headerRight: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.info + '15',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  usersList: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
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
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  blockedDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  modalBody: {
    padding: 24,
    alignItems: 'center',
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    marginBottom: 16,
  },
  modalUserName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  modalUserHandle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  modalBio: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  modalBlockedDate: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 8,
  },
  modalActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  modalButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  unblockButton: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.borderLight,
  },
  modalButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  unblockButtonText: {
    color: Colors.error,
  },
});

