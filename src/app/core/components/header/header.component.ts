import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {TranslateService} from "@ngx-translate/core";
import {AuthStore} from "../../store/auth.store";
import {Observable} from "rxjs";

@Component({
  selector: 'rm-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  user$!: Observable<UserModel>;
  @Output()
  menuStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  lang: 'en' | 'ge' = 'en';

  authorized$!: Observable<boolean>;

  constructor(private translateService: TranslateService, private userStore: AuthStore) {
    this.user$ = userStore.user$;
    this.authorized$ = userStore.isLoggedIn$;

    const lang: 'en' | 'ge' = localStorage.getItem('lang') as 'en' | 'ge';

    if (lang) this.lang = lang;

  }

  changeLang(): void {
    this.lang = this.lang === 'ge' ? 'en' : 'ge'
    this.translateService.use(this.lang);
    localStorage.setItem('lang', this.lang);
  }

  signOut(): void {
    this.userStore.logOut();
  }
}
