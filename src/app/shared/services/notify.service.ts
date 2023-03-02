import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private messageService: MessageService, private translateService: TranslateService) { }

  sendSuccess(msg: string, header: string) {
    this.messageService.add(
      {
        severity: 'success',
        summary: this.translateService.instant('message.' + header),
        detail: this.translateService.instant('message.' + msg)
      })
  }

  sendError(msg: string, errorCode: string | number, translate = true) {
    console.log(msg);
    this.messageService.add(
      {
        severity: 'error',
        summary: errorCode.toString(),
        detail: translate ? this.translateService.instant('message.' + msg) : msg
      })
  }

}
