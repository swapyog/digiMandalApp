/**
 * Common API helpers used across auth and mandal flows.
 * Same format as cms-mobile-app (Content-Type + Bearer token).
 */
export const getAuthHeaders = (accessToken = '') => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${accessToken}`,
});
