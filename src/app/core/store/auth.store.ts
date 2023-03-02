import {Injectable} from "@angular/core";
import {UserModel} from "../models/user.model";
import {BehaviorSubject, map, Observable, shareReplay, Subject, tap} from "rxjs";
import {API} from "../util";
import {HttpClient} from "@angular/common/http";

const AUTH_INFO = 'auth_info';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  public userSubject$: Subject<any> = new BehaviorSubject<UserModel | null>(null);
  user$: Observable<UserModel> = this.userSubject$.asObservable();
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));

    const user = localStorage.getItem(AUTH_INFO);

    if (user) {
      this.userSubject$.next(JSON.parse(user).user);
    }

  }

  auth(body: {username: string, password: string}): Observable<{ token: string, user: UserModel }> {
    return this.http.post<{ token: string, user: UserModel }>(`${API}users/login`, body).pipe(
      tap(user => {
        this.userSubject$.next(user.user);
        localStorage.setItem(AUTH_INFO, JSON.stringify(user));
      }),
      shareReplay()
    )
  }

  logOut() {
    this.userSubject$.next(null);
    localStorage.removeItem(AUTH_INFO);
  }


}
