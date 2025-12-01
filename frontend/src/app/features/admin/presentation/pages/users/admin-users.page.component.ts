import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminUsersService } from '@features/admin/services/admin-user.service';
import { User, Role } from '@features/users/domain/models/user.model';
import { PagedResponse } from '@core/model/api-response.model';
import { catchError, of } from 'rxjs';

@Component({
    selector: 'app-admin-users-page',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-users.page.component.html',
    styleUrls: ['./admin-users.page.component.scss']
})
export class AdminUsersPageComponent implements OnInit {
    users: User[] = [];
    roles: Role[] = [];
    
    // Paginación
    currentPage = 0;
    pageSize = 20;
    totalElements = 0;
    totalPages = 0;
    isLastPage = false;
    
    // Búsqueda y filtros
    searchTerm = '';
    selectedRoleFilter = '';
    
    // Estados
    isLoading = false;
    errorMessage = '';
    
    // Para template
    Math = Math;

    constructor(private adminUsersService: AdminUsersService) {}

    ngOnInit(): void {
        this.loadRoles();
        this.loadUsers();
    }

    onSearchClick(): void {
        this.currentPage = 0;
        this.loadUsers();
    }

    onSearchKeydown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.onSearchClick();
        }
    }

    onRoleFilterChange(roleName: string): void {
        this.selectedRoleFilter = roleName;
        this.currentPage = 0;
        this.loadUsers();
    }

    private performSearch(): void {
        this.isLoading = true;
        this.errorMessage = '';

        const request = this.selectedRoleFilter
            ? this.adminUsersService.getUsersByRole(this.selectedRoleFilter, this.currentPage, this.pageSize)
            : this.adminUsersService.searchUsers(this.searchTerm, this.currentPage, this.pageSize);

        request.pipe(
            catchError(error => {
                this.errorMessage = 'Error al cargar usuarios: ' + error.message;
                this.isLoading = false;
                return of(null);
            })
        ).subscribe(response => {
            if (response && response.success) {
                this.users = this.mapUsersWithAvatars(response.content);
                this.totalElements = response.totalElements;
                this.totalPages = response.totalPages;
                this.isLastPage = response.last;
            }
            this.isLoading = false;
        });
    }

    private mapUsersWithAvatars(users: User[]): User[] {
        return users.map(user => ({
            ...user,
            avatar: this.generateAvatarUrl(user)
        }));
    }

    private generateAvatarUrl(user: User): string {
        const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;
    }

    loadUsers(): void {
        this.performSearch();
    }

    private loadRoles(): void {
        this.adminUsersService.getRoles().subscribe({
            next: (response) => {
                if (response.success) {
                    this.roles = response.content;
                }
            },
            error: (error) => {
                console.error('Error al cargar roles:', error);
            }
        });
    }

    toggleRole(user: User, roleName: string): void {
        const hasRole = this.hasRole(user, roleName);
        const role = this.roles.find(r => r.name === roleName.toUpperCase());
        
        if (!role) {
            console.error('Rol no encontrado:', roleName);
            return;
        }

        const request = hasRole
            ? this.adminUsersService.removeRoleFromUser(user.id, role.id)
            : this.adminUsersService.addRoleToUser(user.id, role.id);

        request.subscribe({
            next: (response) => {
                if (response.success) {
                    // Actualizar el usuario en la lista
                    const index = this.users.findIndex(u => u.id === user.id);
                    if (index !== -1 && response.data) {
                        this.users[index] = {
                            ...response.data,
                            avatar: this.generateAvatarUrl(response.data)
                        };
                    }
                } else {
                    this.errorMessage = response.errorMessage || 'Error al actualizar rol';
                }
            },
            error: (error) => {
                this.errorMessage = 'Error al actualizar rol: ' + error.message;
            }
        });
    }

    hasRole(user: User, roleName: string): boolean {
        return user.roles?.some(r => r.name === roleName.toUpperCase()) ?? false;
    }

    // Métodos de paginación
    goToPage(page: number): void {
        if (page >= 0 && page < this.totalPages) {
            this.currentPage = page;
            this.loadUsers();
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

    clearFilters(): void {
        this.searchTerm = '';
        this.selectedRoleFilter = '';
        this.currentPage = 0;
        this.loadUsers();
    }
}
