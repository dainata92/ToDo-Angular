import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

export interface DecodedToken {
  sub: string;
  userId?: number;
  role: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth/login';

  public isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(payload: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}`, payload);
  }


/*
  getCurrentUserId(): number | null {
    const token = sessionStorage.getItem('authToken');
    if (!token) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.userId ?? null;
    } catch (e) {
      return null;
    }
  }
*/


}