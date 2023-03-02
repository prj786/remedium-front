import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {SidebarModule} from "primeng/sidebar";
import { HeaderComponent } from './components/header/header.component';
import {TranslateModule} from "@ngx-translate/core";
import {ToggleButtonModule} from "primeng/togglebutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {MenuModule} from "primeng/menu";
import {ListboxModule} from "primeng/listbox";
import {MenuItemComponent} from "./components/sidebar/menu-item/menu-item.component";
import { NotfoundComponent } from './page/notfound/notfound.component';
import { AuthComponent } from './page/auth/auth.component';
import {CoreRoutingModule} from "./core-routing.module";
import {InputTextModule} from "primeng/inputtext";



@NgModule({
  declarations: [
    SidebarComponent,
    MenuItemComponent,
    HeaderComponent,
    NotfoundComponent,
    AuthComponent
  ],
  exports: [
    SidebarComponent,
    MenuItemComponent,
    HeaderComponent
  ],
  imports: [
    CoreRoutingModule,
    CommonModule,
    SidebarModule,
    SharedModule,
    TranslateModule,
    ToggleButtonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    SharedModule,
    MenuModule,
    ListboxModule,
    SharedModule,
    InputTextModule,
    ReactiveFormsModule,
  ]
})
export class CoreModule { }
