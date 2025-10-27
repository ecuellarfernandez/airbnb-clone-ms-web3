import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-card-carousel',
  standalone: false,
  templateUrl: './card-carousel.component.html',
  styleUrl: './card-carousel.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class CardCarouselComponent<T> {
  @Input() title: string = '';
  @Input() items: T[] = [];
  @Output() itemClick = new EventEmitter<T>();

  scrollLeft(): void {
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer?.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight(): void {
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer?.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }
}
