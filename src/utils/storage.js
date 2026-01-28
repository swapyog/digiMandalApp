import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  LANGUAGE: 'digimandal_language',
  LAST_SCREEN: 'digimandal_last_screen',
  MOBILE_NUMBER: 'digimandal_mobile_number',
  OTP_VERIFIED: 'digimandal_otp_verified',
  ACCESS_TOKEN: 'digimandal_access_token',
  MANDAL_ID: 'digimandal_mandal_id',
  PERMISSION_PHONE_ACCESS: 'digimandal_permission_phone_access',
  PERMISSION_PHONE: 'digimandal_permission_phone',
  PERMISSION_SMS: 'digimandal_permission_sms',
  PERMISSION_LOCATION: 'digimandal_permission_location',
  ONBOARDING_COMPLETED: 'digimandal_onboarding_completed',
};

export const StorageService = {
  // Language
  async getLanguage() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
    } catch (error) {
      console.error('Error getting language:', error);
      return null;
    }
  },

  async setLanguage(language) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  },

  // Last Screen
  async getLastScreen() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.LAST_SCREEN);
    } catch (error) {
      console.error('Error getting last screen:', error);
      return null;
    }
  },

  async setLastScreen(screen) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_SCREEN, screen);
    } catch (error) {
      console.error('Error setting last screen:', error);
    }
  },

  // Mobile Number
  async getMobileNumber() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.MOBILE_NUMBER);
    } catch (error) {
      console.error('Error getting mobile number:', error);
      return null;
    }
  },

  async setMobileNumber(mobileNumber) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.MOBILE_NUMBER, mobileNumber);
    } catch (error) {
      console.error('Error setting mobile number:', error);
    }
  },

  // OTP Verified
  async getOtpVerified() {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.OTP_VERIFIED);
      return value === 'true';
    } catch (error) {
      console.error('Error getting OTP verified:', error);
      return false;
    }
  },

  async setOtpVerified(verified) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.OTP_VERIFIED, String(verified));
    } catch (error) {
      console.error('Error setting OTP verified:', error);
    }
  },

  // Access Token
  async getAccessToken() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },

  async setAccessToken(token) {
    try {
      if (token != null) {
        await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, String(token));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      }
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  },

  // Mandal ID (current create-flow mandal)
  async getMandalId() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.MANDAL_ID);
    } catch (error) {
      console.error('Error getting mandal id:', error);
      return null;
    }
  },

  async setMandalId(mandalId) {
    try {
      if (mandalId != null) {
        await AsyncStorage.setItem(STORAGE_KEYS.MANDAL_ID, String(mandalId));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.MANDAL_ID);
      }
    } catch (error) {
      console.error('Error setting mandal id:', error);
    }
  },

  // Permissions
  async getPermissionPhoneAccess() {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.PERMISSION_PHONE_ACCESS);
      return value === 'true';
    } catch (error) {
      console.error('Error getting phone access permission:', error);
      return false;
    }
  },

  async setPermissionPhoneAccess(granted) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PERMISSION_PHONE_ACCESS, String(granted));
    } catch (error) {
      console.error('Error setting phone access permission:', error);
    }
  },

  async getPermissionPhone() {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.PERMISSION_PHONE);
      return value === 'true';
    } catch (error) {
      console.error('Error getting phone permission:', error);
      return false;
    }
  },

  async setPermissionPhone(granted) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PERMISSION_PHONE, String(granted));
    } catch (error) {
      console.error('Error setting phone permission:', error);
    }
  },

  async getPermissionSMS() {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.PERMISSION_SMS);
      return value === 'true';
    } catch (error) {
      console.error('Error getting SMS permission:', error);
      return false;
    }
  },

  async setPermissionSMS(granted) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PERMISSION_SMS, String(granted));
    } catch (error) {
      console.error('Error setting SMS permission:', error);
    }
  },

  async getPermissionLocation() {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.PERMISSION_LOCATION);
      return value === 'true';
    } catch (error) {
      console.error('Error getting location permission:', error);
      return false;
    }
  },

  async setPermissionLocation(granted) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PERMISSION_LOCATION, String(granted));
    } catch (error) {
      console.error('Error setting location permission:', error);
    }
  },

  // Onboarding Completed
  async getOnboardingCompleted() {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
      return value === 'true';
    } catch (error) {
      console.error('Error getting onboarding completed:', error);
      return false;
    }
  },

  async setOnboardingCompleted(completed) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, String(completed));
    } catch (error) {
      console.error('Error setting onboarding completed:', error);
    }
  },

  // Clear all data (for testing/logout)
  async clearAll() {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

