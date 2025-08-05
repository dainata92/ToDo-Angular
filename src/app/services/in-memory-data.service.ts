import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../models/utilisateur.model';


@Injectable({
  providedIn: 'root'
})
//API virtuelle mock 'InMemory'
//cad donnees initialisés avec chaque demarrage

//pre-requis en terminal:
// npm i angular-in-memory-web-api@0.19.0
//  ng g service in-memory-data
export class InMemoryDataService implements InMemoryDataService{


  
  constructor( ) { }

  createDb(){
    const todos : Todo[] = [
      //Urgentes: priority=1 et dueDate = aujourd'hui
        {id:1, title:'Appeler Secu', completed:false, priority: '1', dueDate: new Date().toISOString(), description : "", membres:[],projet: null, user:null},

      //A faire  aujourd'hui dueDate= aujourd'hui
        {id:2, title:'Envoyer e-mail', completed:false, priority: null, dueDate: new Date().toISOString(), description: "",membres:[], projet: null,user:null},

      //Tache en retard dueDate  < aujourd'hui
        {id:3, title:'Declaration impot', completed:false, priority: null, dueDate: new Date(2025,5,1).toISOString(), description : "",membres:[],projet: null,user:null},

      //Tache en retard dueDate< aujourd'hui
        {id:4, title:'Envoyer CV', completed:false, priority: null, dueDate: new Date(2025,5,2).toISOString(), description : "",membres:[],projet: null,user:null},
    ];
    const utilisateurs : Utilisateur[] = [
              {id: 1, firstName:'Dainata', lastName: 'Leva', genre: 'Femme' },
              {id: 2, firstName: 'Aurelien', lastName: 'Fontaine', genre: 'Homme'}
          ];

    return {todos, utilisateurs}; //un lien endpoint api/todos
  }
}
