import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';    
import { FormsModule } from '@angular/forms';       
import { ListingFormComponent } from '../../../admin/components/listing-form/listing-form.component';
import { AdminStore } from '../../data-access/services/admin.store';
import { Listing } from '@listings/data-access/models/listing.model';
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

    constructor(private store: AdminStore) { }

    ngOnInit(): void {
        this.listings$ = combineLatest([this.store.listings$]).pipe(
            map(([items]) => {
                const term = this.q.trim().toLowerCase();
                if (!term) return items;
                return items.filter(l =>
                    l.title.toLowerCase().includes(term) ||
                    l.city.toLowerCase().includes(term)
                );
            })
        );
    }

    new() { this.editing = undefined; this.showForm = true; }
    edit(l: Listing) { this.editing = l; this.showForm = true; }
    remove(l: Listing) { if (confirm(`¿Eliminar "${l.title}"?`)) this.store.remove(l.id); }
    save(payload: Partial<Listing>) {
        if (this.editing) this.store.update(this.editing.id, payload);
        else this.store.create(payload);
        this.showForm = false;
    }
}
