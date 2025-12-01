# Documentación: Sistema de Autenticación con Angular
## Índice

1. [Descripción General](#descripción-general)
2. [Componentes Implementados](#componentes-implementados)
3. [Manejo URL](#MANEJO-URL)

## Descripción General

Se implementó un sistema de autenticación completo para Angular utilizando **RxJS** para la gestión reactiva del estado, siguiendo prácticas recomendadas por Ericki.

### Características principales:

-  Estado reactivo con **BehaviorSubject** y **Observables**
-  Gestión centralizada del token JWT
-  Almacenamiento persistente en **localStorage**
-  **HTTP Interceptor** para agregar automáticamente el Bearer token
-  Compatible con **Server-Side Rendering (SSR)**

## Componentes Implementados

### 1. **AuthService** (`auth.service.ts`)

Servicio centralizado para gestionar el estado de autenticación.

**Ubicación:**  
`src/app/features/auth/domain/services/auth.service.ts`

**Responsabilidades:**
- Gestión del token JWT
- Estado reactivo de autenticación
- Comunicación con el backend
- Persistencia en localStorage

### 2. **AuthInterceptor** (`auth.interceptor.ts`)

Interceptor HTTP que agrega automáticamente el Bearer token a las peticiones.

**Ubicación:**  
`src/app/core/interceptors/auth.interceptor.ts`

**Responsabilidades:**
- Interceptar peticiones HTTP salientes
- Agregar header `Authorization: Bearer [token]`
- Excluir rutas de login/register

### 3. **RegisterPageComponent** (`register-page.component.ts`)

Componente para el formulario de registro de usuarios.

**Ubicación:**  
`src/app/features/auth/presentation/pages/register/register-page.component.ts`

### 4. **Módulos de Configuración**

- `AuthModule`: Módulo de autenticación
- `AppModule`: Configuración del interceptor

--
## MANEJO URL

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
  
- Esto se usara al momento de rendirizar las rutas 
-ejemplo practivo de como seria:
private readonly API_URL = API_ENDPOINTS.IDENTITY.AUTH;

-API_ENDEPOINTS= HACE REFERENCIA AL PUERTO
-IDENTITY= AL MICROSERVICIO
