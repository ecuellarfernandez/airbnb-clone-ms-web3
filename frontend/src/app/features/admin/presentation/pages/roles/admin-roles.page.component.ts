import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRolesService } from '@features/admin/services/admin-roles.service';
import { AdminClaimsService } from '@features/admin/services/admin-claims.service';
import { Role } from '@features/users/domain/models/user.model';
import { Claim } from '@features/users/domain/models/claim.model';
import { catchError, of, forkJoin } from 'rxjs';
import { ConfirmationModalComponent } from '@shared/ui/confirmation-modal/confirmation-modal.component';

@Component({
    selector: 'app-admin-roles-page',
    standalone: true,
    imports: [CommonModule, FormsModule, ConfirmationModalComponent],
    templateUrl: './admin-roles.page.component.html',
    styleUrls: ['./admin-roles.page.component.scss']
})
export class AdminRolesPageComponent implements OnInit {
    roles: Role[] = [];
    selectedRole: Role | null = null;
    availableClaims: Claim[] = [];
    selectedClaimId: number | null = null;
    
    // Paginación
    currentPage = 0;
    pageSize = 10;
    totalElements = 0;
    totalPages = 0;
    isLastPage = false;
    
    // Estados
    isLoading = false;
    isLoadingDetail = false;
    isLoadingClaims = false;
    isAddingClaim = false;
    errorMessage = '';
    successMessage = '';
    
    // Para template
    Math = Math;

    // Modal de confirmación
    showConfirmModal = false;
    confirmModalTitle = '';
    confirmModalMessage = '';
    pendingRemoveClaimName: string | null = null;

    constructor(
        private adminRolesService: AdminRolesService,
        private adminClaimsService: AdminClaimsService
    ) {}

    ngOnInit(): void {
        this.loadRoles();
    }

    loadRoles(): void {
        this.isLoading = true;
        this.errorMessage = '';

        this.adminRolesService.getRoles(this.currentPage, this.pageSize).pipe(
            catchError(error => {
                this.errorMessage = 'Error al cargar roles: ' + error.message;
                this.isLoading = false;
                return of(null);
            })
        ).subscribe(response => {
            if (response && response.success) {
                this.roles = response.content;
                this.totalElements = response.totalElements;
                this.totalPages = response.totalPages;
                this.isLastPage = response.last;
            }
            this.isLoading = false;
        });
    }

    viewRoleDetail(roleId: number): void {
        this.isLoadingDetail = true;
        this.errorMessage = '';
        this.successMessage = '';

        forkJoin({
            role: this.adminRolesService.getRoleById(roleId),
            claims: this.adminClaimsService.getClaims(0, 100)
        }).pipe(
            catchError(error => {
                this.errorMessage = 'Error al cargar datos: ' + error.message;
                this.isLoadingDetail = false;
                return of(null);
            })
        ).subscribe(response => {
            if (response) {
                if (response.role && response.role.success && response.role.data) {
                    this.selectedRole = response.role.data;
                }
                if (response.claims && response.claims.success) {
                    this.availableClaims = response.claims.content;
                }
            }
            this.isLoadingDetail = false;
        });
    }

    closeDetail(): void {
        this.selectedRole = null;
        this.selectedClaimId = null;
        this.errorMessage = '';
        this.successMessage = '';
    }

    getAvailableClaimsToAdd(): Claim[] {
        if (!this.selectedRole || !this.selectedRole.claims) {
            return this.availableClaims;
        }
        return this.availableClaims.filter(
            claim => !this.selectedRole!.claims!.includes(claim.name)
        );
    }

    addClaimToRole(): void {
        if (!this.selectedRole || !this.selectedClaimId) {
            return;
        }

        this.isAddingClaim = true;
        this.errorMessage = '';
        this.successMessage = '';

        this.adminRolesService.addClaimToRole(this.selectedRole.id, this.selectedClaimId).pipe(
            catchError(error => {
                this.errorMessage = 'Error al agregar claim: ' + error.message;
                this.isAddingClaim = false;
                return of(null);
            })
        ).subscribe(response => {
            if (response && response.success && response.data) {
                this.selectedRole = response.data;
                this.selectedClaimId = null;
                this.successMessage = 'Claim agregado exitosamente';
                setTimeout(() => this.successMessage = '', 3000);
            }
            this.isAddingClaim = false;
        });
    }


    removeClaimFromRole(claimName: string): void {
        if (!this.selectedRole) {
            this.errorMessage = 'No se ha seleccionado ningún rol.';
            return;
        }

        const claim = this.availableClaims.find(c => c.name === claimName);
        if (!claim) {
            this.errorMessage = `El claim "${claimName}" no fue encontrado.`;
            return;
        }

        this.confirmModalTitle = 'Eliminar Permiso';
        this.confirmModalMessage = `¿Estás seguro de que quieres eliminar el permiso "${claimName}" de este rol?`;
        this.pendingRemoveClaimName = claimName;
        this.showConfirmModal = true;
    }

    onConfirmRemoveClaim(): void {
        if (!this.pendingRemoveClaimName || !this.selectedRole) {
            this.closeConfirmModal();
            return;
        }

        const claimName = this.pendingRemoveClaimName;
        const claim = this.availableClaims.find(c => c.name === claimName);
        
        if (!claim) {
            this.closeConfirmModal();
            return;
        }

        this.errorMessage = '';
        this.successMessage = '';

        const roleId = this.selectedRole.id;

        this.adminRolesService.removeClaimFromRole(roleId, claim.id).pipe(
            catchError(error => {
                this.errorMessage = `Error al remover el claim: ${error.message}`;
                return of(null);
            })
        ).subscribe(response => {
            if (response && response.success) {
                if (response.data) {
                    this.selectedRole = response.data;
                    this.successMessage = `Claim "${claimName}" removido exitosamente.`;
                    setTimeout(() => this.successMessage = '', 3000);
                } else {
                    this.adminRolesService.getRoleById(roleId).subscribe(roleResponse => {
                        if (roleResponse && roleResponse.success && roleResponse.data) {
                            this.selectedRole = roleResponse.data;
                        }
                        this.successMessage = `Claim "${claimName}" removido exitosamente.`;
                        setTimeout(() => this.successMessage = '', 3000);
                    });
                }
            } else {
                this.errorMessage = 'No se pudo remover el claim.';
            }
        });

        this.closeConfirmModal();
    }

    closeConfirmModal(): void {
        this.showConfirmModal = false;
        this.pendingRemoveClaimName = null;
    }

    // Métodos de paginación
    goToPage(page: number): void {
        if (page >= 0 && page < this.totalPages) {
            this.currentPage = page;
            this.loadRoles();
        }
    }

    nextPage(): void {
        if (!this.isLastPage) {
            this.goToPage(this.currentPage + 1);
        }
    }

    previousPage(): void {
        if (this.currentPage > 0) {
            this.goToPage(this.currentPage - 1);
        }
    }

    onPageSizeChange(size: string): void {
        this.pageSize = parseInt(size, 10);
        this.currentPage = 0;
        this.loadRoles();
    }
}
