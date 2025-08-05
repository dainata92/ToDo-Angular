import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Projet {
  id: number;
  nomProjet: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private apiUrl = 'http://localhost:8080/api/projets'; 

  constructor(private http: HttpClient) { }

  addProjet(item : Projet){
          console.log("Objet envoyé :", item);
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.post<Projet>(this.apiUrl, item, { headers });
      }
  getProjets(){
          return this.http.get<Projet[]>(this.apiUrl);
      }
  getProjet(id : number){
          return this.http.get<Projet>(this.apiUrl + '/' + id);
      }
  updateProjet(item : Projet){
          return this.http.put<Projet>(this.apiUrl + '/' + item.id, item );
      }
      
  deleteProjet(id : number){
          return this.http.delete(this.apiUrl + '/' + id);
      }
}
