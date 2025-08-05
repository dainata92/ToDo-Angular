import { FormControl} from "@angular/forms";


//Creer un formulaire typé
export interface UtilisateurForm{
    prenom: FormControl<string | null>;
    nom : FormControl<string | null>;
    sexe : FormControl<string | null>;
}