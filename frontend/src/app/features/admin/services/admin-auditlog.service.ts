import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@core/config/api.config'; 
import { AdminPagedResponse, AuditLog, AuditLogFilters } from '../../users/domain/models/audit-log.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAuditLogsService {
  private readonly apiUrl = API_ENDPOINTS.ADMIN.AUDIT_LOGS;

  constructor(private http: HttpClient) {}

  getAuditLogs(
    page: number = 1, 
    pageSize: number = 10,
    filters: AuditLogFilters = {}
  ): Observable<AdminPagedResponse<AuditLog>> {
    
    let params = new HttpParams()
      .set('current_page', page.toString())
      .set('page_size', pageSize.toString());

    if (filters.search) {
      params = params.set('search', filters.search);
    }

    if (filters.action) params = params.set('action', filters.action);
    if (filters.entity) params = params.set('entity', filters.entity);

    return this.http.get<AdminPagedResponse<AuditLog>>(this.apiUrl, { params });
  }
}