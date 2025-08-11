import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { environment } from '../../environments/environment';
 //ng g service todo

//le service fait le lien entre le front et le back
//il fait les operations CRUD: Create Read Update Delete
//CRUD est un service qui recupere les données d une source externe
@Injectable({
  providedIn: 'root'
})

//HttpClient pour communiquer avec le Api/BackEnd
export class TodoService {

  //private apiURL='http://localhost:8080/api/action';
  private apiURL = environment.apiUrl + '/api/action';

  constructor(private http: HttpClient) { }
    //Create
    //<Todo> c est le type de retour de l'appel HTTP
    addTodo(item : Todo){
        console.log("Objet envoyé :", item);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Todo>(this.apiURL, item, { headers });
    }
    //Read
    //Fetch toute la liste
    getTodos(){
    //HTTP GET sans 2eme parametre car il n y a pas de body

        return this.http.get<Todo[]>(this.apiURL,);
    }
    //Read
    //Fetch un item de todo par son id
    getTodo(id : number){
        return this.http.get<Todo>(this.apiURL + '/' + id);
    }
    //Update
    updateTodo(item: Todo) {
  const token = sessionStorage.getItem('authToken');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.put<Todo>(this.apiURL + '/' + item.id, item, { headers });
}

    //Delete
    deleteTodo(id: number) {
        return this.http.delete(this.apiURL + '/' + id);
}
}
