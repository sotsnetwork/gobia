import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ConnectedAccount {
  id: string;
  name: string;
  email: string;
  type: 'google' | 'apple' | 'github' | 'twitter';
  connected: boolean;
  icon: string;
  color: string;
}

const accounts: ConnectedAccount[] = [
  {
    id: '1',
    name: 'Google',
    email: 'user@gmail.com',
    type: 'google',
    connected: true,
    icon: 'logo-google',
    color: '#4285F4',
  },
  {
    id: '2',
    name: 'Apple',
    email: 'user@icloud.com',
    type: 'apple',
    connected: true,
    icon: 'logo-apple',
    color: '#000000',
  },
  {
    id: '3',
    name: 'GitHub',
    email: 'user@github.com',
    type: 'github',
    connected: true,
    icon: 'logo-github',
    color: '#24292e',
  },
  {
    id: '4',
    name: 'Twitter',
    email: 'user@twitter.com',
    type: 'twitter',
    connected: true,
    icon: 'logo-twitter',
    color: '#1DA1F2',
  },
  {
    id: '5',
    name: 'Facebook',
    email: 'user@facebook.com',
    type: 'google',
    connected: true,
    icon: 'logo-facebook',
    color: '#1877F2',
  },
  {
    id: '6',
    name: 'LinkedIn',
    email: 'user@linkedin.com',
    type: 'google',
    connected: true,
    icon: 'logo-linkedin',
    color: '#0077B5',
  },
  {
    id: '7',
    name: 'Microsoft',
    email: 'user@outlook.com',
    type: 'google',
    connected: true,
    icon: 'logo-microsoft',
    color: '#0078D4',
  },
  {
    id: '8',
    name: 'Discord',
    email: 'user#1234',
    type: 'google',
    connected: true,
    icon: 'chatbubbles',
    color: '#5865F2',
  },
];

export default function ConnectedAccountsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>(accounts);

  const handleConnect = (account: ConnectedAccount) => {
    Alert.alert(
      `Connect ${account.name}`,
      `Do you want to connect your ${account.name} account?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Connect',
          onPress: () => {
            setConnectedAccounts(
              connectedAccounts.map((acc) =>
                acc.id === account.id ? { ...acc, connected: true } : acc
              )
            );
            Alert.alert('Success', `${account.name} account connected successfully!`);
          },
        },
      ]
    );
  };

  const handleDisconnect = (account: ConnectedAccount) => {
    Alert.alert(
      `Disconnect ${account.name}`,
      `Are you sure you want to disconnect your ${account.name} account?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: () => {
            setConnectedAccounts(
              connectedAccounts.map((acc) =>
                acc.id === account.id ? { ...acc, connected: false, email: '' } : acc
              )
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Connected Accounts" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.intro}>
          Connect your accounts to sign in faster and share content easily.
        </Text>

        {connectedAccounts.map((account) => (
          <View key={account.id} style={styles.accountItem}>
            <View style={styles.accountInfo}>
              <View style={[styles.accountIcon, { backgroundColor: account.color + '20' }]}>
                <Ionicons name={account.icon as any} size={24} color={account.color} />
              </View>
              <View style={styles.accountDetails}>
                <Text style={styles.accountName}>{account.name}</Text>
                {account.connected && account.email && (
                  <Text style={styles.accountEmail}>{account.email}</Text>
                )}
                {account.connected && !account.email && (
                  <Text style={styles.accountStatus}>Connected</Text>
                )}
                {!account.connected && (
                  <Text style={styles.accountStatus}>Not connected</Text>
                )}
              </View>
            </View>
            {account.connected ? (
              <TouchableOpacity
                style={styles.disconnectButton}
                onPress={() => handleDisconnect(account)}
              >
                <Text style={styles.disconnectText}>Disconnect</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.connectButton}
                onPress={() => handleConnect(account)}
              >
                <Text style={styles.connectText}>Connect</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.info} />
          <Text style={styles.infoText}>
            Connected accounts allow you to sign in faster and share content across platforms. You can disconnect them at any time.
          </Text>
        </View>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  intro: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 24,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  accountIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accountDetails: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  accountEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  accountStatus: {
    fontSize: 14,
    color: Colors.textLight,
  },
  connectButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  connectText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  disconnectButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  disconnectText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.info + '15',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

