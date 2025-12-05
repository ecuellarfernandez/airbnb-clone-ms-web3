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
  ADMIN: {
    AUDIT_LOGS: `${API_GATEWAY}/api/admin-service/audit-logs`,
  },
  LISTINGS: {
    BASE: `${API_GATEWAY}/api/listings-service`,
    BOOKINGS: `${API_GATEWAY}/api/listings-service/bookings`,
    ADMIN: `${API_GATEWAY}/api/listings-service/listings/admin`
  },
  
} as const;
