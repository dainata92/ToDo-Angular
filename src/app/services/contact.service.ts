import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contact {
  id: number;
  prenom: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:8080/api/contact'; // adapte selon ton back

  constructor(private http: HttpClient) { }

  //getAllContacts(): Observable<Contact[]> {
    //return this.http.get<Contact[]>(this.apiUrl);
  //}

  addContact(item : Contact){
          console.log("Objet envoyé :", item);
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.post<Contact>(this.apiUrl, item, { headers });
      }
      //Read
      //Fetch toute la liste
      getContacts(){
      //HTTP GET sans 2eme parametre car il n y a pas de body
          return this.http.get<Contact[]>(this.apiUrl);
      }
      //Read
      //Fetch un item de todo par son id
      getContact(id : number){
          return this.http.get<Contact>(this.apiUrl + '/' + id);
      }
      //Update
      updateContact(item : Contact){
          return this.http.put<Contact>(this.apiUrl + '/' + item.id, item );
      }
      //Delete
      deleteContact(id : number){
          return this.http.delete(this.apiUrl + '/' + id);
      }
}
