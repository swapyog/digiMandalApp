import { StyleSheet } from 'react-native';

const PURPLE = '#7E48DC';
const DARK_PURPLE = '#110723';

export const donationsPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: DARK_PURPLE,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  summaryCardPurple: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  summaryCardInactive: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    flexShrink: 1,
  },
  summaryLabelWhite: {
    color: '#ffffff',
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  summaryAmountWhite: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  graphCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
  },
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  periodText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  graphContainer: {
    flexDirection: 'row',
    height: 200,
  },
  yAxisContainer: {
    width: 60,
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  graphArea: {
    flex: 1,
    position: 'relative',
    height: 180,
    paddingBottom: 30,
  },
  graphLinesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 150,
    position: 'relative',
  },
  graphPointContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    height: 150,
  },
  graphDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    zIndex: 3,
  },
  graphLinesOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  graphLine: {
    zIndex: 1,
  },
  xAxisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  xAxisLabel: {
    fontSize: 11,
    color: '#6b7280',
    flex: 1,
    textAlign: 'center',
  },
  historySection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#808F9E',
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 8,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#F6F2FC',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  historyHeaderCellContainer: {
    paddingHorizontal: 2,
  },
  historyHeaderCell: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  historyRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingHorizontal: 8,
  },
  historyCellContainer: {
    paddingHorizontal: 2,
    justifyContent: 'center',
  },
  historyCell: {
    fontSize: 12,
    color: '#111827',
  },
});

