import {Component, ContentChild, Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Directive({
  selector: '[card-media]',
})
export class CardMediaDirective {}

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() skin: 'box' | 'flat' | 'outline' = 'flat';
  @Input() clickable = false;
  @Input() classes?: string | string[];

  @Output() cardClick = new EventEmitter<MouseEvent>();

  @ContentChild(CardMediaDirective, { read: ElementRef }) mediaRef?: ElementRef;

  onCardClick(e: MouseEvent): void {
    if (this.clickable) {
      this.cardClick.emit(e);
    }
  }
}
