import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() skin: 'box' | 'flat' | 'outline' = 'flat';
  @Input() clickable = false;

  @Output() cardClick = new EventEmitter<MouseEvent>();

  onCardClick(e: MouseEvent): void {
    if (this.clickable) {
      this.cardClick.emit(e);
    }
  }
}
