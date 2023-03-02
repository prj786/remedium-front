import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "../features/products/page/products/products.component";
import {UsersComponent} from "../features/users/page/users/users.component";
import {AuthComponent} from "./page/auth/auth.component";
import {NotfoundComponent} from "./page/notfound/notfound.component";

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class CoreRoutingModule { }
