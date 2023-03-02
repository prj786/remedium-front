import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LoaderService} from "./shared/services/loader.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  toggle: boolean = false;
  loading$: Observable<boolean> = new Observable<boolean>();

  constructor(private translate: TranslateService, public loader: LoaderService) {

    const lang = localStorage.getItem('lang');

    if (lang) {
      translate.setDefaultLang(lang);
      translate.use(lang);
    } else {
      localStorage.setItem('lang', 'en');
      translate.setDefaultLang('en');
      translate.use('en');
    }
  }

  ngOnInit() {
    this.loading$ = this.loader.loader$
  }

}
