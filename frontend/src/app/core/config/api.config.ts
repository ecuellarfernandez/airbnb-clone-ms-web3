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

  LISTINGS: {
    BASE: `${API_GATEWAY}/api/listings-service`,
    RESERVATION: `${API_GATEWAY}/api/listings-service/reservations`,
    ADMIN: `${API_GATEWAY}/api/listings-service/listings/admin`
  },
  
  PAYMENTS: {
    BASE: `${API_GATEWAY}/api/payments-service`,
    PAYMENT_RESERVATION: `${API_GATEWAY}/api/payments-service/payments/payment-reservation`,
  },

  ADMIN: {
    AUDIT_LOGS: `${API_GATEWAY}/api/admin-service/audit-logs`,
  },
  

} as const;
  

  
