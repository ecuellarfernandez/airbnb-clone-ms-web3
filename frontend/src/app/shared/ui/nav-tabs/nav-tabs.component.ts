import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface NavTab {
  id: string;
  label: string;
  icon: 'home' | 'experience' | 'service' | 'calendar';
  isNew?: boolean;
  path?: string;
}

@Component({
  selector: 'app-nav-tabs',
  standalone: false,
  templateUrl: './nav-tabs.component.html',
  styleUrl: './nav-tabs.component.scss'
})
export class NavTabsComponent {
  @Input() tabs: NavTab[] = [];
  @Input() activeTabId: string = '';
  @Output() tabChange = new EventEmitter<string>();

  onTabClick(tabId: string): void {
    this.tabChange.emit(tabId);
  }
}
