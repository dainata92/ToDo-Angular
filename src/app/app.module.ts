import { importProvidersFrom, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import {MatCardModule} from '@angular/material/card';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { UtilisateurListComponent } from './components/utilisateur-list/utilisateur-list.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import {MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectionStrategy, Component, computed, inject, model, signal} from '@angular/core';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { authInterceptor } from './auth/auth.interceptor';
import { SignUpComponent } from './components/signUp/sign-up.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    TodoListComponent,
    UtilisateurListComponent,
    TodoDetailComponent,
    TodoTableComponent,
    DashboardComponent,
    SignUpComponent
  ],
  imports: [
    //importer les modules pour pouvoir utiliser 
    //les composants correspondants material et autre
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatSnackBarModule,
    RouterLink,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule, 
    MatChipsModule, 
    MatIconModule, 
    MatAutocompleteModule, 
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [
    provideHttpClient(withInterceptors([
        authInterceptor
      ])),
    
   
    //injecter in-memory-data.service.ts 
    //comme il est @injectable
    //importProvidersFrom([
      //HttpClientInMemoryWebApiModule.forRoot(
        //InMemoryDataService,{delay: 200}
      //),
    //]),
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'fr'}
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
