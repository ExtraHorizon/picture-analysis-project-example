export default {
  host: process.env.EXPO_PUBLIC_API_HOST || '',
  consumerKey: process.env.EXPO_PUBLIC_API_OAUTH_CONSUMER_KEY || '',
  consumerSecret: process.env.EXPO_PUBLIC_API_OAUTH_CONSUMER_SECRET || '',
  token: process.env.EXPO_PUBLIC_API_OAUTH_TOKEN || '',
  tokenSecret: process.env.EXPO_PUBLIC_API_OAUTH_TOKEN_SECRET || '',
};
