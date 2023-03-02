import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import {TableModule} from "primeng/table";
import {TranslateModule} from "@ngx-translate/core";
import {PaginatorModule} from "primeng/paginator";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService, MessageService} from "primeng/api";
import {NotifyService} from "./services/notify.service";



@NgModule({
  declarations: [
    TableComponent,
  ],
  exports: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    TranslateModule,
    PaginatorModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    ConfirmPopupModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
    NotifyService
  ]
})
export class SharedModule { }
