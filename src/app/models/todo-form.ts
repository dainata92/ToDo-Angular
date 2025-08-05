import { FormControl} from "@angular/forms";


//Creer un formulaire typé
export interface TodoForm{
    id: FormControl<number | null>;
    title : FormControl<string | null>;
    completed : FormControl<boolean | null>;
    priority : FormControl<number | null>;
    dueDate : FormControl<Date | null>;
    description: FormControl<string | null>;
    membres : FormControl<string[] | null>;
    projet : FormControl<string[] | null>;
}