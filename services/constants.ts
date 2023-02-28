const prefix = "http://localhost:8080";

export const authUrlService = {
  loginServiceURL: `${prefix}/auth/login`,
  registerServiceURL: `${prefix}/auth/create`,
  profileServiceURL: `${prefix}/auth/profile`,
};

export const serviceStatus = {
  ERROR: 500,
  SUCCESS: 200,
  UNAUTHORIZED: 401,
};
