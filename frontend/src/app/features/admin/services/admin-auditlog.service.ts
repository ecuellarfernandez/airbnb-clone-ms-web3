import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@core/config/api.config'; // Asegúrate de tener configurado: ADMIN: { AUDIT_LOGS: ... }
import { AdminPagedResponse, AuditLog, AuditLogFilters } from '../../users/domain/models/audit-log.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAuditLogsService {
  // Ajusta esto según tu api.config.ts: `${API_GATEWAY}/api/admin-service/audit-logs`
  private readonly apiUrl = API_ENDPOINTS.ADMIN.AUDIT_LOGS;

  constructor(private http: HttpClient) {}

  getAuditLogs(
    page: number = 1, // Django suele empezar en 1, verifica si tu paginador es 0-based o 1-based. Tu JSON dice "current_page": 1
    pageSize: number = 10,
    filters: AuditLogFilters = {}
  ): Observable<AdminPagedResponse<AuditLog>> {
    
    let params = new HttpParams()
      .set('current_page', page.toString()) // Tu backend espera 'current_page' según tu JSON/Paginador
      .set('page_size', pageSize.toString());

    // El backend busca en 'description' usando el parametro 'search'
    if (filters.search) {
      params = params.set('search', filters.search);
    }

    // Si implementaste los filtros extra en el backend:
    if (filters.action) params = params.set('action', filters.action);
    if (filters.entity) params = params.set('entity', filters.entity);

    return this.http.get<AdminPagedResponse<AuditLog>>(this.apiUrl, { params });
  }
}