/**
 * Check if the application is running on localhost
 * @returns {boolean} True if running on localhost, false otherwise
 */
export const isLocalhost = (): boolean => {
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/) !== null
  );
};
