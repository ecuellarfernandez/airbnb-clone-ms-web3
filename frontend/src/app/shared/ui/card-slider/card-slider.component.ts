import {
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  QueryList,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener,
  PLATFORM_ID,
  Inject, Input
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[itemCarousel]',
})
export class CarouselItemDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Component({
  selector: 'app-card-slider',
  standalone: false,
  templateUrl: './card-slider.component.html',
  styleUrl: './card-slider.component.scss'
})
export class CardSliderComponent implements AfterViewInit {
  @Input() title?: string;
  @Input() indicators?: boolean = false;
  @ContentChildren(CarouselItemDirective) items!: QueryList<CarouselItemDirective>;
  @ViewChild('carousel') private carouselContainer!: ElementRef;
  @ViewChild('carouselInner') private carouselInner!: ElementRef;

  totalCards: number = 0;
  cardsVisible: number = 6; // Tarjetas visibles a la vez (responsive)
  currentIndex: number = 0; // Índice de la primera tarjeta visible
  gap: number = 16; // Gap entre tarjetas en px

  // Drag functionality
  isDragging: boolean = false;
  startX: number = 0;
  scrollLeft: number = 0;
  dragThreshold: number = 5;
  isMobileOrTablet: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    this.totalCards = this.items.length;
    if (isPlatformBrowser(this.platformId)) {
      this.updateCardsVisible();
    }
    this.cdr.detectChanges();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateCardsVisible();
      this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
      this.updateSliderPosition();
    }
  }

  updateCardsVisible(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const width = window.innerWidth;

    if (width < 768) {
      this.cardsVisible = 2;
      this.isMobileOrTablet = true;
    } else if (width < 1024) {
      this.cardsVisible = 4;
      this.isMobileOrTablet = true;
    } else {
      this.cardsVisible = 6;
      this.isMobileOrTablet = false;
    }
  }

  // Drag functionality
  onDragStart(event: MouseEvent | TouchEvent): void {
    if (!this.isMobileOrTablet) return;

    this.isDragging = true;
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.startX = clientX;

    const currentTransform = this.carouselInner.nativeElement.style.transform;
    const matrix = new DOMMatrix(currentTransform);
    this.scrollLeft = matrix.m41; // translateX value
  }

  onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging || !this.isMobileOrTablet) return;

    event.preventDefault();
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const deltaX = clientX - this.startX;

    this.carouselInner.nativeElement.style.transform = `translateX(${this.scrollLeft + deltaX}px)`;
  }

  onDragEnd(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging || !this.isMobileOrTablet) return;

    this.isDragging = false;

    const clientX = event instanceof MouseEvent ? event.clientX : event.changedTouches[0].clientX;
    const deltaX = clientX - this.startX;

    // Determinar dirección del swipe
    if (Math.abs(deltaX) > this.dragThreshold) {
      if (deltaX > 50 && this.canGoPrev) {
        this.prev();
      } else if (deltaX < -50 && this.canGoNext) {
        this.next();
      } else {
        // Volver a la posición actual si el swipe no fue suficiente
        this.updateSliderPosition();
      }
    } else {
      this.updateSliderPosition();
    }
  }

  next(): void {
    if (this.canGoNext) {
      this.currentIndex++;
      this.updateSliderPosition();
    }
  }

  prev(): void {
    if (this.canGoPrev) {
      this.currentIndex--;
      this.updateSliderPosition();
    }
  }

  updateSliderPosition(): void {
    if (!this.carouselInner) return;

    // Calcular el ancho de una tarjeta incluyendo el gap
    const containerWidth = this.carouselContainer?.nativeElement?.offsetWidth || 0;
    if (!containerWidth) return;

    const cardWidth = (containerWidth - (this.cardsVisible - 1) * this.gap) / this.cardsVisible;
    const translateX = -(this.currentIndex * (cardWidth + this.gap));

    this.carouselInner.nativeElement.style.transform = `translateX(${translateX}px)`;
  }

  get canGoPrev(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.maxIndex;
  }

  get maxIndex(): number {
    return Math.max(0, this.totalCards - this.cardsVisible);
  }

  get totalPages(): number {
    return this.maxIndex + 1;
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  goToPage(index: number): void {
    if (index >= 0 && index <= this.maxIndex) {
      this.currentIndex = index;
      this.updateSliderPosition();
    }
  }

  getCardWidth(): string {
    return `calc((100% - ${(this.cardsVisible - 1) * this.gap}px) / ${this.cardsVisible})`;
  }
}

