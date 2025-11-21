import {Component, Input, input} from '@angular/core';

@Component({
  selector: 'svg[app-icon-logo]',
  templateUrl: './icon-logo.component.html',
  standalone: false,
  host: {
    '[attr.viewBox]': 'viewBox()',
  }
})
export class IconLogoComponent {
  readonly viewBox = input<string>('0 0 800 800');

}
