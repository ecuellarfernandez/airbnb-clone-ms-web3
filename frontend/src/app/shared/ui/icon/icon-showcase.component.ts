import { Component } from '@angular/core';
import { IconName } from '@app/shared/ui/icon/icon.component';

@Component({
  selector: 'app-icon-showcase',
  standalone: false,
  template: `
    <div class="showcase-container">
      <h1 class="showcase-title">Sistema de Iconos</h1>
      <p class="showcase-subtitle">
        Colección de iconos SVG disponibles en la aplicación
      </p>

      <section class="showcase-section">
        <h2 class="section-title">Property Types</h2>
        <div class="icon-grid">
          <div *ngFor="let icon of propertyTypeIcons" class="icon-card">
            <div class="icon-display">
              <app-icon [name]="icon.name" [size]="48"></app-icon>
            </div>
            <div class="icon-info">
              <div class="icon-name">{{ icon.name }}</div>
              <div class="icon-description">{{ icon.description }}</div>
            </div>
            <div class="icon-code">
              &lt;app-icon name="{{ icon.name }}" /&gt;
            </div>
          </div>
        </div>
      </section>

      <section class="showcase-section">
        <h2 class="section-title">Space Types</h2>
        <div class="icon-grid">
          <div *ngFor="let icon of spaceTypeIcons" class="icon-card">
            <div class="icon-display">
              <app-icon [name]="icon.name" [size]="48"></app-icon>
            </div>
            <div class="icon-info">
              <div class="icon-name">{{ icon.name }}</div>
              <div class="icon-description">{{ icon.description }}</div>
            </div>
            <div class="icon-code">
              &lt;app-icon name="{{ icon.name }}" /&gt;
            </div>
          </div>
        </div>
      </section>

      <section class="showcase-section">
        <h2 class="section-title">Amenidades</h2>
        <div class="icon-grid">
          <div *ngFor="let icon of amenityIcons" class="icon-card">
            <div class="icon-display">
              <app-icon [name]="icon.name" [size]="48"></app-icon>
            </div>
            <div class="icon-info">
              <div class="icon-name">{{ icon.name }}</div>
              <div class="icon-description">{{ icon.description }}</div>
            </div>
            <div class="icon-code">
              &lt;app-icon name="{{ icon.name }}" /&gt;
            </div>
          </div>
        </div>
      </section>

      <section class="showcase-section">
        <h2 class="section-title">Tamaños</h2>
        <div class="size-demo">
          <div *ngFor="let size of sizes" class="size-item">
            <app-icon name="house" [size]="size"></app-icon>
            <span>{{ size }}px</span>
          </div>
        </div>
      </section>

      <section class="showcase-section">
        <h2 class="section-title">Colores</h2>
        <div class="color-demo">
          <div *ngFor="let color of colors" class="color-item" [style.color]="color.value">
            <app-icon name="wifi" [size]="32"></app-icon>
            <span>{{ color.name }}</span>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .showcase-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .showcase-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
    }

    .showcase-subtitle {
      font-size: 1.125rem;
      color: #6b7280;
      margin-bottom: 3rem;
    }

    .showcase-section {
      margin-bottom: 4rem;
    }

    .section-title {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e5e7eb;
    }

    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .icon-card {
      padding: 1.5rem;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      transition: all 0.2s ease;
      background: white;
    }

    .icon-card:hover {
      border-color: #ff385c;
      box-shadow: 0 4px 12px rgba(255, 56, 92, 0.1);
      transform: translateY(-2px);
    }

    .icon-display {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: #f9fafb;
      border-radius: 8px;
      margin-bottom: 1rem;
      color: #ff385c;
    }

    .icon-info {
      margin-bottom: 1rem;
    }

    .icon-name {
      font-size: 1rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.25rem;
    }

    .icon-description {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .icon-code {
      font-family: 'Courier New', monospace;
      font-size: 0.75rem;
      padding: 0.5rem;
      background: #f3f4f6;
      border-radius: 4px;
      color: #4b5563;
      overflow-x: auto;
    }

    .size-demo {
      display: flex;
      align-items: flex-end;
      gap: 2rem;
      padding: 2rem;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
    }

    .size-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: #ff385c;
    }

    .size-item span {
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 500;
    }

    .color-demo {
      display: flex;
      gap: 2rem;
      padding: 2rem;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      flex-wrap: wrap;
    }

    .color-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .color-item span {
      font-size: 0.875rem;
      font-weight: 500;
    }
  `]
})
export class IconShowcaseComponent {
  propertyTypeIcons: Array<{ name: IconName; description: string }> = [
    { name: 'house', description: 'House - Standalone house' },
    { name: 'apartment', description: 'Apartment - In a building' },
    { name: 'villa', description: 'Villa - Luxurious villa' },
    { name: 'cabin', description: 'Cabin - Cozy cabin' }
  ];

  spaceTypeIcons: Array<{ name: IconName; description: string }> = [
    { name: 'entire', description: 'Entire place - Whole place' },
    { name: 'private', description: 'Private room - Own room' },
    { name: 'shared', description: 'Shared room - Shared space' }
  ];

  amenityIcons: Array<{ name: IconName; description: string }> = [
    { name: 'wifi', description: 'WiFi' },
    { name: 'kitchen', description: 'Cocina' },
    { name: 'air-conditioning', description: 'Aire acondicionado' },
    { name: 'heating', description: 'Calefacción' },
    { name: 'tv', description: 'Televisión' },
    { name: 'pool', description: 'Piscina' },
    { name: 'parking', description: 'Estacionamiento' },
    { name: 'washer', description: 'Lavadora' },
    { name: 'dryer', description: 'Secadora' },
    { name: 'workspace', description: 'Workspace dedicado' }
  ];

  sizes = [16, 24, 32, 48, 64];

  colors = [
    { name: 'Primary', value: '#ff385c' },
    { name: 'Gray', value: '#6b7280' },
    { name: 'Success', value: '#10b981' },
    { name: 'Warning', value: '#f59e0b' },
    { name: 'Error', value: '#ef4444' }
  ];
}

