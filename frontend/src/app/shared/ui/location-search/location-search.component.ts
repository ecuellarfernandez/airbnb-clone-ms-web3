import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { AccommodationsRepository } from '@app/features/listings/domain/repositories/accommodations.repository';

export interface LocationSuggestion {
  id: string;
  name: string;
  country: string;
  description: string;
  icon: 'city' | 'beach' | 'landmark' | 'nature';
}

@Component({
  selector: 'app-location-search',
  standalone: false,
  templateUrl: './location-search.component.html',
  styleUrl: './location-search.component.scss'
})
export class LocationSearchComponent {
  @Input() isOpen: boolean = false;
  @Input() selectedLocation: string = '';
  @Output() locationSelect = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  searchTerm: string = '';
  cities: string[] = [];

  /*suggestions: LocationSuggestion[] = [
    {
      id: '1',
      name: 'Cochabamba',
      country: 'Cochabamba',
      description: 'Popular entre los viajeros de tu zona',
      icon: 'city'
    },
    {
      id: '2',
      name: 'La Paz',
      country: 'La Paz',
      description: 'Por lugares emblemáticos como este: Plaza Murillo',
      icon: 'landmark'
    },
    {
      id: '3',
      name: 'Madrid',
      country: 'España',
      description: 'Por su diversión nocturna',
      icon: 'city'
    },
    {
      id: '4',
      name: 'Asunción',
      country: 'Paraguay',
      description: 'Para un viaje al extranjero',
      icon: 'city'
    },
    {
      id: '5',
      name: 'Cancún',
      country: 'México',
      description: 'Una destinación de playa popular',
      icon: 'beach'
    },
    {
      id: '6',
      name: 'Bogotá',
      country: 'Colombia',
      description: 'Por lugares emblemáticos como este: Plaza de Bolívar',
      icon: 'landmark'
    },
    {
      id: '7',
      name: 'París',
      country: 'Francia',
      description: 'Por su impresionante arquitectura',
      icon: 'landmark'
    },
    {
      id: '8',
      name: 'Lima',
      country: 'Perú',
      description: 'Por su gastronomía',
      icon: 'city'
    }
  ];*/

  constructor(private repo: AccommodationsRepository) {}

  ngOnInit(): void {
    this.cities = this.repo.getCities();
    console.log('[LocationSearch] Ciudades disponibles desde repo:', this.cities);
  }

  get filteredCities(): string[] {
    if (!this.searchTerm) {
      return this.cities;
    }
    const term = this.searchTerm.toLowerCase();
    return this.cities.filter(c => c.toLowerCase().includes(term));
  }

  /*get filteredSuggestions(): LocationSuggestion[] {
    if (!this.searchTerm) {
      return this.suggestions;
    }
    const term = this.searchTerm.toLowerCase();
    return this.suggestions.filter(s =>
      s.name.toLowerCase().includes(term) ||
      s.country.toLowerCase().includes(term)
    );
  }*/

  onSelectLocation(city: string): void {
    this.locationSelect.emit(city);
    this.onClose();
  }

  onClose(): void {
    this.close.emit();
  }
}