import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminFacade } from '@features/admin/application/admin.facade';
import { AdminClaimsService } from '@features/admin/services/admin-claims.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-admin-claims-page',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './admin-claims.page.component.html',
	styleUrls: ['./admin-claims.page.component.scss']
})
export class AdminClaimsPageComponent implements OnInit {
	claims$: Observable<any[]>;
	pageNumber = 0;
	pageSize = 10;
	totalPages = 0;
	totalElements = 0;
	isLoading = false;

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
			}
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
}
