import { StyleSheet } from 'react-native';

const PURPLE = '#7E48DC';
const DARK_PURPLE = '#110723';

export const memberDashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  // Member Header
  memberHeader: {
    backgroundColor: DARK_PURPLE,
    paddingTop: 8,
    paddingBottom: 20,
    // paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  memberHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  memberHeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  memberHeaderLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  memberHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    // width: 80,
    // justifyContent: 'flex-end',
  },
  backButton: {
    // padding: 4,
    width: 32,
  },
  publicText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  memberHeaderInfo: {
    paddingHorizontal: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  memberHeaderInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 4,
    width: '100%',
    paddingHorizontal: 30,
  },
  memberHeaderName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 22,
    textAlign: 'center',
  },
  memberHeaderSubtitle: {
    fontSize: 14,
    color: '#808F9E',
    textAlign: 'center',
    marginTop: 10,
  },
  // Quick Actions
  quickActionsContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // paddingHorizontal: 16,
    // paddingVertical: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#e5e7eb',
    // paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#7E48DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  quickActionItemWrapper: {
    backgroundColor: '#220D46',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    width: '85',
    height: '85',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F13030',
  },
  quickActionLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  // Section Styles
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  noticeSection: {
    backgroundColor: '#FEF8E7',
    borderRadius: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#808F9E',
  },
  sectionTitleDark: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  sectionCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F13030',
    marginRight: 4,
  },
  sectionLinkText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7E48DC',
  },
  // Donations Cards
  donationsCardsContainer: {
    paddingRight: 16,
    gap: 12,
  },
  donationCard: {
    width: 160,
    backgroundColor: '#F6F2FC',
    borderRadius: 12,
    padding: 12,
  },
  donationPeriod: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 5,
  },
  donationAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 0,
  },
  donationAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    // marginBottom: 12,
  },
  donationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  donationDonors: {
    fontSize: 12,
    color: '#6b7280',
  },
  // Issues Card
  issuesCard: {
    flexDirection: 'row',
    backgroundColor: '#FEF0F0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  issuesContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  issuesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  issuesCount: {
    fontSize: 12,
    fontWeight: '600',
    color: PURPLE,
    marginRight: 4,
  },
  // Photo Gallery
  galleryList: {
    paddingRight: 16,
  },
  galleryImageContainer: {
    marginRight: 12,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  // Add Button
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: PURPLE,
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 12,
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    color: PURPLE,
    fontWeight: '500',
  },
  // Notices
  noticesList: {
    paddingRight: 16,
  },
  noticeCard: {
    width: 280,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  noticeTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  noticeDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  noticeDescription: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
    marginBottom: 8,
  },
  readMoreText: {
    fontSize: 12,
    color: PURPLE,
    fontWeight: '500',
    marginBottom: 8,
  },
  attachmentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  attachmentText: {
    flex: 1,
    fontSize: 12,
    color: '#6b7280',
  },
  attachmentCount: {
    fontSize: 12,
    color: PURPLE,
    fontWeight: '600',
  },
  // Events
  eventsList: {
    paddingRight: 16,
  },
  eventCard: {
    width: 280,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  eventImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 12,
    backgroundColor: '#F6F2FC',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 12,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventDetailText: {
    fontSize: 12,
    color: '#6b7280',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  attendeesCount: {
    fontSize: 12,
    color: '#ffffff',
    backgroundColor: '#110723',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    // marginLeft: -8,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  eventPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  // Members
  membersList: {
    paddingRight: 16,
  },
  memberItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  memberAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: PURPLE,
  },
  memberName: {
    fontSize: 12,
    color: '#111827',
    textAlign: 'center',
  },
  // About
  aboutText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 8,
  },
});

