import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Text } from 'react-native';

const PURPLE = '#7E48DC';

/**
 * Loader Component
 * 
 * Usage:
 * 1. Inline loader: <Loader />
 * 2. With message: <Loader message="Loading..." />
 * 3. Full screen overlay: <Loader overlay visible={isLoading} />
 * 4. Custom size/color: <Loader size="large" color="#FF0000" />
 * 5. Full screen overlay with message: <Loader overlay visible={isLoading} message="Please wait..." />
 */

export default function Loader({
  visible = true,
  overlay = false,
  size = 'large',
  color = PURPLE,
  message = '',
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  containerStyle,
}) {
  // Don't render if not visible
  if (!visible) return null;

  // Inline loader (no overlay)
  if (!overlay) {
    return (
      <View style={[styles.inlineContainer, containerStyle]}>
        <ActivityIndicator size={size} color={color} />
        {message ? <Text style={[styles.message, { color }]}>{message}</Text> : null}
      </View>
    );
  }

  // Full screen overlay loader
  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size={size} color={color} />
          {message ? <Text style={styles.overlayMessage}>{message}</Text> : null}
        </View>
      </View>
    </Modal>
  );
}

/**
 * PageLoader - Centered loader for page content
 * Use this when loading page content (replaces entire page content area)
 */
export function PageLoader({ message = 'Loading...', color = PURPLE }) {
  return (
    <View style={styles.pageLoaderContainer}>
      <ActivityIndicator size="large" color={color} />
      {message ? <Text style={[styles.pageMessage, { color }]}>{message}</Text> : null}
    </View>
  );
}

/**
 * ButtonLoader - Small loader for buttons
 * Use inside buttons when submitting
 */
export function ButtonLoader({ color = '#fff', size = 'small' }) {
  return <ActivityIndicator size={size} color={color} />;
}

const styles = StyleSheet.create({
  // Inline loader styles
  inlineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
  },

  // Overlay loader styles
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  overlayMessage: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },

  // Page loader styles
  pageLoaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  pageMessage: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '500',
  },
});
