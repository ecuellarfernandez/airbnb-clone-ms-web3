import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_ENDPOINTS } from '@core/config/api.config';
import { User } from '@app/features/users/domain/models/user.model';

interface RegisterRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface TokenAuth {
  token: string;
}

interface StandardResult<T> {
  success: boolean;
  errorMessage: string;
  data: T;
}

@Injectable({
  providedIn: 'root' // Singleton - una única instancia en toda la app
})
export class AuthService {
  private readonly API_URL = API_ENDPOINTS.IDENTITY.AUTH;
  private readonly TOKEN_KEY = 'authToken';
  private isBrowser: boolean;

  // Estado reactivo global con BehaviorSubject
  private tokenSubject$ = new BehaviorSubject<string | null>(null);
  private userSubject$ = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);

  // Observables públicos para suscripción 
  public token$ = this.tokenSubject$.asObservable();
  public user$ = this.userSubject$.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  // esto es para obtener el usuario en cualquier parte
  get currentUser(): User | null {
    return this.userSubject$.value;
  }

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Sincronizar BehaviorSubject con localStorage al iniciar
    this.initializeToken();
  }

  /**
   * Inicializa el BehaviorSubject con el token del localStorage
   * Solo se ejecuta una vez al crear el servicio (singleton)
   */
  private initializeToken(): void {
    if (this.isBrowser) {
      const token = localStorage.getItem(this.TOKEN_KEY);
      if (token) {
        this.tokenSubject$.next(token);
        this.isAuthenticatedSubject$.next(true);
      }
    }
  }

  register(registerData: RegisterRequest): Observable<StandardResult<TokenAuth>> {
    return this.http.post<StandardResult<TokenAuth>>(
      `${this.API_URL}/register`,
      registerData
    );
  }

  login(loginData: LoginRequest): Observable<StandardResult<TokenAuth>> {
    return this.http.post<StandardResult<TokenAuth>>(
      `${this.API_URL}/login`,
      loginData
    ).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setToken(response.data.token);
        }
      })
    );
  }

  setToken(token: string): void {
    // Guardar en localStorage (persistencia)
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
    
    // Actualizar BehaviorSubject (estado reactivo global)
    this.tokenSubject$.next(token);
    this.isAuthenticatedSubject$.next(true);
  }

  /**
   * Obtiene el token del BehaviorSubject (estado en memoria)
   * Esto es instantáneo y reactivo
   */
  getToken(): string | null {
    return this.tokenSubject$.value;
  }

  /**
   * Obtiene el token directamente del localStorage
   * Útil para casos donde el BehaviorSubject podría no estar inicializado
   */
  getTokenFromStorage(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error leyendo token:', error);
      return null;
    }
  }

  getCurrentUser(): Observable<StandardResult<User>> {
    const token = this.getToken();

    if (!token) {
      return throwError(() => new Error('No authentication token found'));
    }

    return this.http.get<StandardResult<User>>(
      `${this.API_URL}/me`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).pipe(
      tap(response => {
        if (response.success && response.data) {
          // Actualizar el estado global del usuario
          this.userSubject$.next(response.data);
        }
      })
    );
  }

  /**
   * Obtiene el usuario del BehaviorSubject (estado en memoria)
   */
  getUser(): User | null {
    return this.userSubject$.value;
  }

  getUserRoles(user: User): string[] {
    return user.roles.map(role => role.name.toUpperCase());
  }

  hasRole(user: User, roleName: string): boolean {
    return this.getUserRoles(user).includes(roleName.toUpperCase());
  }

  logout(): void {
    // Limpiar localStorage
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    
    // Limpiar estado reactivo global
    this.tokenSubject$.next(null);
    this.userSubject$.next(null);
    this.isAuthenticatedSubject$.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject$.value;
  }
}