import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@core/config/api.config';
import { User, Role } from '@features/users/domain/models/user.model';
import { StandardResult, PagedResponse } from '@core/model/api-response.model'; // Asumiendo que creaste estas interfaces

@Injectable({ providedIn: 'root' })
export class AdminUsersService {
  private usersUrl = API_ENDPOINTS.IDENTITY.USERS;
  private rolesUrl = API_ENDPOINTS.IDENTITY.ROLES;

  constructor(private http: HttpClient) {}

  // GET /api/users/search
  getUsers(page = 0, pageSize = 20, search = ''): Observable<PagedResponse<User>> {
    return this.http.get<PagedResponse<User>>(
      `${this.usersUrl}/search?search=${search}&page=${page}&pageSize=${pageSize}`
    );
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