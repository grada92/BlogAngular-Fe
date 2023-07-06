import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorRegistrationDto } from 'src/app/models/user/author-registration-dto.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  formStaff : FormGroup;
  successMessage: string = '';
  loading: boolean = false;

  constructor(private formBuilder : FormBuilder, private userService: UserService, private router:Router) {
    this.formStaff = this.formBuilder.group({
      nome : new FormControl('',[Validators.required]),
      cognome : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.email])
    })
  }

  staffRegister(): void{
    this.loading = true;
    let author : AuthorRegistrationDto= {
      firstName : this.formStaff.controls['nome'].value,
      lastName : this.formStaff.controls['cognome'].value,
      email : this.formStaff.controls['email'].value
    }
    this.userService.registraAuthor(author).subscribe({
      next: () => {
        this.successMessage = "Registrazione autore avvenuta con successo.";
        console.log("Registrazione avvenuta con successo:", this.successMessage);
        this.loading = false;
        this.router.navigateByUrl("/gestione-autori");
      },
      error: (err: any) => {
        console.log("Errore durante la registrazione dello staff:", err);
        this.loading = false;

      },
      complete: () => {
        this.formStaff.reset();
      }
    });
    this.formStaff.clearValidators();
  }



  getNomeErrorMessage() {
    if(this.formStaff.controls["nome"].hasError('required')) {
      return 'Inserisci un valore';
    }
    return '';
  }

  getCognomeErrorMessage() {
    if(this.formStaff.controls["cognome"].hasError('required')) {
      return 'Inserisci un valore';
    }
    return '';
  }

  getEmailErrorMessage() {
    if(this.formStaff.controls["email"].hasError('required')) {
      return 'Inserisci un valore';
    }
    return this.formStaff.controls["email"].hasError('email') ? 'Email non valida' : '';
  }
}
