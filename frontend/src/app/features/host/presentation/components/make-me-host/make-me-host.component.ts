import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-make-me-host',
  standalone: false,
  templateUrl: './make-me-host.component.html',
  styleUrl: './make-me-host.component.scss',
})
export class MakeMeHostComponent {
  @Input() open: boolean = false;
  @Output() closed = new EventEmitter<void>();
  @Output() becomeHost = new EventEmitter<void>();

  closeModal() {
    this.closed.emit();
  }

  onBecomeHost() {
    this.becomeHost.emit();
    this.closeModal();
  }
}
