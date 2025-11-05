import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-card-book-detail',
  standalone: false,
  templateUrl: './card-book-detail.component.html',
})
export class CardBookDetailComponent {
  @Input() price!: number | string;
  @Input() capacity!: number | string;
  @Input() classes?: string | string[];

  @Output() book = new EventEmitter();

  onBook(e: MouseEvent):void{
    this.book.emit(e);
  }
}
