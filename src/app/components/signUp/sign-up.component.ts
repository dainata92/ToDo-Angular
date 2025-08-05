import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  listGenre = 
  [
    {text: 'Femme', value:'f'},
    {text:'Homme', value:'h'}
  ];
  signUpForm! : FormGroup;
  constructor(private fb : FormBuilder, private router:Router,public authService: AuthService, private userService: UtilisateurService){
}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      nom : ['', [Validators.required]],
      prenom : ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit(){
    if (this.signUpForm.valid) {
      const user = this.signUpForm.value;
      this.userService.register(user).subscribe({
        next: (res) => {
          console.log('Utilisateur enregistré :', res);
          
          this.router.navigateByUrl('/login');
        },
        error: (err) => console.error('Erreur lors de l’inscription', err),
      });
  }
}
}
