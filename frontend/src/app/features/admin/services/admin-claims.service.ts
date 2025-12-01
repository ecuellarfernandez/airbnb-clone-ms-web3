import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@app/core/config/api.config';
import { StandardResult, PagedResponse } from '@app/core/model/api-response.model';
import { Claim, CreateClaimDTO } from '@app/features/users/domain/models/claim.model';

@Injectable({
  providedIn: 'root',
})
export class AdminClaimsService {
  private readonly apiUrl = API_ENDPOINTS.IDENTITY.CLAIMS;

  constructor(private http: HttpClient) {}

  /**
   * GET /api/claims
   * Lista todos los claims con paginacion
   */

  getClaims(page: number = 0, size: number = 10): Observable<PagedResponse<Claim>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    return this.http.get<PagedResponse<Claim>>(this.apiUrl, { params });
  }

  /**
   * GET /api/claims/id
   * Obtiene el id del claim
   */
  getClaimById(id: number): Observable<StandardResult<Claim>> {
    return this.http.get<StandardResult<Claim>>(`${this.apiUrl}/${id}`);
  }

  /**
   * GET /api/claims
   * Crea un nuevo Claim
   */
  createClaim(claim: CreateClaimDTO): Observable<StandardResult<Claim>> {
    return this.http.post<StandardResult<Claim>>(this.apiUrl, claim);
  }

  /**
   * PUT /api/claims/{id}
   * Actualiza el claim
   */
  updateClaim(id: number, claim: Partial<CreateClaimDTO>): Observable<StandardResult<Claim>> {
    return this.http.put<StandardResult<Claim>>(`${this.apiUrl}/${id}`, claim);
  }

  /**
   * DELETE /api/claims/{id}
   * Elimina un claim
   */
  deleteClaim(id: number): Observable<StandardResult<void>> {
    return this.http.delete<StandardResult<void>>(`${this.apiUrl}/${id}`);
  }
}
