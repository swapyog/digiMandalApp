import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../styles/appStyles';
import { StorageService } from '../../utils/storage';

export default function LanguageScreen({ onNext }) {
  const [selected, setSelected] = useState('Marathi');

  // Load saved language on mount
  useEffect(() => {
    const loadSavedLanguage = async () => {
      const savedLanguage = await StorageService.getLanguage();
      if (savedLanguage) {
        setSelected(savedLanguage);
      }
    };
    loadSavedLanguage();
  }, []);

  const languages = [
    { id: 'English', primary: 'English', secondary: 'English' },
    { id: 'Hindi', primary: 'हिन्दी', secondary: 'Hindi' },
    { id: 'Marathi', primary: 'मराठी', secondary: 'Marathi' },
    { id: 'Gujarati', primary: 'ગુજરાતી', secondary: 'Gujarati' },
  ];

  return (
    <SafeAreaView style={styles.languageRoot}>
      {/* <View style={styles.languageHeaderIcon} /> */}
      <Image source={require('../../public/images/uil_language.png')} style={styles.languageHeaderIcon} />
      <Text style={styles.languageTitle}>Choose your Language</Text>
      <Text style={styles.languageSubtitle}>
        Please the language in which you would like to use the DigiMandal App
      </Text>

      <View style={styles.languageList}>
        {languages.map(language => {
          const isSelected = selected === language.id;
          return (
            <TouchableOpacity
              key={language.id}
              style={[
                styles.languageItem,
                isSelected && styles.languageItemSelected,
              ]}
              onPress={() => setSelected(language.id)}
            >
              <Text
                style={[
                  styles.languagePrimary,
                  isSelected && styles.languagePrimarySelected,
                ]}
              >
                {language.primary}
              </Text>
              <Text style={styles.languageSecondary}>{language.secondary}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.primaryButtonBottom}
        onPress={async () => {
          await StorageService.setLanguage(selected);
          onNext();
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.primaryButtonText}>Next</Text>
          <Icon name="chevron-right" size={20} color="#ffffff" style={{ marginLeft: 8 }} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


