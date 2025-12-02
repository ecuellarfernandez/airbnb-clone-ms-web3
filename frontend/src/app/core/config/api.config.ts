


export const API_GATEWAY = 'http://localhost:9000';

// Endpoints de microservicios a través del API Gateway
export const API_ENDPOINTS = {

  IDENTITY: {
    BASE: `${API_GATEWAY}/api/identity-service`,
    AUTH: `${API_GATEWAY}/api/identity-service/auth`,
    USERS: `${API_GATEWAY}/api/identity-service/users`,
    ROLES: `${API_GATEWAY}/api/identity-service/roles`,
    CLAIMS: `${API_GATEWAY}/api/identity-service/claims`,
  },
} as const;
  
  