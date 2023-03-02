import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loadingSubject$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  loader$: Observable<boolean> = this.loadingSubject$.pipe(delay(100));
  start() {
    this.loadingSubject$.next(true);
  }
  finish() {
    this.loadingSubject$.next(false);
  }
}
