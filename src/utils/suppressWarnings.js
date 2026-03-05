// Suppress only the specific Ant Design React version warning for React 19
const originalWarn = console.warn;
console.warn = (...args) => {
  // Only filter out the specific Ant Design React version warning
  if (args[0] && typeof args[0] === 'string' && 
      args[0].includes('[antd: compatible]') && 
      args[0].includes('antd v5 support React is 16 ~ 18') &&
      args[0].includes('see https://u.ant.design/v5-for-19')) {
    return; // Don't show this specific warning
  }
  // Allow all other warnings and messages to pass through
  originalWarn.apply(console, args);
};
