import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListingFormComponent } from '@features/admin/presentation/components/listing-form/listing-form.component';
import { AdminFacade } from '@features/admin/application/admin.facade';
import { Listing } from '@features/listings/domain/models/listing.model';
import { Observable } from 'rxjs';
import { ConfirmationModalComponent } from '@shared/ui/confirmation-modal/confirmation-modal.component';

@Component({
    selector: 'app-admin-listings-page',
    standalone: true,
    imports: [CommonModule, FormsModule, ListingFormComponent, ConfirmationModalComponent],
    templateUrl: './admin-listings.page.component.html',
    styleUrls: ['./admin-listings.page.component.scss']
})
export class AdminListingsPageComponent implements OnInit {
    q = '';
    showForm = false;
    editing: Listing | undefined;
    listings$!: Observable<Listing[]>;

    // Paginación
    currentPage = 0;
    pageSize = 10;
    totalElements = 0;
    totalPages = 0;
    isLastPage = false;
    Math = Math;

    // Modal de confirmación
    showConfirmModal = false;
    confirmModalTitle = '';
    confirmModalMessage = '';
    confirmModalAction: 'publish' | 'unpublish' | 'delete' | null = null;
    selectedListing: Listing | null = null;

    constructor(private facade: AdminFacade) { }

ngOnInit(): void {
        this.listings$ = this.facade.listings$;
        
        // Suscribirse a la info de paginación
        this.facade.listingsPageInfo$.subscribe(info => {
            this.currentPage = info.pageNumber;
            this.pageSize = info.pageSize;
            this.totalElements = info.totalElements;
            this.totalPages = info.totalPages;
            this.isLastPage = info.isLast;
        });

        // Cargar primera página
        this.facade.loadListings(0, this.pageSize);
    }

    // Paginación
    previousPage(): void {
        if (this.currentPage > 0) {
            this.facade.loadListings(this.currentPage - 1, this.pageSize);
        }
    }

    nextPage(): void {
        if (!this.isLastPage) {
            this.facade.loadListings(this.currentPage + 1, this.pageSize);
        }
    }

    onPageSizeChange(size: string): void {
        this.pageSize = parseInt(size, 10);
        this.facade.loadListings(0, this.pageSize);
    }

toggleStatus(l: Listing) {
        this.selectedListing = l;
        if (l.active) {
            this.confirmModalTitle = 'Desactivar Alojamiento';
            this.confirmModalMessage = `¿Estás seguro de que deseas desactivar "${l.title}"? El alojamiento dejará de estar visible para los usuarios.`;
            this.confirmModalAction = 'unpublish';
        } else {
            this.confirmModalTitle = 'Publicar Alojamiento';
            this.confirmModalMessage = `¿Estás seguro de que deseas publicar "${l.title}"? El alojamiento será visible para todos los usuarios.`;
            this.confirmModalAction = 'publish';
        }
        this.showConfirmModal = true;
    }

    remove(l: Listing) {
        this.selectedListing = l;
        this.confirmModalTitle = 'Eliminar Alojamiento';
        this.confirmModalMessage = `¿Estás seguro de que deseas eliminar "${l.title}"? Esta acción no se puede deshacer.`;
        this.confirmModalAction = 'delete';
        this.showConfirmModal = true;
    }

    onConfirmStatusChange(): void {
        if (!this.selectedListing || !this.confirmModalAction) return;

        if (this.confirmModalAction === 'unpublish') {
            this.facade.unpublishListing(this.selectedListing.id).subscribe({
                next: () => {
                    this.facade.loadListings(this.currentPage, this.pageSize);
                    this.closeConfirmModal();
                },
                error: (err) => {
                    console.error('Error al desactivar', err);
                    this.closeConfirmModal();
                }
            });
        } else if (this.confirmModalAction === 'publish') {
            this.facade.publishListing(this.selectedListing.id).subscribe({
                next: () => {
                    this.facade.loadListings(this.currentPage, this.pageSize);
                    this.closeConfirmModal();
                },
                error: (err) => {
                    console.error('Error al activar', err);
                    this.closeConfirmModal();
                }
            });
        } else if (this.confirmModalAction === 'delete') {
            this.facade.deleteListing(this.selectedListing.id).subscribe({
                next: () => {
                    this.facade.loadListings(this.currentPage, this.pageSize);
                    this.closeConfirmModal();
                },
                error: (err) => {
                    console.error('Error al eliminar', err);
                    this.closeConfirmModal();
                }
            });
        }
    }

    closeConfirmModal(): void {
        this.showConfirmModal = false;
        this.selectedListing = null;
        this.confirmModalAction = null;
    }

    new() { this.editing = undefined; this.showForm = true; }
    edit(l: Listing) { this.editing = l; this.showForm = true; }
    save(payload: Partial<Listing>) {
        if (this.editing) {
            this.facade.update(String(this.editing.id), payload);
        } else {
            this.facade.create(payload);
        }
        this.showForm = false;
    }
}
