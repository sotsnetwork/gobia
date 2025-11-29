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

export default function ExportUserDataScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [exporting, setExporting] = useState(false);

  const dataTypes = [
    { id: '1', name: 'Profile Information', icon: 'person-outline' },
    { id: '2', name: 'Posts & Comments', icon: 'document-text-outline' },
    { id: '3', name: 'Messages', icon: 'mail-outline' },
    { id: '4', name: 'Activity Log', icon: 'time-outline' },
    { id: '5', name: 'Saved Content', icon: 'bookmark-outline' },
    { id: '6', name: 'Communities', icon: 'people-outline' },
  ];

  const handleExport = () => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      setExporting(false);
      Alert.alert(
        'Export Started',
        'Your data export has been initiated. You will receive an email with a download link when it\'s ready (usually within 24 hours).',
        [{ text: 'OK' }]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Export Your Data" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.info} />
          <Text style={styles.infoText}>
            You can request a copy of all your data. The export will be sent to your registered
            email address.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          {dataTypes.map((type) => (
            <View key={type.id} style={styles.dataTypeItem}>
              <Ionicons name={type.icon as any} size={24} color={Colors.text} />
              <Text style={styles.dataTypeText}>{type.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Export Format</Text>
          <Text style={styles.sectionText}>
            Your data will be exported as a ZIP file containing JSON files with all your
            information in a machine-readable format.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Processing Time</Text>
          <Text style={styles.sectionText}>
            Data exports are typically processed within 24 hours. You'll receive an email with a
            secure download link when your export is ready.
          </Text>
        </View>

        <Button
          title={exporting ? 'Preparing Export...' : 'Request Data Export'}
          onPress={handleExport}
          disabled={exporting}
          style={styles.exportButton}
        />
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.info + '15',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  dataTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    gap: 12,
  },
  dataTypeText: {
    fontSize: 16,
    color: Colors.text,
  },
  exportButton: {
    marginTop: 8,
  },
});

