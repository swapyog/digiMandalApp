import React, { useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/appStyles';

export default function OnboardingScreen({ onDone }) {
  const [page, setPage] = useState(0);

  const slides = [
    {
      title: 'Stay connected!',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.',
      backgroundImage: require('../../public/images/logo.png'),
    },
    {
      title: 'Local Updates',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.',
        backgroundImage: require('../../public/images/logo.png'),
    },
    {
      title: 'Donations',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.',
        backgroundImage: require('../../public/images/logo.png'),
    },
  ];

  const isLast = page === slides.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setPage(prev => prev + 1);
    } else {
      onDone();
    }
  };

  const { title, description, backgroundImage } = slides[page];

  return (
    <SafeAreaView style={styles.onboardingRoot}>
      {backgroundImage ? (
        <ImageBackground
          source={backgroundImage}
          style={styles.onboardingTop}
          imageStyle={styles.onboardingBackgroundImage}
          resizeMode="cover"
        >
          <View style={styles.onboardingImageOverlay} />
        </ImageBackground>
      ) : (
        <View style={styles.onboardingTop} />
      )}
      <View style={styles.onboardingCard}>
        <Text style={styles.onboardingTitle}>{title}</Text>
        <Text style={styles.onboardingDescription}>{description}</Text>

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === page ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryButtonText}>Login / Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


