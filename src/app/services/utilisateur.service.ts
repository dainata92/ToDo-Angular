import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Utilisateur {
  id: number;
  role:string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiUrl = environment.apiUrl + '/api/sign-up';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  addUtilisateur(item: Utilisateur) {
    const headers = this.getAuthHeaders();
    return this.http.post<Utilisateur>(this.apiUrl, item, { headers });
  }

  getUtilisateurs() {
    const headers = this.getAuthHeaders();
    return this.http.get<Utilisateur[]>(this.apiUrl, { headers });
  }

  getUtilisateur(id: number) {
    const headers = this.getAuthHeaders();
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`, { headers });
  }

  updateUtilisateur(item: Utilisateur) {
    const headers = this.getAuthHeaders();
    return this.http.put<Utilisateur>(`${this.apiUrl}/${item.id}`, item, { headers });
  }

  deleteUtilisateur(id: number) {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  register(user: Utilisateur) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Pour l'inscription, souvent pas besoin de token donc pas d'Authorization
    return this.http.post(this.apiUrl, user, { headers });
  }
}
