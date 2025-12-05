import { Component, Input } from '@angular/core';

export type IconName =
  // Property Types
  | 'house'
  | 'apartment'
  | 'villa'
  | 'cabin'
  // Space Types
  | 'entire'
  | 'private'
  | 'shared'
  // Amenities
  | 'wifi'
  | 'kitchen'
  | 'air-conditioning'
  | 'heating'
  | 'tv'
  | 'pool'
  | 'parking'
  | 'washer'
  | 'dryer'
  | 'workspace';

@Component({
  selector: 'app-icon',
  standalone: false,
  template: `
    <svg [attr.width]="size" [attr.height]="size" [attr.viewBox]="viewBox" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- House Icon -->
      <g *ngIf="name === 'house'">
        <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <!-- Apartment Icon -->
      <g *ngIf="name === 'apartment'">
        <rect x="4" y="2" width="16" height="20" rx="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 6H10M14 6H16M8 10H10M14 10H16M8 14H10M14 14H16M8 18H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </g>

      <!-- Villa Icon -->
      <g *ngIf="name === 'villa'">
        <path d="M2 12L12 3L22 12M4 10V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V10"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 21V15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15V21"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="9" cy="8" r="1.5" fill="currentColor"/>
        <circle cx="15" cy="8" r="1.5" fill="currentColor"/>
      </g>

      <!-- Cabin Icon -->
      <g *ngIf="name === 'cabin'">
        <path d="M3 21L5 9L12 3L19 9L21 21H3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 21V15H15V21M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <!-- Entire Place Icon -->
      <g *ngIf="name === 'entire'">
        <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
        <path d="M3 12L12 4L21 12M7 21V14H17V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="10" cy="17" r="1" fill="currentColor"/>
      </g>

      <!-- Private Room Icon -->
      <g *ngIf="name === 'private'">
        <rect x="5" y="4" width="14" height="17" rx="1" stroke="currentColor" stroke-width="2"/>
        <path d="M9 8H15M9 12H13M9 16H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="16" cy="12" r="1.5" fill="currentColor"/>
      </g>

      <!-- Shared Room Icon -->
      <g *ngIf="name === 'shared'">
        <path d="M3 12V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V12M3 12L12 4L21 12M3 12H21"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 16H10M14 16H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="8.5" cy="18" r="1" fill="currentColor"/>
        <circle cx="15.5" cy="18" r="1" fill="currentColor"/>
      </g>

      <!-- WiFi Icon -->
      <g *ngIf="name === 'wifi'">
        <path d="M12 20H12.01M8.5 16.5C9.88071 15.1193 11.8203 14.5 13.5 14.5C15.1797 14.5 17.1193 15.1193 18.5 16.5M4.93 12.93C7.29417 10.5658 10.5442 9.5 13.5 9.5C16.4558 9.5 19.7058 10.5658 22.07 12.93M1.36 9.36C4.60042 6.11958 8.85042 4.5 13.5 4.5C18.1496 4.5 22.3996 6.11958 25.64 9.36"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <!-- Kitchen Icon -->
      <g *ngIf="name === 'kitchen'">
        <path d="M9 3V5M15 3V5M6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7C4 5.89543 4.89543 5 6 5ZM12 11C13.6569 11 15 9.65685 15 8H9C9 9.65685 10.3431 11 12 11ZM12 11V17"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <!-- Air Conditioning Icon -->
      <g *ngIf="name === 'air-conditioning'">
        <path d="M12 3V7M12 7L8 11M12 7L16 11M12 17V21M8 13L12 17M12 17L16 13M3 12H7M17 12H21"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="2"/>
      </g>

      <!-- Heating Icon -->
      <g *ngIf="name === 'heating'">
        <path d="M12 2C12 2 8 5 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5 12 2 12 2Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 12V22M8 14H16M9 18H15"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <!-- TV Icon -->
      <g *ngIf="name === 'tv'">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
        <path d="M8 21H16M12 17V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <!-- Pool Icon -->
      <g *ngIf="name === 'pool'">
        <path d="M2 15C3.5 15 4.5 16 6 16C7.5 16 8.5 15 10 15C11.5 15 12.5 16 14 16C15.5 16 16.5 15 18 15C19.5 15 20.5 16 22 16M2 20C3.5 20 4.5 21 6 21C7.5 21 8.5 20 10 20C11.5 20 12.5 21 14 21C15.5 21 16.5 20 18 20C19.5 20 20.5 21 22 21"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="17" cy="6" r="3" stroke="currentColor" stroke-width="2"/>
        <path d="M7 5L11 11L8 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <!-- Parking Icon -->
      <g *ngIf="name === 'parking'">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
        <path d="M9 8H13C14.6569 8 16 9.34315 16 11C16 12.6569 14.6569 14 13 14H9V8ZM9 14V17"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <!-- Washer Icon -->
      <g *ngIf="name === 'washer'">
        <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="14" r="5" stroke="currentColor" stroke-width="2"/>
        <circle cx="8" cy="5" r="1" fill="currentColor"/>
        <circle cx="11" cy="5" r="1" fill="currentColor"/>
        <path d="M10 14L14 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </g>

      <!-- Dryer Icon -->
      <g *ngIf="name === 'dryer'">
        <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="14" r="5" stroke="currentColor" stroke-width="2"/>
        <circle cx="8" cy="5" r="1" fill="currentColor"/>
        <circle cx="11" cy="5" r="1" fill="currentColor"/>
        <circle cx="10" cy="12" r="1" fill="currentColor"/>
        <circle cx="14" cy="16" r="1" fill="currentColor"/>
      </g>

      <!-- Workspace Icon -->
      <g *ngIf="name === 'workspace'">
        <path d="M9 3H15M10 3V5M14 3V5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <rect x="5" y="5" width="14" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
        <path d="M9 9H15M9 13H15M9 17H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </g>
    </svg>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    svg {
      color: inherit;
    }
  `]
})
export class IconComponent {
  @Input() name!: IconName;
  @Input() size: number = 24;
  @Input() viewBox: string = '0 0 24 24';
}

