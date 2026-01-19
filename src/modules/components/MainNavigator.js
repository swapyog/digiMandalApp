import React, { useState } from 'react';
import { HomePage } from '../home';
import { DiscoverPage } from '../discover';
import { CreatePage } from '../create';
import { EventsPage } from '../events';
import { ProfilePage } from '../profile';

export default function MainNavigator() {
  const [selectedTab, setSelectedTab] = useState('home');

  const renderPage = () => {
    switch (selectedTab) {
      case 'home':
        return <HomePage selectedTab={selectedTab} onTabChange={setSelectedTab} />;
      case 'discover':
        return <DiscoverPage selectedTab={selectedTab} onTabChange={setSelectedTab} />;
      case 'create':
        return <CreatePage selectedTab={selectedTab} onTabChange={setSelectedTab} />;
      case 'events':
        return <EventsPage selectedTab={selectedTab} onTabChange={setSelectedTab} />;
      case 'profile':
        return <ProfilePage selectedTab={selectedTab} onTabChange={setSelectedTab} />;
      default:
        return <HomePage selectedTab={selectedTab} onTabChange={setSelectedTab} />;
    }
  };

  return renderPage();
}

