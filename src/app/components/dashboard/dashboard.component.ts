import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  todos : Todo[] = [];
  kpis = [
        {
          id:1,
          text: 'À faire',
          icon: 'event',
          color: '!bg-blue-500',
          valeur: 0
        },
        {
          id:2,
          text: 'Tâches en retard',
          icon: 'warning',
          color: '!bg-red-500',
          valeur: 0

        },
        {
          id:3,
          text: 'Urgent',
          icon: 'priority_high',
          color: '!bg-yellow-500',
          valeur: 0
        }
      ];
     
  //KPI
  //KeyPerformanceIndicators
  //Indicateur de performances clés
  //Comme un tableau de voitures: essence, huile, temperature..

  
  constructor(private todoService: TodoService){
  }

  ngOnInit(): void {
    this.fetchTodo();
  }

  fetchTodo(){
    this.todoService.getTodos().subscribe((data) => {
    this.todos = data;
    
    let today = new Date();
    let aFaire = 0, enRetard = 0, urgent = 0;
   
    for (let item of this.todos){
          if (new Date(item.dueDate).toDateString() == today.toDateString()) 
            {
          aFaire++;
            }
    }
    this.kpis[0].valeur = aFaire;
    

    //aFaire = this.todos.filter(c => 
    //c.priority == null &&  new Date(c.dueDate).toDateString() == today.toDateString()).length;
    //this.kpis[0].valeur = aFaire;

    for (let i=0;i<this.todos.length;i++){
        let todo = this.todos[i];
        if (new Date(todo.dueDate).toDateString() < today.toDateString()) 
          {
          enRetard++;
          }
    }
    //enRetard = this.todos.filter(c =>
    //c.priority == null && new Date(c.dueDate).toDateString() > today.toDateString()).length;


    this.kpis[1].valeur = enRetard;

      //== n'est pas utilisable avec les objets Date
      //pour cela je convertis en string avec la fonction .toDateString()
      //afin de pouvoir utiliser ==


    urgent = this.todos.filter(c=>
    c.priority == '1' && 
    new Date(c.dueDate).toDateString() == today.toDateString()).length;
    this.kpis[2].valeur = urgent;
    
  }) 
} 
}
