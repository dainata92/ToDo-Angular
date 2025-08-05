import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ContactService, Contact } from '../../services/contact.service';
import { Projet, ProjetService } from '../../services/projet.service';
import { Utilisateur, UtilisateurService } from '../../services/utilisateur.service';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-todo-detail',
  standalone: false,
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css',
})
export class TodoDetailComponent implements OnInit {

  todo!: Todo;
  formGroup!: FormGroup;

  listPriority = 
  [
    { text: '1', value: 1 },
    { text: '2', value: 2 },
    { text: '3', value: 3 }
  ];

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private contactService: ContactService,
    private projetService: ProjetService,
    private utilisateurService : UtilisateurService) {
  }

  trackByFn(index: number, item: any): any {
  return item.id;
}
  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.contactService.getContacts().subscribe(contacts => {
    this.allMembres = contacts;
    this.filteredMembres = [...this.allMembres];
  });
  this.projetService.getProjets().subscribe(projets => {
    this.allProjets = projets;
  });
  this.utilisateurService.getUtilisateurs().subscribe(utilisateurs => {
    this.allUtilisateurs = utilisateurs;
    this.todoService.getTodo(id).subscribe(todoData => {
      this.todo = todoData;
      this.formGroup = this.fb.group({
        id: [this.todo.id],
        title: [this.todo.title, Validators.required],
        completed: [this.todo.completed],
        priority: [this.todo.priority],
        dueDate: [this.todo.dueDate],
        description: [this.todo.description],
        projet: [this.todo.projet ? this.todo.projet.id : null],
        userId: [this.todo.user?.id ?? null]  // On récupère l'id utilisateur actuel ou null
      });
      this.selectedMembres = this.todo.membres ?? [];

      //Remplissage automatique du champ utilisateur 

      const token = sessionStorage.getItem('authToken');
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          const currentUsername = decoded.sub;

          // Chercher l'utilisateur connecté dans la liste

          const currentUser = this.allUtilisateurs.find(u => u.username === currentUsername);
          if (currentUser) {
            const userIdInForm = this.formGroup.get('userId')?.value;
            if (!userIdInForm) { 
              // Si champ utilisateur non rempli
              this.formGroup.patchValue({ userId: currentUser.id });
              console.log(`Champ userId auto-rempli avec l'utilisateur connecté: ${currentUser.username}`);
            }
          }
        } catch (err) {
          console.error('Erreur décodage token JWT :', err);
        }
      }
    });
  });
}
  onSubmit() {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
      formValue.dueDate = this.toLocalIsoString(formValue.dueDate);
      formValue.priority = Number(formValue.priority);

      // projet en objet {id}

      if (formValue.projet && typeof formValue.projet === 'number') {
        formValue.projet = { id: formValue.projet };
      }
      console.log('Valeur userId avant conversion:', formValue.userId);

    // if (formValue.userId && typeof formValue.userId === 'number') {
    // formValue.user = { id: formValue.userId };
    // }
    // delete formValue.userId;

      formValue.userId = formValue.userId ? Number(formValue.userId) : null;

    // membres
    const membresUniques = this.selectedMembres
      .filter((m, index, self) => index === self.findIndex(t => t.id === m.id));
      formValue.membres = membresUniques.map(m => ({
      id: m.id,
      prenom: m.prenom
    }));
    console.log('Payload envoyé:', formValue);
    this.todoService.updateTodo(formValue).subscribe({
      next: data => {
        console.log('Réponse backend:', data);
        this.snackbar.open('Updated!', '', { duration: 1000 });
        this.router.navigate(['/']);
      },
      error: err => {
        console.error('Erreur lors de la mise à jour:', err);
        this.snackbar.open('Erreur lors de la sauvegarde', '', { duration: 3000 });
      }
    });
  }
}

  onCancel() {
    this.router.navigate(['/']);
  }

  toLocalIsoString(dateString: string): string {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
  }

  currentMembre = new FormControl('');
  selectedMembres: Contact[] = [];
  allMembres: Contact[] = [];
  filteredMembres: Contact[] = [];
  allProjets: Projet[] = [];
  allUtilisateurs:Utilisateur[] = [];

  remove(membre: Contact): void {
    this.selectedMembres = this.selectedMembres.filter(m => m.id !== membre.id);
  }

  onCurrentMembreChange(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredMembres = this.allMembres.filter(m =>
      m.prenom?.toLowerCase().includes(filterValue)
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const id = event.option.value; // id du contact sélectionné
    const contact = this.allMembres.find(c => c.id === id);
    if (contact && !this.selectedMembres.find(m => m.id === contact.id)) {
      this.selectedMembres.push(contact);
    }
    this.currentMembre.setValue('');
    event.option.deselect();
  }
}

