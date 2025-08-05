import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { UtilisateurListComponent } from './components/utilisateur-list/utilisateur-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { SignUpComponent } from './components/signUp/sign-up.component';

/*
path : liensaisi dans la barre de navigation
component: la composant relie à ce path
 */
const routes: Routes = [
  {
    path:'login', component:LoginComponent
  },
  {
    path:'profile', component:ProfileComponent
  },
  {
    path: 'sign-up', component:SignUpComponent
  },
  //pathn vide car page par default
  { path: '', component: TodoListComponent},
  { path : 'utilisateur-list', component: UtilisateurListComponent},
  { path:'todo-detail/:id', component: TodoDetailComponent},
  { path: 'todo-table', component: TodoTableComponent},
  { path:'dashboard', component: DashboardComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
