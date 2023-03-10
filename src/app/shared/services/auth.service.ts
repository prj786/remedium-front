import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getToken(): string | null {
    return localStorage.getItem('token');
  }
}
