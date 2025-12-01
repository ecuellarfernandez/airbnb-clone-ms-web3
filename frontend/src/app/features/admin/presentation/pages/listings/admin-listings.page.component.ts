import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListingFormComponent } from '@features/admin/presentation/components/listing-form/listing-form.component';
import { AdminFacade } from '@features/admin/application/admin.facade';
import { Listing } from '@features/listings/domain/models/listing.model';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
    selector: 'app-admin-listings-page',
    standalone: true,
    imports: [CommonModule, FormsModule, ListingFormComponent],
    templateUrl: './admin-listings.page.component.html',
    styleUrls: ['./admin-listings.page.component.scss']
})
export class AdminListingsPageComponent implements OnInit {
    q = '';
    showForm = false;
    editing: Listing | undefined;
    listings$!: Observable<Listing[]>;

    constructor(private facade: AdminFacade) { }

    ngOnInit(): void {
        this.listings$ = combineLatest([this.facade.listings$]).pipe(
            map(([items]: [Listing[]]) => {
                const term = this.q.trim().toLowerCase();
                if (!term) return items;
                return items.filter((l: Listing) =>
                    l.title.toLowerCase().includes(term) ||
                    l.city.toLowerCase().includes(term)
                );
            })
        );
    }

    new() { this.editing = undefined; this.showForm = true; }
    edit(l: Listing) { this.editing = l; this.showForm = true; }
    remove(l: Listing) { if (confirm(`¿Eliminar "${l.title}"?`)) this.facade.remove(l.id); }
    save(payload: Partial<Listing>) {
        if (this.editing) this.facade.update(this.editing.id, payload);
        else this.facade.create(payload);
        this.showForm = false;
    }
}
