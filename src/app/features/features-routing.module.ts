import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./products/page/products/products.component";
import {UsersComponent} from "./users/page/users/users.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class FeaturesRoutingModule { }
