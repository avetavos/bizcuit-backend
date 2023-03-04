export default () => ({
  port: +process.env.APP_PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost',
});
