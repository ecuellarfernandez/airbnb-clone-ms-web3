import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@core/config/api.config';
import { User, Role } from '@features/users/domain/models/user.model';
import { StandardResult, PagedResponse } from '@core/model/api-response.model';

@Injectable({ providedIn: 'root' })
export class AdminUsersService {
  private usersUrl = API_ENDPOINTS.IDENTITY.USERS;
  private rolesUrl = API_ENDPOINTS.IDENTITY.ROLES;

  constructor(private http: HttpClient) {}

  // GET /api/users/{id}
  getUserById(id: number): Observable<StandardResult<User>> {
    return this.http.get<StandardResult<User>>(`${this.usersUrl}/${id}`);
  }

  // GET /api/users/search
  searchUsers(searchTerm: string = '', page: number = 0, pageSize: number = 20): Observable<PagedResponse<User>> {
    const params = new HttpParams()
      .set('search', searchTerm)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<User>>(`${this.usersUrl}/search`, { params });
  }

  // GET /api/users/get-by-role/{roleName}
  getUsersByRole(roleName: string, page: number = 0, pageSize: number = 20): Observable<PagedResponse<User>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<User>>(`${this.usersUrl}/get-by-role/${roleName}`, { params });
  }

  // GET /api/roles
  getRoles(): Observable<PagedResponse<Role>> {
    return this.http.get<PagedResponse<Role>>(`${this.rolesUrl}?page=0&pageSize=100`);
  }

  // PUT /api/users/{id}/add-role/{roleId}
  addRoleToUser(userId: number, roleId: number): Observable<StandardResult<User>> {
    return this.http.put<StandardResult<User>>(
      `${this.usersUrl}/${userId}/add-role/${roleId}`,
      {}
    );
  }

  // PUT /api/users/{id}/remove-role/{roleId}
  removeRoleFromUser(userId: number, roleId: number): Observable<StandardResult<User>> {
    return this.http.put<StandardResult<User>>(
      `${this.usersUrl}/${userId}/remove-role/${roleId}`,
      {}
    );
  }
}