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

  constructor(private http: HttpClient) {}

  login(payload : any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, payload);
  }

  isAdmin = false;
}