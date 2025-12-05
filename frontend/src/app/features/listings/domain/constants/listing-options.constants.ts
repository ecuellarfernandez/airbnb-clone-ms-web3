import { IconName } from '@app/shared/ui/icon/icon.component';

export interface CategoryOption {
  id: string;
  name: string;
  icon?: IconName;
  description?: string;
  categoryType: 'Property Type' | 'Space Type';
}

export interface AmenityOption {
  id: string;
  name: string;
  icon?: IconName;
  category?: string;
}

export const LISTING_CATEGORIES: CategoryOption[] = [
  // Property Types
  {
    id: '650e8400-e29b-41d4-a716-446655440001',
    name: 'House',
    icon: 'house',
    description: 'A standalone house',
    categoryType: 'Property Type'
  },
  {
    id: '650e8400-e29b-41d4-a716-446655440002',
    name: 'Apartment',
    icon: 'apartment',
    description: 'An apartment in a building',
    categoryType: 'Property Type'
  },
  {
    id: '650e8400-e29b-41d4-a716-446655440003',
    name: 'Villa',
    icon: 'villa',
    description: 'A luxurious villa',
    categoryType: 'Property Type'
  },
  {
    id: '650e8400-e29b-41d4-a716-446655440004',
    name: 'Cabin',
    icon: 'cabin',
    description: 'A cozy cabin',
    categoryType: 'Property Type'
  },
  // Space Types
  {
    id: '650e8400-e29b-41d4-a716-446655440005',
    name: 'Entire place',
    icon: 'entire',
    description: 'Guests have the whole place to themselves',
    categoryType: 'Space Type'
  },
  {
    id: '650e8400-e29b-41d4-a716-446655440006',
    name: 'Private room',
    icon: 'private',
    description: 'Guests have their own private room',
    categoryType: 'Space Type'
  },
  {
    id: '650e8400-e29b-41d4-a716-446655440007',
    name: 'Shared room',
    icon: 'shared',
    description: 'Guests sleep in a shared space',
    categoryType: 'Space Type'
  }
];

export const LISTING_AMENITIES: AmenityOption[] = [
  {
    id: '066c1098-2cbc-497c-a5ec-e9a62823d5e0',
    name: 'WiFi',
    icon: 'wifi',
    category: 'Esenciales'
  },
  {
    id: '177d2109-3dcd-508d-b6fd-f9b73934e1f1',
    name: 'Cocina',
    icon: 'kitchen',
    category: 'Esenciales'
  },
  {
    id: '288e3210-4ede-619e-c7ge-0ac84a45f2g2',
    name: 'Aire acondicionado',
    icon: 'air-conditioning',
    category: 'Climatización'
  },
  {
    id: '399f4321-5fef-720f-d8hf-1bd95b56g3h3',
    name: 'Calefacción',
    icon: 'heating',
    category: 'Climatización'
  },
  {
    id: '4a0g5432-6gfg-831g-e9ig-2ce06c67h4i4',
    name: 'TV',
    icon: 'tv',
    category: 'Entretenimiento'
  },
  {
    id: '5b1h6543-7hgh-942h-f0jh-3df17d78i5j5',
    name: 'Piscina',
    icon: 'pool',
    category: 'Exterior'
  },
  {
    id: '6c2i7654-8ihi-053i-g1ki-4eg28e89j6k6',
    name: 'Estacionamiento gratuito',
    icon: 'parking',
    category: 'Exterior'
  },
  {
    id: '7d3j8765-9iji-164j-h2lj-5fh39f90k7l7',
    name: 'Lavadora',
    icon: 'washer',
    category: 'Servicios'
  },
  {
    id: '8e4k9876-0jkj-275k-i3mk-6gi40ga1l8m8',
    name: 'Secadora',
    icon: 'dryer',
    category: 'Servicios'
  },
  {
    id: '9f5l0987-1klk-386l-j4nl-7hj51hb2m9n9',
    name: 'Workspace dedicado',
    icon: 'workspace',
    category: 'Servicios'
  }
];

export function getCategoryById(id: string): CategoryOption | undefined {
  return LISTING_CATEGORIES.find(cat => cat.id === id);
}

export function getAmenityById(id: string): AmenityOption | undefined {
  return LISTING_AMENITIES.find(amenity => amenity.id === id);
}

export function getAmenitiesByCategory(category: string): AmenityOption[] {
  return LISTING_AMENITIES.filter(amenity => amenity.category === category);
}

export function getAmenityCategories(): string[] {
  const categories = LISTING_AMENITIES.map(a => a.category).filter(Boolean) as string[];
  return [...new Set(categories)];
}

export function getPropertyTypeCategories(): CategoryOption[] {
  return LISTING_CATEGORIES.filter(cat => cat.categoryType === 'Property Type');
}

export function getSpaceTypeCategories(): CategoryOption[] {
  return LISTING_CATEGORIES.filter(cat => cat.categoryType === 'Space Type');
}

