import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { memberDashboardStyles } from '../../../styles/memberDashboardStyles';
import MemberHeader from '../components/MemberHeader';
import AddButton from '../components/AddButton';
import MembersScreen from './MembersScreen';
import InviteMembersScreen from './InviteMembersScreen';
import { AllNoticesScreen, CreateNoticeScreen, NoticePreviewScreen, ArchivedNoticesScreen } from '../noticeboard';
import { AllIssuesScreen, RaiseIssueScreen, IssuePreviewScreen, IssueDetailScreen, ResolveIssueScreen } from '../issues';
import { PhotoGalleryScreen, AddPhotosScreen } from '../gallery';
import {
  DonationScreen,
  PayScreen,
  SelectBankScreen,
  AddAccountScreen,
  AddCardScreen,
  PaymentSuccessScreen,
  ThankYouScreen,
} from '../donation';
import {
  AllEventsScreen,
  EventDetailScreen,
  ApplyVolunteeringScreen,
  EventThankYouScreen,
  ScheduledEventsScreen,
} from '../events';

const PURPLE = '#7E48DC';
const DARK_PURPLE = '#110723';

export default function MemberDashboard({ onBack }) {
  const [membersScreenVisible, setMembersScreenVisible] = useState(false);
  const [inviteMembersVisible, setInviteMembersVisible] = useState(false);
  const [allNoticesVisible, setAllNoticesVisible] = useState(false);
  const [archivedNoticesVisible, setArchivedNoticesVisible] = useState(false);
  const [archivedType, setArchivedType] = useState('notice');
  const [createNoticeVisible, setCreateNoticeVisible] = useState(false);
  const [noticePreviewVisible, setNoticePreviewVisible] = useState(false);
  const [noticeData, setNoticeData] = useState(null);
  const [allIssuesVisible, setAllIssuesVisible] = useState(false);
  const [raiseIssueVisible, setRaiseIssueVisible] = useState(false);
  const [issuePreviewVisible, setIssuePreviewVisible] = useState(false);
  const [issueDetailVisible, setIssueDetailVisible] = useState(false);
  const [resolveIssueVisible, setResolveIssueVisible] = useState(false);
  const [issueData, setIssueData] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issueSuccessForNext, setIssueSuccessForNext] = useState(null);
  const [photoGalleryVisible, setPhotoGalleryVisible] = useState(false);
  const [addPhotosVisible, setAddPhotosVisible] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [gallerySuccessMessage, setGallerySuccessMessage] = useState('');
  const [donationVisible, setDonationVisible] = useState(false);
  const [payVisible, setPayVisible] = useState(false);
  const [payAmount, setPayAmount] = useState(2000);
  const [selectBankVisible, setSelectBankVisible] = useState(false);
  const [addAccountVisible, setAddAccountVisible] = useState(false);
  const [addCardVisible, setAddCardVisible] = useState(false);
  const [paymentSuccessVisible, setPaymentSuccessVisible] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const [allEventsVisible, setAllEventsVisible] = useState(false);
  const [eventDetailVisible, setEventDetailVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [applyVolunteeringVisible, setApplyVolunteeringVisible] = useState(false);
  const [eventThankYouVisible, setEventThankYouVisible] = useState(false);
  const [eventPayVisible, setEventPayVisible] = useState(false);
  const [eventPaymentSuccessVisible, setEventPaymentSuccessVisible] = useState(false);
  const [eventPayAmount, setEventPayAmount] = useState(200);
  const [scheduledEventsVisible, setScheduledEventsVisible] = useState(false);

  // Sample mandal data
  const mandalData = {
    logo: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp',
    name: 'Vasant Kunj Cultural Association, at Thane with very very long name',
    subtitle: 'Cultural & Festival Mandal',
    isPublic: true,
    isVerified: true,
  };

  // Quick actions
  const quickActions = [
    { id: '1', icon: 'payments', label: 'Donations', hasNotification: true },
    { id: '2', icon: 'description', label: 'Notices', hasNotification: false },
    { id: '3', icon: 'event', label: 'Events', hasNotification: false },
    { id: '4', icon: 'report-problem', label: 'Issues', hasNotification: true },
  ];

  // Donations data - dynamic array (can have 5-6 records)
  const donations = [
    {
      id: '1',
      period: 'Today • 8 Aug 2025',
      amount: '₹23984',
      donors: '1000',
    },
    {
      id: '2',
      period: 'August 2025',
      amount: '₹23984',
      donors: '100',
    },
    {
      id: '3',
      period: 'July 2025',
      amount: '₹18500',
      donors: '85',
    },
    {
      id: '4',
      period: 'June 2025',
      amount: '₹22000',
      donors: '95',
    },
    {
      id: '5',
      period: 'May 2025',
      amount: '₹19500',
      donors: '78',
    },
    {
      id: '6',
      period: 'April 2025',
      amount: '₹21000',
      donors: '88',
    },
  ];

  // Photo gallery
  const galleryImages = [
    { id: '1', uri: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '2', uri: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '3', uri: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '4', uri: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '5', uri: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '6', uri: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '7', uri: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '8', uri: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '9', uri: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '10', uri: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
  ];

  // Notices
  const notices = [
    {
      id: '1',
      icon: 'notifications',
      title: 'Mandal Elections 2025',
      date: 'Today',
      description: 'We celebrate our culture, unity, and creativity with passion and pride—ensuring every mem...',
      attachments: ['Circular 30 Jul 2025.pdf', '+2'],
    },
    {
      id: '2',
      icon: 'notifications',
      title: 'General Meeting',
      date: 'Yesterday',
      description: 'Meeting announcement for all members...',
      attachments: [],
    },
  ];

  // Events
  const events = [
    {
      id: '1',
      title: 'Navratri 2025',
      image: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg',
      location: 'Vasant Kunj, Thane',
      date: "5 Oct '25",
      attendees: ['https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg', 'https://i.pinimg.com/736x/99/8c/70/998c7017bbe8f1f42a9d257abeea98e9.jpg', 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg'],
      attendeesCount: 123,
      price: '₹200',
    },
    {
      id: '2',
      title: 'Ganeshotsav',
      image: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg',
      location: 'Vasant',
      date: "10 Sep '25",
      attendees: [],
      attendeesCount: 0,
      price: '₹150',
    },
  ];

  // Members
  const members = [
    { id: '1', name: 'Sanskruti', avatar: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '2', name: 'Shalini', avatar: 'https://i.pinimg.com/736x/99/8c/70/998c7017bbe8f1f42a9d257abeea98e9.jpg' },
    { id: '3', name: 'Avinash', avatar: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '4', name: 'Kriti', avatar: 'https://i.pinimg.com/736x/99/8c/70/998c7017bbe8f1f42a9d257abeea98e9.jpg' },
  ];

  const aboutText = 'We celebrate our culture, unity, and creativity with passion and pride—ensuring every member f...';

  const renderGalleryImage = ({ item }) => (
    <TouchableOpacity style={memberDashboardStyles.galleryImageContainer}>
      <Image source={{ uri: item.uri }} style={memberDashboardStyles.galleryImage} />
    </TouchableOpacity>
  );

  const renderNotice = ({ item }) => (
    <View style={memberDashboardStyles.noticeCard}>
      <View style={memberDashboardStyles.noticeHeader}>
        <Icon name={item.icon} size={20} color={PURPLE} />
        <Text style={memberDashboardStyles.noticeTitle}>{item.title}</Text>
        <Text style={memberDashboardStyles.noticeDate}>{item.date}</Text>
      </View>
      <Text style={memberDashboardStyles.noticeDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <TouchableOpacity>
        <Text style={memberDashboardStyles.readMoreText}>Read More</Text>
      </TouchableOpacity>
      {item.attachments && item.attachments.length > 0 && (
        <View style={memberDashboardStyles.attachmentsContainer}>
          <Icon name="picture-as-pdf" size={16} color="#6b7280" />
          <Text style={memberDashboardStyles.attachmentText}>{item.attachments[0]}</Text>
          {item.attachments[1] && (
            <Text style={memberDashboardStyles.attachmentCount}>{item.attachments[1]}</Text>
          )}
        </View>
      )}
    </View>
  );

  const renderEvent = ({ item }) => (
    <View style={memberDashboardStyles.eventCard}>
      <Image source={{ uri: item.image }} style={memberDashboardStyles.eventImage} />
      <View style={memberDashboardStyles.eventContent}>
        <Text style={memberDashboardStyles.eventTitle}>{item.title}</Text>
        <View style={memberDashboardStyles.eventDetails}>
          <View style={memberDashboardStyles.eventDetailItem}>
            <Icon name="location-on" size={14} color="#6b7280" />
            <Text style={memberDashboardStyles.eventDetailText}>{item.location}</Text>
          </View>
          <View style={memberDashboardStyles.eventDetailItem}>
            <Icon name="calendar-today" size={14} color="#6b7280" />
            <Text style={memberDashboardStyles.eventDetailText}>{item.date}</Text>
          </View>
        </View>
        <View style={memberDashboardStyles.eventFooter}>
          <View style={memberDashboardStyles.attendeesContainer}>
            {item.attendees && item.attendees.slice(0, 3).map((avatar, idx) => (
              <Image
                key={idx}
                source={{ uri: avatar }}
                style={[memberDashboardStyles.attendeeAvatar, { marginLeft: idx > 0 ? -8 : 0 }]}
              />
            ))}
            {item.attendeesCount > 0 && (
              <Text
                style={[
                  memberDashboardStyles.attendeesCount,
                  item.attendees && item.attendees.length > 0
                    ? { marginLeft: -8 }
                    : { marginLeft: 4 },
                ]}
              >
                +{item.attendeesCount}
              </Text>
            )}
          </View>
          <Text style={memberDashboardStyles.eventPrice}>{item.price}</Text>
        </View>
      </View>
    </View>
  );

  const renderMember = ({ item }) => (
    <View style={memberDashboardStyles.memberItem}>
      <Image source={{ uri: item.avatar }} style={memberDashboardStyles.memberAvatar} />
      <Text style={memberDashboardStyles.memberName} numberOfLines={1}>
        {item.name}
      </Text>
    </View>
  );

  const renderDonation = ({ item }) => (
    <View style={memberDashboardStyles.donationCard}>
      <Text style={memberDashboardStyles.donationPeriod}>{item.period}</Text>
      <View style={memberDashboardStyles.donationAmountRow}>
        <Text style={memberDashboardStyles.donationAmount}>{item.amount}</Text>
        <View style={memberDashboardStyles.donationFooter}>
          <Icon name="people" size={16} color="#6b7280" />
          <Text style={memberDashboardStyles.donationDonors}>{item.donors}</Text>
        </View>
      </View>
    </View>
  );

  const DonationsSection = () => (
    <View style={memberDashboardStyles.section}>
      <View style={memberDashboardStyles.sectionTitleRow}>
        <Text style={memberDashboardStyles.sectionTitle}>Donations</Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setDonationVisible(true)}
        >
          <Text style={memberDashboardStyles.sectionCountText}>2 New </Text>
          <Icon name="chevron-right" size={16} color={PURPLE} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={donations}
        renderItem={renderDonation}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={memberDashboardStyles.donationsCardsContainer}
      />
    </View>
  );

  const MemberIssuesSection = () => (
    <View style={memberDashboardStyles.section}>
      <TouchableOpacity
        style={memberDashboardStyles.issuesCard}
        onPress={() => setAllIssuesVisible(true)}
        activeOpacity={0.8}
      >
        <Icon name="report-problem" size={24} color="#F13030" />
        <View style={memberDashboardStyles.issuesContent}>
          <Text style={memberDashboardStyles.issuesTitle}>Member Issues</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={memberDashboardStyles.issuesCount}>3 Pending </Text>
            <Icon name="chevron-right" size={16} color={PURPLE} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const NoticeBoardSection = () => (
    <View style={[memberDashboardStyles.section, memberDashboardStyles.noticeSection]}>
      <View style={memberDashboardStyles.sectionTitleRow}>
        <Text style={memberDashboardStyles.sectionTitleDark}>Notice Board</Text>
        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setAllNoticesVisible(true)}
        >
          <Text style={memberDashboardStyles.sectionCountText}>
            2 New • <Text style={memberDashboardStyles.sectionLinkText}>View All</Text>
          </Text>
          <Icon name="chevron-right" size={16} color={PURPLE} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notices}
        renderItem={renderNotice}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={memberDashboardStyles.noticesList}
      />
      <AddButton 
        text="Publish Notices & Announcement" 
        onPress={() => setCreateNoticeVisible(true)}
      />
    </View>
  );

  const EventsSection = () => (
    <View style={memberDashboardStyles.section}>
      <View style={memberDashboardStyles.sectionTitleRow}>
        <Text style={memberDashboardStyles.sectionTitle}>Events</Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setAllEventsVisible(true)}
        >
          <Text style={memberDashboardStyles.sectionCountText}>
            2 New • <Text style={memberDashboardStyles.sectionLinkText}>24</Text>
          </Text>
          <Icon name="chevron-right" size={16} color={PURPLE} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={memberDashboardStyles.eventsList}
      />
      <AddButton text="Publish Notices and Announcement" />
    </View>
  );

  const PhotoGallerySection = () => (
    <View style={memberDashboardStyles.section}>
      <View style={memberDashboardStyles.sectionTitleRow}>
        <Text style={memberDashboardStyles.sectionTitle}>Photo Gallery</Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setPhotoGalleryVisible(true)}
        >
          <Text style={memberDashboardStyles.sectionCountText}>
            2 New • <Text style={memberDashboardStyles.sectionLinkText}>214</Text>
          </Text>
          <Icon name="chevron-right" size={16} color={PURPLE} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={galleryImages}
        renderItem={renderGalleryImage}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={memberDashboardStyles.galleryList}
      />
      <AddButton
        text="Add Photos"
        onPress={() => {
          setSelectedAlbum(null);
          setAddPhotosVisible(true);
        }}
      />
    </View>
  );

  const MembersSection = () => (
    <View style={memberDashboardStyles.section}>
      <View style={memberDashboardStyles.sectionTitleRow}>
        <Text style={memberDashboardStyles.sectionTitle}>Members</Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={memberDashboardStyles.sectionCountText}>
            <Text style={memberDashboardStyles.sectionLinkText}>1021</Text>
          </Text>
          <Icon name="chevron-right" size={16} color={PURPLE} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={members}
        renderItem={renderMember}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={memberDashboardStyles.membersList}
      />
      <AddButton 
        text="Invite Members" 
        onPress={() => setMembersScreenVisible(true)}
      />
      {/* <AddButton 
        text="Invite Members list" 
        onPress={() => setInviteMembersVisible(true)}
      /> */}
    </View>
  );

  const AboutSection = () => (
    <View style={memberDashboardStyles.section}>
      <View style={memberDashboardStyles.sectionTitleRow}>
        <Text style={memberDashboardStyles.sectionTitle}>About</Text>
        <TouchableOpacity>
          <Icon name="chevron-right" size={16} color={PURPLE} />
        </TouchableOpacity>
      </View>
      <Text style={memberDashboardStyles.aboutText} numberOfLines={3}>
        {aboutText}
      </Text>
      <TouchableOpacity>
        <Text style={memberDashboardStyles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );

  if (membersScreenVisible) {
    return (
      <MembersScreen
        onBack={() => setMembersScreenVisible(false)}
        associationName={mandalData.name}
      />
    );
  }

  if (thankYouVisible) {
    return (
      <ThankYouScreen
        onDone={() => {
          setThankYouVisible(false);
          setPaymentSuccessVisible(false);
          setPayVisible(false);
          setDonationVisible(false);
        }}
      />
    );
  }

  if (eventThankYouVisible) {
    return (
      <EventThankYouScreen
        onDone={() => {
          setEventThankYouVisible(false);
          setEventPaymentSuccessVisible(false);
          setEventPayVisible(false);
          setEventDetailVisible(false);
          setSelectedEvent(null);
          setAllEventsVisible(true);
        }}
      />
    );
  }

  if (eventPaymentSuccessVisible) {
    return (
      <PaymentSuccessScreen
        amount={eventPayAmount}
        onDone={() => {
          setEventPaymentSuccessVisible(false);
          setEventThankYouVisible(true);
        }}
      />
    );
  }

  if (eventPayVisible) {
    return (
      <PayScreen
        amount={eventPayAmount}
        onBack={() => {
          setEventPayVisible(false);
          setEventDetailVisible(true);
        }}
        onSuccess={() => {
          setEventPayVisible(false);
          setEventPaymentSuccessVisible(true);
        }}
      />
    );
  }

  if (applyVolunteeringVisible) {
    return (
      <ApplyVolunteeringScreen
        onBack={() => {
          setApplyVolunteeringVisible(false);
          setEventDetailVisible(true);
        }}
        onDone={() => {
          setApplyVolunteeringVisible(false);
          setEventThankYouVisible(true);
        }}
      />
    );
  }

  if (eventDetailVisible) {
    return (
      <EventDetailScreen
        event={selectedEvent || {}}
        onBack={() => {
          setEventDetailVisible(false);
          setSelectedEvent(null);
          setAllEventsVisible(true);
        }}
        onVolunteer={() => {
          setEventDetailVisible(false);
          setApplyVolunteeringVisible(true);
        }}
        onJoin={() => {
          setEventPayAmount(200);
          setEventDetailVisible(false);
          setEventPayVisible(true);
        }}
      />
    );
  }

  if (scheduledEventsVisible) {
    return (
      <ScheduledEventsScreen
        onBack={() => setScheduledEventsVisible(false)}
        onAdd={() => {}}
        onEventPress={(event) => {
          setSelectedEvent(event);
          setScheduledEventsVisible(false);
          setEventDetailVisible(true);
        }}
      />
    );
  }

  if (allEventsVisible) {
    return (
      <AllEventsScreen
        onBack={() => setAllEventsVisible(false)}
        onAddEvent={() => {}}
        onEventPress={(event) => {
          setSelectedEvent(event);
          setAllEventsVisible(false);
          setEventDetailVisible(true);
        }}
      />
    );
  }

  if (paymentSuccessVisible) {
    return (
      <PaymentSuccessScreen
        amount={payAmount}
        onDone={() => {
          setPaymentSuccessVisible(false);
          setThankYouVisible(true);
        }}
      />
    );
  }

  if (addCardVisible) {
    return (
      <AddCardScreen
        amount={payAmount}
        onBack={() => setAddCardVisible(false)}
        onPay={() => {
          setAddCardVisible(false);
          setPaymentSuccessVisible(true);
        }}
      />
    );
  }

  if (addAccountVisible) {
    return (
      <AddAccountScreen
        amount={payAmount}
        onBack={() => setAddAccountVisible(false)}
        onPay={() => {
          setAddAccountVisible(false);
          setPaymentSuccessVisible(true);
        }}
      />
    );
  }

  if (selectBankVisible) {
    return (
      <SelectBankScreen
        onBack={() => setSelectBankVisible(false)}
        onSelectBank={() => {
          setSelectBankVisible(false);
          setAddAccountVisible(true);
        }}
      />
    );
  }

  if (payVisible) {
    return (
      <PayScreen
        amount={payAmount}
        onBack={() => {
          setPayVisible(false);
          setDonationVisible(true);
        }}
        onSuccess={() => {
          setPayVisible(false);
          setPaymentSuccessVisible(true);
        }}
        onAddAccount={() => {
          setPayVisible(false);
          setSelectBankVisible(true);
        }}
        onAddCard={() => {
          setPayVisible(false);
          setAddCardVisible(true);
        }}
      />
    );
  }

  if (donationVisible) {
    return (
      <DonationScreen
        onBack={() => setDonationVisible(false)}
        onPay={(amount) => {
          setPayAmount(amount);
          setDonationVisible(false);
          setPayVisible(true);
        }}
      />
    );
  }

  if (allNoticesVisible) {
    return (
      <AllNoticesScreen
        onBack={() => setAllNoticesVisible(false)}
        onNavigateToArchived={(activeTab) => {
          setArchivedType(activeTab === 'Announcements' ? 'announcement' : 'notice');
          setAllNoticesVisible(false);
          setArchivedNoticesVisible(true);
        }}
      />
    );
  }

  if (archivedNoticesVisible) {
    return (
      <ArchivedNoticesScreen
        onBack={() => setArchivedNoticesVisible(false)}
        type={archivedType}
      />
    );
  }

  if (createNoticeVisible) {
    return (
      <CreateNoticeScreen
        onBack={() => setCreateNoticeVisible(false)}
        onNext={(data) => {
          setNoticeData(data);
          setCreateNoticeVisible(false);
          setNoticePreviewVisible(true);
        }}
      />
    );
  }

  if (noticePreviewVisible) {
    return (
      <NoticePreviewScreen
        onBack={() => {
          setNoticePreviewVisible(false);
          setNoticeData(null);
        }}
        noticeData={noticeData}
        onEdit={() => {
          setNoticePreviewVisible(false);
          setCreateNoticeVisible(true);
        }}
        onPublish={() => {
          // Handle publish logic
          setNoticePreviewVisible(false);
          setNoticeData(null);
          setAllNoticesVisible(true);
        }}
        onNavigateToAllNotices={() => {
          setNoticePreviewVisible(false);
          setNoticeData(null);
          setAllNoticesVisible(true);
        }}
      />
    );
  }

  if (resolveIssueVisible) {
    return (
      <ResolveIssueScreen
        onBack={() => setResolveIssueVisible(false)}
        onSubmit={() => {
          setResolveIssueVisible(false);
          setSelectedIssue(null);
          setAllIssuesVisible(true);
        }}
        issue={selectedIssue}
        associationName={mandalData.name}
      />
    );
  }

  if (issueDetailVisible) {
    return (
      <IssueDetailScreen
        onBack={() => {
          setIssueDetailVisible(false);
          setSelectedIssue(null);
          setAllIssuesVisible(true);
        }}
        onResolve={() => {
          setIssueDetailVisible(false);
          setResolveIssueVisible(true);
        }}
        issue={selectedIssue}
        associationName={mandalData.name}
      />
    );
  }

  if (allIssuesVisible) {
    return (
      <AllIssuesScreen
        onBack={() => {
          setAllIssuesVisible(false);
          setIssueSuccessForNext(null);
        }}
        onRaiseIssue={() => {
          setAllIssuesVisible(false);
          setRaiseIssueVisible(true);
        }}
        onIssuePress={(issue) => {
          setSelectedIssue(issue);
          setAllIssuesVisible(false);
          setIssueDetailVisible(true);
        }}
        successIssue={issueSuccessForNext}
        onSuccessModalClose={() => setIssueSuccessForNext(null)}
      />
    );
  }

  if (issuePreviewVisible) {
    return (
      <IssuePreviewScreen
        onBack={() => {
          setIssuePreviewVisible(false);
          setIssueData(null);
        }}
        onNext={() => {
          setIssueSuccessForNext(issueData);
          setIssuePreviewVisible(false);
          setAllIssuesVisible(true);
        }}
        issueData={issueData}
        associationName={mandalData.name}
      />
    );
  }

  if (raiseIssueVisible) {
    return (
      <RaiseIssueScreen
        onBack={() => setRaiseIssueVisible(false)}
        onNext={(data) => {
          setIssueData({
            ...data,
            reporterName: data.selectedMembers?.[0]?.name || 'Member',
          });
          setRaiseIssueVisible(false);
          setIssuePreviewVisible(true);
        }}
        associationName={mandalData.name}
      />
    );
  }

  if (addPhotosVisible) {
    return (
      <AddPhotosScreen
        onBack={() => {
          setAddPhotosVisible(false);
          setSelectedAlbum(null);
          setPhotoGalleryVisible(true);
        }}
        onDone={(data) => {
          setAddPhotosVisible(false);
          setSelectedAlbum(null);
          setPhotoGalleryVisible(true);
          setGallerySuccessMessage(`${data.photos.length} new photos added successfully!`);
          setTimeout(() => setGallerySuccessMessage(''), 3000);
        }}
        album={selectedAlbum}
      />
    );
  }

  if (photoGalleryVisible) {
    return (
      <PhotoGalleryScreen
        onBack={() => {
          setPhotoGalleryVisible(false);
          setGallerySuccessMessage('');
        }}
        onAddPhotos={(album) => {
          setSelectedAlbum(album);
          setPhotoGalleryVisible(false);
          setAddPhotosVisible(true);
        }}
      />
    );
  }

  return (
    <SafeAreaView style={memberDashboardStyles.container}>
      {/* Main Content */}
      <ScrollView
        style={memberDashboardStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Quick Actions */}
        <MemberHeader
          mandalData={mandalData}
          onBack={onBack}
          quickActions={quickActions}
          onQuickActionPress={(action) => {
            if (action.id === '1') setDonationVisible(true);
            if (action.id === '2') setAllNoticesVisible(true);
            if (action.id === '3') setAllEventsVisible(true);
            if (action.id === '4') setAllIssuesVisible(true);
          }}
        />

        {/* Donations Section */}
        <DonationsSection />

        {/* Member Issues Card */}
        <MemberIssuesSection />

        {/* Photo Gallery Section */}
        <PhotoGallerySection />

        {/* Notice Board Section */}
        <NoticeBoardSection />

        {/* Events Section */}
        <EventsSection />



        {/* Members Section */}
        <MembersSection />

        {/* About Section */}
        <AboutSection />
      </ScrollView>

      <InviteMembersScreen
        visible={inviteMembersVisible}
        onClose={() => setInviteMembersVisible(false)}
        onSuccess={() => {
          setInviteMembersVisible(false);
          Alert.alert(
            'Success',
            'You have invited a member. They will be added once they accept the request from DigiMandal App.'
          );
        }}
      />
    </SafeAreaView>
  );
}

