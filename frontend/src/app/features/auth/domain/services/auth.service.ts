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
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = API_ENDPOINTS.IDENTITY.AUTH;
  
  private readonly TOKEN_KEY = 'authToken';
  private isBrowser: boolean;
  
  // Estado reactivo del token usando BehaviorSubject
  private tokenSubject: BehaviorSubject<string | null>;
  public token$: Observable<string | null>;
  
  // Estado reactivo de autenticación
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Inicializar con el token del localStorage si existe (solo en navegador)
    const token = this.getTokenFromStorage();
    this.tokenSubject = new BehaviorSubject<string | null>(token);
    this.token$ = this.tokenSubject.asObservable();
    
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!token);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
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
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
    this.tokenSubject.next(token);
    this.isAuthenticatedSubject.next(true);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  public getTokenFromStorage(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  getCurrentUser(): Observable<StandardResult<User>>{
    const token = this.getTokenFromStorage();

        if (!token) {
      return throwError(() => new Error('No authentication token found'));
    }

    return this.http.get<StandardResult<User>>(
            `${this.API_URL}/me`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
    );
  }

  getUserRoles(user: User): string[] {
    return user.roles.map(role => role.name.toUpperCase());
  }

  hasRole(user: User, roleName: string): boolean {
    return this.getUserRoles(user).includes(roleName.toUpperCase());
  }

  

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.tokenSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}