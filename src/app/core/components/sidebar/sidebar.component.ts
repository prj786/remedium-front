import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'rm-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit{
  @Input()
  state: boolean = false;

  @Output()
  stateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  menuItems: {name: string, route: string, icon: string}[] = [];

  currentRoute: string = '';

  onStateChange() {
    this.stateChange.emit(this.state);
  }

  ngOnInit() {
    this.menuItems = [
      {name: 'users', route: '/users', icon: 'pi pi-user'},
      {name: 'products', route: '/products', icon: 'pi pi-shopping-bag'},
    ]
  }

  navigate(code: string): void {
    this.currentRoute = code;
  }
}
