import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles as appStyles } from '../../styles/appStyles';
import { PrimaryButton } from '../../components';

const PURPLE = '#7E48DC';
const DARK_BG = '#0b021b';

const INTERESTS = [
  'Festivals',
  'Sports',
  'Music',
  'Volunteering',
  'Civic Issues',
  'Health & Fitness',
  'Education',
  'Local Alerts',
  'Arts',
  'Entrepreneurship',
  'Social Welfare',
  'Culture & Traditions',
  'Travel',
  'Events',
  'Personal Development',
  'Animal Welfare',
  'Environment',
  'Food',
];

export default function InterestsScreen({ onNext }) {
  const [selected, setSelected] = useState([]);

  const toggleInterest = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const canSubmit = selected.length >= 3;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onNext?.(selected);
  };

  return (
    <SafeAreaView style={localStyles.root} edges={['top']}>
      <View style={localStyles.header}>
        <Image
          source={require('../../public/images/logo.png')}
          style={localStyles.headerLogo}
          resizeMode="contain"
        />
        <Text style={localStyles.headerTitle}>DigiMandal</Text>
      </View>

      <View style={localStyles.card}>
        <Text style={[appStyles.loginTitle, localStyles.title]}>
          Choose your interests
        </Text>
        <Text style={[appStyles.loginSubtitle, localStyles.subtitle]}>
          Choose at least 3 interests which will help us provide relevant feeds.
        </Text>

        <ScrollView
          style={localStyles.scroll}
          contentContainerStyle={localStyles.tagsWrap}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={localStyles.tagsRow}>
            {INTERESTS.map((item) => {
              const isSelected = selected.includes(item);
              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    localStyles.tag,
                    isSelected && localStyles.tagSelected,
                  ]}
                  onPress={() => toggleInterest(item)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      localStyles.tagText,
                      isSelected && localStyles.tagTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <PrimaryButton
          title="Submit"
          onPress={handleSubmit}
          disabled={!canSubmit}
          showArrow={false}
          style={localStyles.submitBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: DARK_BG,
  },
  headerLogo: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 20,
  },
  scroll: {
    flex: 1,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 24,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    marginHorizontal: 6,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tagSelected: {
    backgroundColor: '#F3E8FF',
    borderColor: PURPLE,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  tagTextSelected: {
    color: PURPLE,
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: 16,
  },
});
