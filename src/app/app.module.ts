import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { StoreModule } from '@ngrx/store';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {AuthInterceptor} from "./core/interceptor/auth-interceptor";
import {Interceptor} from "./core/interceptor/interceptor";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
        maxAge: 25,
        autoPause: true
    }),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    MessagesModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
