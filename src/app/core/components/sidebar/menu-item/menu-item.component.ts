import {Component, Input} from '@angular/core';

@Component({
  selector: 'rm-menu-item',
  templateUrl: './menu-item.component.html',
})
export class MenuItemComponent {
  @Input()
  icon: string = '';

  @Input()
  label: string = '';

  @Input()
  route: string = '';
}
