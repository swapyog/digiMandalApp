import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/appStyles';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.splashContainer}>
      <View style={styles.splashContent}>
        {/* Replace the require path below with the actual path to your logo image.
           For example, create `assets/logo.png` and update:
           source={require('../../assets/logo.png')} */}
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        {/* <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: '#7b3cff',
          }}
        /> */}
        <Image source={require('../../public/images/logo.png')} style={styles.splashLogo} />
        <Text style={styles.splashTitle}>DigiMandal</Text>
      </View>
    </SafeAreaView>
  );
}


