import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateClaimDTO } from '@features/users/domain/models/claim.model';
import { input } from '@angular/core';

@Component({
  selector: 'app-admin-create-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-create-form.component.html',
  styleUrls: ['./admin-create-form.component.scss'],
})
export class AdminCreateFormComponent {
  @Input() initialClaim?: CreateClaimDTO;
  @Output() submit = new EventEmitter<CreateClaimDTO>();
  @Output() cancel = new EventEmitter<void>();

  claim: CreateClaimDTO = {
    name: '',
    description: '',
    active: true,
  };

  ngOnInit(): void {
    if (this.initialClaim) {
      this.claim = { ...this.initialClaim };
    }
  }

  onSubmit() {
    if (this.claim.name && this.claim.description) {
      this.submit.emit(this.claim);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
