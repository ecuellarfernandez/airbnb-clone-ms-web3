import { Listing } from '@domain/models/listing.model';

export const LISTINGS_MOCK: Listing[] = [
  {
    id: 1,
    title: 'Modern apt in Equipetrol',
    city: 'Santa Cruz',
    price: 100,
    capacity: 2,
    description: 'Near restaurants and nightlife. Pool and gym.',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 4,
    title: 'Rustic cabin',
    city: 'Tarija',
    price: 160,
    capacity: 4,
    description: 'Escape the noise, amazing views.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 5,
    title: 'Minimalist loft',
    city: 'Santa Cruz',
    price: 110,
    capacity: 3,
    description: 'Open space with lots of light.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521783593447-5702fcdac70a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 6,
    title: 'Budget room',
    city: 'Sucre',
    price: 60,
    capacity: 1,
    description: 'Affordable for backpackers.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 7,
    title: 'Penthouse with view',
    city: 'La Paz',
    price: 300,
    capacity: 4,
    description: 'Panoramic terrace and jacuzzi.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521783593447-5702fcdac70a?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 9,
    title: 'Practical studio',
    city: 'Cochabamba',
    price: 85,
    capacity: 2,
    description: 'Ideal for work trips.',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521783593447-5702fcdac70a?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 11,
    title: 'Eco lodge in the valley',
    city: 'Cochabamba',
    price: 200,
    capacity: 6,
    description: 'Surrounded by nature and hiking trails.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 12,
    title: 'Downtown apartment',
    city: 'Santa Cruz',
    price: 130,
    capacity: 3,
    description: 'Next to the main square and coffee shops.',
    image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1521783593447-5702fcdac70a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 13,
    title: 'Mountain view cabin',
    city: 'La Paz',
    price: 250,
    capacity: 5,
    description: 'Private cabin with hot tub and fireplace.',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 14,
    title: 'Artisan hostel',
    city: 'Sucre',
    price: 70,
    capacity: 2,
    description: 'Local design, shared kitchen and terrace.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521783593447-5702fcdac70a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 15,
    title: 'Luxury villa with pool',
    city: 'Santa Cruz',
    price: 450,
    capacity: 8,
    description: 'Private pool, BBQ area, and large garden.',
    image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 16,
    title: 'Tiny house in vineyard',
    city: 'Tarija',
    price: 150,
    capacity: 2,
    description: 'Romantic getaway surrounded by vineyards.',
    image: 'https://images.unsplash.com/photo-1534996858221-380b92700493?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521783593447-5702fcdac70a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 17,
    title: 'Colonial suite',
    city: 'Sucre',
    price: 95,
    capacity: 3,
    description: 'Restored colonial suite with balcony view.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 18,
    title: 'Modern studio near stadium',
    city: 'Cochabamba',
    price: 105,
    capacity: 2,
    description: 'Perfect for business trips, fast WiFi included.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 19,
    title: 'Hostal Andes',
    city: 'La Paz',
    price: 55,
    capacity: 1,
    description: 'Simple and central, ideal for short stays.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 20,
    title: 'Boutique hotel room',
    city: 'Tarija',
    price: 170,
    capacity: 3,
    description: 'Exclusive decor and excellent service.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop'
    ]
  },

  /* --- Nuevos: SANTA CRUZ (total 7) --- */
  {
    id: 21,
    title: 'Executive suite in Las Palmas',
    city: 'Santa Cruz',
    price: 140,
    capacity: 2,
    description: 'Zona Las Palmas: ideal para trabajo, cerca de bancos y cafés.',
    image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521783593447-5702fcdac70a?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 22,
    title: 'Urubó house with pool',
    city: 'Santa Cruz',
    price: 260,
    capacity: 6,
    description: 'Urbanización tranquila en Urubó, con piscina y parrillero.',
    image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 23,
    title: 'Boho loft by Plaza 24 de Septiembre',
    city: 'Santa Cruz',
    price: 120,
    capacity: 2,
    description: 'En el Casco Viejo, a pasos de la plaza principal.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop'
    ]
  },

  /* --- Nuevos: TARIJA (total 7) --- */
  {
    id: 24,
    title: 'Suite in Valle de la Concepción',
    city: 'Tarija',
    price: 180,
    capacity: 2,
    description: 'Ruta del vino: catas y viñedos cercanos.',
    image: 'https://images.unsplash.com/photo-1534996858221-380b92700493?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 25,
    title: 'Cabin by Guadalquivir River',
    city: 'Tarija',
    price: 140,
    capacity: 4,
    description: 'Deck con vista al río y fogatero exterior.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 26,
    title: 'Adobe house in San Lorenzo',
    city: 'Tarija',
    price: 130,
    capacity: 3,
    description: 'Arquitectura colonial con patio y parrilla.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 27,
    title: 'Boutique room near main square',
    city: 'Tarija',
    price: 90,
    capacity: 2,
    description: 'Camina a cafés y restaurantes del centro.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop'
  },

  /* --- Nuevos: SUCRE (total 7) --- */
  {
    id: 28,
    title: 'Apartment in Historic Center',
    city: 'Sucre',
    price: 110,
    capacity: 3,
    description: 'Balcón con vista a calles coloniales; WiFi rápido.',
    image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 29,
    title: 'House with patio in La Recoleta',
    city: 'Sucre',
    price: 150,
    capacity: 4,
    description: 'Cerca del mirador y museo de La Recoleta.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 30,
    title: 'Studio by Parque Bolívar',
    city: 'Sucre',
    price: 85,
    capacity: 2,
    description: 'Zona tranquila para pasear y hacer picnic.',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 31,
    title: 'Art-hostel in San Sebastián',
    city: 'Sucre',
    price: 70,
    capacity: 2,
    description: 'Espacio bohemio con cocina compartida.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop'
  },

  /* --- Nuevos: LA PAZ (total 7) --- */
  {
    id: 32,
    title: 'Apartment in Sopocachi',
    city: 'La Paz',
    price: 140,
    capacity: 2,
    description: 'Cerca del Montículo, cafés y vida cultural.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 33,
    title: 'Suite in Calacoto / San Miguel',
    city: 'La Paz',
    price: 190,
    capacity: 2,
    description: 'Zona Sur: tiendas y restaurantes a pocos pasos.',
    image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 34,
    title: 'Cabin near Valle de la Luna',
    city: 'La Paz',
    price: 170,
    capacity: 4,
    description: 'Mallasa: terraza con vistas a formaciones únicas.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 35,
    title: 'Backpackers on Sagárnaga Street',
    city: 'La Paz',
    price: 60,
    capacity: 1,
    description: 'Cerca del Mercado de las Brujas y museos.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop'
  },

  /* --- Nuevos: COCHABAMBA (total 7) --- */
  {
    id: 36,
    title: 'Recoleta boulevard apartment',
    city: 'Cochabamba',
    price: 100,
    capacity: 2,
    description: 'En el boulevard La Recoleta: restaurantes y pubs.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 37,
    title: 'Cala Cala garden house',
    city: 'Cochabamba',
    price: 180,
    capacity: 5,
    description: 'Zona residencial, cerca de Av. América.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 38,
    title: 'Modern studio in Queru Queru',
    city: 'Cochabamba',
    price: 105,
    capacity: 2,
    description: 'Edificio nuevo, cafés y comercios cercanos.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 39,
    title: 'Tiquipaya eco-cabin',
    city: 'Cochabamba',
    price: 150,
    capacity: 4,
    description: 'Clima templado, áreas verdes y churrasquera.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 40,
    title: 'Modern apt in Equipetrol',
    city: 'Santa Cruz',
    price: 100,
    capacity: 2,
    description: 'Near restaurants and nightlife. Pool and gym.',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 50,
    title: 'Modern apt in Equipetrol',
    city: 'Santa Cruz',
    price: 100,
    capacity: 2,
    description: 'Near restaurants and nightlife. Pool and gym.',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop'
    ]
  },
];
