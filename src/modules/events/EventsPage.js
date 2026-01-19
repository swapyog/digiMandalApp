import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Layout from '../components/Layout';
import { homeStyles } from '../../styles/homeStyles';

export default function EventsPage({ selectedTab, onTabChange }) {
  return (
    <Layout selectedTab={selectedTab} onTabChange={onTabChange}>
      <ScrollView style={homeStyles.homeContent} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 16 }}>
            Events
          </Text>
          <Text style={{ fontSize: 16, color: '#6b7280' }}>
            View upcoming events and celebrations
          </Text>
        </View>
      </ScrollView>
    </Layout>
  );
}

