//les models de données sont les entites du systeme
//fichier qui decrit la forme de donnée
//semblable a une table de donnée

import { Contact } from "../services/contact.service";
import { Projet } from "../services/projet.service";
import { Utilisateur } from "../services/utilisateur.service";

export interface Todo{
    // | en typescript c'est possible d'avoir
    //plusieurs types

    // | null cad champ optionnel

    //identifiant
    id: number | null;
    title: string | null;
    completed : boolean | null;
    priority: string | null;
    //dueDate: Date | null;
    dueDate: string;
    description: string | null;
    membres: Contact[] | null;
    projet: Projet | null;
    user: Utilisateur | null;
    userId?: number; 
}