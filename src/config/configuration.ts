export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  secretKey: process.env.SECRET_KEY,

  mongoose: {
    url: process.env.MONGODB_URL,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 27017,
  },
});
