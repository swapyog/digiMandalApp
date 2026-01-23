import { StyleSheet } from 'react-native';

const PURPLE = '#7E48DC';
const DARK_PURPLE = '#110723';

export const adminDashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: DARK_PURPLE,
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  shareButton: {
    padding: 4,
    marginLeft: 'auto',
    marginRight: 12,
  },
  publicText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  mandalInfoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  mandalLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  mandalInfo: {
    flex: 1,
    paddingTop: 4,
  },
  mandalName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
    lineHeight: 22,
  },
  mandalSubtitle: {
    fontSize: 14,
    color: '#808F9E',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 12,
    // fontWeight: '600',
    color: '#808F9E',
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleWithCount: {
    fontSize: 12,
    // fontWeight: '600',
    color: '#808F9E',
  },
  // Members Section
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  membersList: {
    paddingRight: 8,
  },
  memberAvatarContainer: {
    marginRight: 8,
  },
  memberAvatar: {
    width: 38,
    height: 38,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: PURPLE,
  },
  moreMembersButton: {
    paddingLeft: 8,
  },
  moreMembersText: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE,
  },
  sectionCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#808F9E',
    marginRight: 4,
  },
  // About Section
  aboutText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  // Photo Gallery Section
  galleryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  galleryList: {
    paddingRight: 12,
  },
  galleryImageContainer: {
    marginRight: 12,
  },
  galleryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  morePhotosButton: {
    paddingLeft: 8,
  },
  morePhotosText: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE,
  },
  // Donations Section
  donationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: '#F6F2FC',
    padding: 10,
    borderRadius: 12,
  },
  donationCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: '#e5e7eb',
  },
  donationLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  donationAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  // Services Section
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  serviceCard: {
    width: '47%',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 50,
  },
  serviceIconContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
    flex: 1,
    flexShrink: 1,
  },
});

