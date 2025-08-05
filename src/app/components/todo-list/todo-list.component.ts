import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit{
    formGroup : FormGroup;
    todos : Todo[] = [];
    constructor(private fb:FormBuilder, private todoService : TodoService, private snackBar : MatSnackBar){
        this.formGroup = this.fb.group({
          title : ['', [Validators.required]]
        });
    }
  ngOnInit(): void {

    //methode subscribe
    //communication asynchrone donc il faut s'inscrire pour avoir le retour

    this.fetchTodo();
  }

  fetchTodo(){
    this.todoService.getTodos().subscribe((data) => {
    this.todos = data;
  })
}

    onAddTodo(){
      console.log('onAddTodo called');
      if(this.formGroup.valid) {
        const formValue = this.formGroup.value;
        const todo : Todo = {
          //il est generé sur le serveur pour cela il est envoyé null
          id:null,  
          //Title est remplis depuis le formulaire  
          title: formValue.title,   
          completed:false,
          priority : null,
          dueDate: formValue.dueDate ? formValue.dueDate : null,
          description:formValue.description,
          membres : null,
          projet: null,
          user:null,
        };
    //actualise liste après ajout
    this.todoService.addTodo(todo).subscribe(data => {
      this.fetchTodo();   
    });
      }
    }

    onDeleteTodo(id: number | null){
      if(id == null)
        return;
      this.todoService.deleteTodo(id).subscribe(() => {
        this.fetchTodo();
        this.snackBar.open('Deleted !','', {duration: 1000});
      });
        
      }
    //on verifie si le checkbox est checked ou pas
     onVerifieTodo(event : MatCheckboxChange, todo : Todo){
        console.log(event.checked);
        todo.completed = event.checked;

        //maj dans l'api
        //afficher un snackbar updated

        this.todoService.updateTodo(todo).subscribe((data) => {
          console.log(data);
          this.snackBar.open('Update','', {duration:1000});
        })
      }
    }
