import { Component, OnInit } from '@angular/core';
import { AdminAuditLogsService } from '@features/admin/services/admin-auditlog.service';
import { AuditLog, AuditLogFilters } from '@features/users/domain/models/audit-log.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-audit-logs-page',
  standalone: false,
  templateUrl: './admin-auditlog.page.html',
  styleUrls: ['./admin-auditlog.page.scss']
})
export class AuditLogsPageComponent implements OnInit {
  logs: AuditLog[] = [];
  isLoading = false;
  
  // Paginación (Valores iniciales basados en tu JSON)
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  // Filtros
  searchTerm = '';
  private searchSubject = new Subject<string>();

  constructor(private logsService: AdminAuditLogsService) {}

  ngOnInit(): void {
    this.loadLogs();

    // Debounce para no saturar el servidor mientras escribes
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; // Resetear a primera página al buscar
      this.loadLogs();
    });
  }

  onSearch(term: string): void {
    this.searchSubject.next(term);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.loadLogs();
  }

  loadLogs(): void {
    this.isLoading = true;
    const filters: AuditLogFilters = {
      search: this.searchTerm
    };

    this.logsService.getAuditLogs(this.currentPage, this.pageSize, filters)
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.logs = resp.data;
            this.totalItems = resp.total_items;
            this.totalPages = resp.total_pages;
            this.currentPage = resp.current_page;
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error cargando logs:', err);
          this.isLoading = false;
        }
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLogs();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLogs();
    }
  }
}