

export const API_GATEWAY = 'http://localhost:9000';

export const API_BASE = 'http://localhost:5000';

// Endpoints de microservicios
export const API_ENDPOINTS = {
  
  IDENTITY: {
    BASE: `${API_BASE}/api`,
    AUTH: `${API_BASE}/api/auth`,
    USERS: `${API_BASE}/api/users`,
    ROLES: `${API_BASE}/api/roles`,
    CLAIMS: `${API_BASE}/api/claims`,
  },
}
  
  