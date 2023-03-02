import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/page/products/products.component';
import { UsersComponent } from './users/page/users/users.component';
import {FeaturesRoutingModule} from "./features-routing.module";
import {SharedModule} from "../shared/shared.module";
import { ProductModalComponent } from './products/components/product-modal/product-modal.component';
import {ButtonModule} from "primeng/button";
import {TranslateModule} from "@ngx-translate/core";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ReactiveFormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {InputTextModule} from "primeng/inputtext";
import { UserModalComponent } from './users/components/user-modal/user-modal.component';
import { FilterModalComponent } from './users/components/filter-modal/filter-modal.component';
import {CalendarModule} from "primeng/calendar";
import {InputMaskModule} from "primeng/inputmask";
import {StoreModule} from "@ngrx/store";
import {userReducers} from "./users/store/user-reducer";
import {productReducers} from "./products/store/product-reducer";
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "./users/store/user-effects";
import {ProductEffects} from "./products/store/product-effects";
import { SellModalComponent } from './products/components/sell-modal/sell-modal.component';

@NgModule({
  declarations: [
    ProductsComponent,
    UsersComponent,
    ProductModalComponent,
    UserModalComponent,
    FilterModalComponent,
    SellModalComponent
  ],
  imports: [
    StoreModule.forFeature('users', userReducers),
    StoreModule.forFeature('products', productReducers),
    EffectsModule.forFeature([UserEffects, ProductEffects]),
    FeaturesRoutingModule,
    CommonModule,
    SharedModule,
    ButtonModule,
    TranslateModule,
    SharedModule,
    SharedModule,
    DialogModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    PaginatorModule,
    InputTextModule,
    CalendarModule,
    InputMaskModule
  ]
})
export class FeaturesModule { }
