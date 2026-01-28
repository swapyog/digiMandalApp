/**
 * Centralised JSON/options data for mandal create flow and related screens.
 * Used by MandalStep1, MandalStep2, MandalStep3, BankDetailsScreen.
 */

// MandalStep1 – size & category
export const sizeOptions = [
  { label: '1-20', value: '1-20' },
  { label: '21-50', value: '21-50' },
  { label: '51-200', value: '51-200' },
  { label: '201-500', value: '201-500' },
  { label: '501-2000', value: '501-2000' },
  { label: 'More than 2000', value: 'more-than-2000' },
];

export const categoryOptions = [
  { label: 'Cultural', value: 'cultural' },
  { label: 'Education', value: 'education' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Design', value: 'design' },
  { label: 'Welfare Association', value: 'welfare-association' },
  { label: 'Sports Association', value: 'sports-association' },
  { label: 'Religious', value: 'religious' },
  { label: 'Social', value: 'social' },
  { label: 'Charity', value: 'charity' },
  { label: 'Youth', value: 'youth' },
];

export const categorySections = [
  { title: 'Popular', options: categoryOptions.slice(0, 6) },
  { title: 'All Categories', options: categoryOptions },
];

/** Year options for formation year (default 2025 down to 1950) */
export const getYearOptions = (fromYear = 2025, toYear = 1950) => {
  const years = [];
  for (let year = fromYear; year >= toYear; year--) {
    years.push({ label: String(year), value: String(year) });
  }
  return years;
};

// MandalStep2 – city & state
export const cityOptions = [
  { label: 'Mumbai', value: 'mumbai' },
  { label: 'Delhi', value: 'delhi' },
  { label: 'Bangalore', value: 'bangalore' },
  { label: 'Hyderabad', value: 'hyderabad' },
  { label: 'Chennai', value: 'chennai' },
  { label: 'Kolkata', value: 'kolkata' },
  { label: 'Pune', value: 'pune' },
  { label: 'Ahmedabad', value: 'ahmedabad' },
  { label: 'Jaipur', value: 'jaipur' },
  { label: 'Surat', value: 'surat' },
  { label: 'Lucknow', value: 'lucknow' },
  { label: 'Kanpur', value: 'kanpur' },
  { label: 'Nagpur', value: 'nagpur' },
  { label: 'Indore', value: 'indore' },
  { label: 'Thane', value: 'thane' },
  { label: 'Bhopal', value: 'bhopal' },
  { label: 'Visakhapatnam', value: 'visakhapatnam' },
  { label: 'Patna', value: 'patna' },
  { label: 'Vadodara', value: 'vadodara' },
  { label: 'Ghaziabad', value: 'ghaziabad' },
];

export const stateOptions = [
  { label: 'Andhra Pradesh', value: 'andhra-pradesh' },
  { label: 'Arunachal Pradesh', value: 'arunachal-pradesh' },
  { label: 'Assam', value: 'assam' },
  { label: 'Bihar', value: 'bihar' },
  { label: 'Chhattisgarh', value: 'chhattisgarh' },
  { label: 'Goa', value: 'goa' },
  { label: 'Gujarat', value: 'gujarat' },
  { label: 'Haryana', value: 'haryana' },
  { label: 'Himachal Pradesh', value: 'himachal-pradesh' },
  { label: 'Jharkhand', value: 'jharkhand' },
  { label: 'Karnataka', value: 'karnataka' },
  { label: 'Kerala', value: 'kerala' },
  { label: 'Madhya Pradesh', value: 'madhya-pradesh' },
  { label: 'Maharashtra', value: 'maharashtra' },
  { label: 'Manipur', value: 'manipur' },
  { label: 'Meghalaya', value: 'meghalaya' },
  { label: 'Mizoram', value: 'mizoram' },
  { label: 'Nagaland', value: 'nagaland' },
  { label: 'Odisha', value: 'odisha' },
  { label: 'Punjab', value: 'punjab' },
  { label: 'Rajasthan', value: 'rajasthan' },
  { label: 'Sikkim', value: 'sikkim' },
  { label: 'Tamil Nadu', value: 'tamil-nadu' },
  { label: 'Telangana', value: 'telangana' },
  { label: 'Tripura', value: 'tripura' },
  { label: 'Uttar Pradesh', value: 'uttar-pradesh' },
  { label: 'Uttarakhand', value: 'uttarakhand' },
  { label: 'West Bengal', value: 'west-bengal' },
];

// MandalStep3 – designation
export const designationOptions = [
  { label: 'President', value: 'president' },
  { label: 'Vice-President', value: 'vice-president' },
  { label: 'Secretary', value: 'secretary' },
  { label: 'Treasurer', value: 'treasurer' },
  { label: 'Joint Secretary', value: 'joint-secretary' },
  { label: 'Member', value: 'member' },
];

// BankDetailsScreen – banks
export const bankOptions = [
  { label: 'State Bank of India', value: 'sbi' },
  { label: 'HDFC Bank', value: 'hdfc' },
  { label: 'ICICI Bank', value: 'icici' },
  { label: 'Axis Bank', value: 'axis' },
  { label: 'Kotak Mahindra Bank', value: 'kotak' },
  { label: 'Punjab National Bank', value: 'pnb' },
  { label: 'Bank of Baroda', value: 'bob' },
  { label: 'Canara Bank', value: 'canara' },
  { label: 'Union Bank of India', value: 'union' },
  { label: 'Indian Bank', value: 'indian' },
];
