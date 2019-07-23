module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'busy',
      script: 'build/server.js',
      instances: 4,
      exec_mode: 'cluster',
      max_memory_restart: '600M',
      env: {
        NODE_ENV: 'production',
        STEEMCONNECT_CLIENT_ID: 'steemservice',
        STEEMCONNECT_REDIRECT_URL: 'https://www.steemservice.com/callback',
        STEEMCONNECT_HOST: 'https://steemconnect.com',
        SIGNUP_URL: 'https://www.steempeople.com',
        STEEMJS_URL: 'https://api.steemit.com',
        // PORT: 3000,
      },
    },
  ],
};
