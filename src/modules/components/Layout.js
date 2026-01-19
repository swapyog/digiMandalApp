import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import PurpleHeader from './PurpleHeader';
import BottomNavigation from './BottomNavigation';
import { homeStyles } from '../../styles/homeStyles';

export default function Layout({ children, selectedTab, onTabChange, usePurpleHeader = false, headerTitle }) {
  return (
    <SafeAreaView style={homeStyles.homeRoot}>
      {usePurpleHeader ? <PurpleHeader title={headerTitle} /> : <Header />}
      <View style={homeStyles.homeContent}>{children}</View>
      <BottomNavigation selectedTab={selectedTab} onTabChange={onTabChange} />
    </SafeAreaView>
  );
}

