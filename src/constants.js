import { Platform } from 'react-native';

/**
 * Backend base URL for DigiMandal API (digiMandal folder, runs on port 3000).
 * - iOS Simulator: localhost
 * - Android Emulator: 10.0.2.2 (host machine's localhost)
 * - Physical device: replace with your machine's LAN IP (e.g. http://192.168.1.x:3000)
 */
const getBaseUrl = () => {
  const PORT = 3000;
  if (Platform.OS === 'android') {
    return `http://10.0.2.2:${PORT}`;
  }
  return `http://localhost:${PORT}`;
};

const baseURL = getBaseUrl();

/** Same format as cms-mobile-app: use with axios and Authorization header */
export const apiHost = { baseURL };

export const API_BASE_URL = baseURL;

/**
 * API path prefixes (backend route mounts from server.js)
 */
export const API_PATHS = {
  AUTH: '/api/auth',
  MANDAL: '/api/mandal',
  INVITATION: '/api/invitation',
  MEMBERS: '/api/members',
  DOCUMENTS: '/api/documents',
  INTERESTS: '/api/interests',
};

/**
 * Full API base URL for fetch/axios (base + path).
 * Usage: `${API_BASE_URL}${API_PATHS.AUTH}/send-otp`
 */
export const apiUrl = (path) => `${API_BASE_URL}${path}`;
