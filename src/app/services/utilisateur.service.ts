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

  private apiUrl = environment.apiUrl + '/api/dashboard';


  constructor(private http: HttpClient) { }

  addUtilisateur(item : Utilisateur){
          console.log("Objet envoyé :", item);
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.post<Utilisateur>(this.apiUrl, item, { headers });
      }
  getUtilisateurs(){
          return this.http.get<Utilisateur[]>(this.apiUrl);
      }
  getUtilisateur(id : number){
          return this.http.get<Utilisateur>(this.apiUrl + '/' + id);
      }
  updateUtilisateur(item : Utilisateur){
          return this.http.put<Utilisateur>(this.apiUrl + '/' + item.id, item );
      }
      
  deleteUtilisateur(id : number){
          return this.http.delete(this.apiUrl + '/' + id);
      }
  private baseUrl = '/api/dashboard/sign-up';

  register(user: any) {
  return this.http.post(this.apiUrl, user, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}
}
