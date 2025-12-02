import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@core/config/api.config';
import { Role } from '@features/users/domain/models/user.model';
import { StandardResult, PagedResponse } from '@core/model/api-response.model';

@Injectable({ providedIn: 'root' })
export class AdminRolesService {
  private rolesUrl = API_ENDPOINTS.IDENTITY.ROLES;

  constructor(private http: HttpClient) {}

  // GET /api/roles/{id}
  getRoleById(id: number): Observable<StandardResult<Role>> {
    return this.http.get<StandardResult<Role>>(`${this.rolesUrl}/${id}`);
  }

  // GET /api/roles
  getRoles(page: number = 0, pageSize: number = 10): Observable<PagedResponse<Role>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    return this.http.get<PagedResponse<Role>>(this.rolesUrl, { params });
  }

  // POST /api/roles/{roleId}/claims/{claimId}
  addClaimToRole(roleId: number, claimId: number): Observable<StandardResult<Role>> {
    return this.http.post<StandardResult<Role>>(
      `${this.rolesUrl}/${roleId}/claims/${claimId}`,
      {}
    );
  }

  // DELETE /api/roles/{roleId}/claims/{claimId}
  removeClaimFromRole(roleId: number, claimId: number): Observable<StandardResult<Role>> {
    return this.http.delete<StandardResult<Role>>(
      `${this.rolesUrl}/${roleId}/claims/${claimId}`
    );
  }
}
