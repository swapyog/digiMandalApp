import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7E48DC';

export default function ThankYouScreen({ onDone }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.cloudLeft}>
          <Icon name="cloud" size={40} color="#E9D5FF" />
        </View>
        <View style={styles.cloudRight}>
          <Icon name="cloud" size={32} color="#E9D5FF" />
        </View>
        <View style={styles.heartWrap}>
          <Icon name="favorite" size={24} color="#C4B5FD" />
        </View>
        <View style={styles.starWrap}>
          <Icon name="star" size={24} color="#C4B5FD" />
        </View>
        <Text style={styles.thankYou}>Thank You!</Text>
        <Text style={styles.message}>
          "Thank you so much for your{'\n'}
          generous donation —{'\n'}
          your support means the world to us{'\n'}
          and makes a real difference."
        </Text>
        <View style={styles.planeWrap}>
          <Icon name="flight" size={28} color={PURPLE} />
        </View>
      </View>

      <View style={styles.waveWrap}>
        <TouchableOpacity style={styles.doneButton} onPress={onDone} activeOpacity={0.8}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  cloudLeft: {
    position: 'absolute',
    top: 60,
    left: 24,
  },
  cloudRight: {
    position: 'absolute',
    top: 100,
    right: 32,
  },
  heartWrap: {
    position: 'absolute',
    left: 40,
    top: '40%',
  },
  starWrap: {
    position: 'absolute',
    right: 40,
    top: '38%',
  },
  thankYou: {
    fontSize: 36,
    fontWeight: '700',
    color: PURPLE,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: PURPLE,
    lineHeight: 24,
    textAlign: 'center',
  },
  planeWrap: {
    position: 'absolute',
    bottom: 120,
    left: 32,
  },
  waveWrap: {
    backgroundColor: '#E9D5FF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: PURPLE,
    paddingVertical: 16,
    paddingHorizontal: 80,
    borderRadius: 12,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
