import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
//'@' signifie decorateur
//qui decore la classe component
//il vient juste avant la classe

//standalone: false
//composant accesible via un module seulement
//obligatoire de le mettre dans 'declarations' du app.module.ts (Module)
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

//'implements' pour implementer une interface
//une classe peut implementer plusieurs interfaces

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  //'!' pour pouvoir initialiser la variable ulterieurement
  //j'utilise l'injection automatique de angular pour recuperer
  //un objet form builder qui va construire le formulaire
  //pour faire cela j'ajoute ce que j'ai besoin dans les parametres
  //private avant formBuilder pour pouvoir acceder a la variable
  //en dehors du constructeur

constructor(private formBuilder : FormBuilder, private router:Router,public authService: AuthService){
}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      //1er parametre: valeur initiale du champ
      //2eme parametre: liste de validators
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit(){
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      console.log(this.loginForm.value.email);
      const users = this.loginForm.value;
      this.authService.login(users).subscribe({
        next: (res) => {
          sessionStorage.setItem('authToken', res.token);
          this.router.navigateByUrl('');
        },
        error: (err) => console.error('Erreur de connexion', err),
      });
      //ca donne undefined
      //erreur non identifié car formulaire non typé
      //console.log(this.loginForm.value.username2);
  }
}
}
