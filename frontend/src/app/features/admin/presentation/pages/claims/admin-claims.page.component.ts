import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminFacade } from '@features/admin/application/admin.facade';
import { AdminClaimsService } from '@features/admin/services/admin-claims.service';
import { Observable } from 'rxjs';
import { AdminCreateFormComponent } from '../../components/claim-create-from/admin-create-form.component';
import { ConfirmationModalComponent } from '@shared/ui/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-admin-claims-page',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminCreateFormComponent, ConfirmationModalComponent],
  templateUrl: './admin-claims.page.component.html',
  styleUrls: ['./admin-claims.page.component.scss'],
})
export class AdminClaimsPageComponent implements OnInit {
  claims$: Observable<any[]>;
  pageNumber = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  isLoading = false;
  showCreateModel = false;
  editClaim: any = null;

  // Modal de confirmación
  showConfirmModal = false;
  confirmModalTitle = '';
  confirmModalMessage = '';
  pendingDeleteClaimId: number | null = null;

  constructor(private facade: AdminFacade, private claimsService: AdminClaimsService) {
    this.claims$ = this.facade.claims$;
  }

  ngOnInit(): void {
    this.loadPage(0);
  }

  loadPage(page: number): void {
    this.isLoading = true;
    this.pageNumber = page;
    this.facade.loadClaims(page, this.pageSize);
    this.claimsService.getClaims(page, this.pageSize).subscribe({
      next: (resp: any) => {
        if (!resp) {
          this.totalPages = 0;
          this.totalElements = 0;
        } else if (resp.success && resp.content) {
          this.totalPages = resp.totalPages ?? 1;
          this.totalElements = resp.totalElements ?? resp.content.length;
        } else if (resp.content) {
          this.totalPages = resp.totalPages ?? 1;
          this.totalElements = resp.totalElements ?? resp.content.length;
        } else if (Array.isArray(resp)) {
          this.totalPages = 1;
          this.totalElements = resp.length;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching claims pagination info', err);
        this.isLoading = false;
      },
    });
  }

  prev(): void {
    if (this.pageNumber > 0) this.loadPage(this.pageNumber - 1);
  }

  next(): void {
    if (this.pageNumber + 1 < this.totalPages) this.loadPage(this.pageNumber + 1);
  }

  onPageSizeChange(value: string | number): void {
    const size = typeof value === 'string' ? parseInt(value, 10) : value;
    this.pageSize = Number.isFinite(size) && size > 0 ? size : 10;
    this.loadPage(0);
  }

  goto(page: number): void {
    if (page >= 0 && page < this.totalPages) this.loadPage(page);
  }

  trackByClaimId(_index: number, claim: any) {
    return claim.id;
  }

  onAddClaim(): void {
    this.showCreateModel = true;
  }

  handleCreateClaim(claim: any) {
    this.showCreateModel = false;
    this.claimsService.createClaim(claim).subscribe({
      next: () => this.loadPage(this.pageNumber),
      error: (err) => console.error('Error creando claim', err),
    });
  }

  handleCancelCreate() {
    this.showCreateModel = false;
  }

  onEditClaim(claim: any): void {
    this.editClaim = claim;
  }

  handleEditClaim(claim: any) {
    this.editClaim = null;
    this.claimsService.updateClaim(claim.id, claim).subscribe({
      next: () => this.loadPage(this.pageNumber),
      error: (err) => console.error('Error editando claim', err),
    });
  }

  handleCancelEdit() {
    this.editClaim = null;
  }

  confirmDeleteClaim(claim: any): void {
    const claimName = claim.key || claim.name || claim.claim || `ID ${claim.id}`;
    this.confirmModalTitle = 'Eliminar Claim';
    this.confirmModalMessage = `¿Estás seguro de que quieres eliminar el claim "${claimName}"? Esta acción no se puede deshacer.`;
    this.pendingDeleteClaimId = claim.id;
    this.showConfirmModal = true;
  }

  onConfirmDelete(): void {
    if (this.pendingDeleteClaimId !== null) {
      this.onDeleteClaim(this.pendingDeleteClaimId);
    }
    this.closeConfirmModal();
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.pendingDeleteClaimId = null;
  }

  onDeleteClaim(id: number): void {
    this.claimsService.deleteClaim(id).subscribe({
      next: (resp) => {
        if (resp && resp.success) {
          this.loadPage(this.pageNumber);
        } else {
          alert('No se pudo eliminar el claim.');
        }
      },
      error: (err) => {
        console.error('Error eliminando claim', err);
        alert('Error eliminando claim.');
      },
    });
  }
}
