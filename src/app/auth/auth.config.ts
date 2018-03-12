import { ENV } from './../core/api/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
  USERNAMEPASSWORDCONNECTION: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'AaeZ7m3ODgA1DSKBrlHjikYoE1ogOfnw',
  CLIENT_DOMAIN: 'padashboard.eu.auth0.com', // e.g., you.auth0.com
  AUDIENCE: 'http://localhost:8083/api/', // e.g., http://localhost:8083/api/
  REDIRECT: `${ENV.BASE_URI}/pages/callback`,
  SCOPE: 'openid profile',
  NAMESPACE: 'https://padashboard.com/roles', // must match namespace from the server config.js,
  USERNAMEPASSWORDCONNECTION: 'Username-Password-Authentication'
};
