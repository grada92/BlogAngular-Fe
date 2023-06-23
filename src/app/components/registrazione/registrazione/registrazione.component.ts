import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationUserDto } from 'src/app/models/user/registration-user-dto.model';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent {
  formRegistrazione: FormGroup;
  hidePassword = true;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.formRegistrazione = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(environment.rgxPassword)])
    });
  }


  getNomeErrorMessage() {
    return this.formRegistrazione.controls["nome"].hasError('required') ? 'Inserisci un valore' : '';
  }

  getCognomeErrorMessage() {
    return this.formRegistrazione.controls["cognome"].hasError('required') ? 'Inserisci un valore' : '';
  }

  getEmailErrorMessage() {
    if(this.formRegistrazione.controls["email"].hasError('required')) {
      return 'Inserisci un valore';
    }
    return this.formRegistrazione.controls["email"].hasError('email') ? 'Email non valida' : '';
  }

  getPasswordErrorMessage() {
    if(this.formRegistrazione.controls["password"].hasError('required')) {
      return 'Inserisci un valore';
    }
    return this.formRegistrazione.controls["password"].hasError('pattern') ? 'La password deve contenere tra i 6 e i 16 caratteri, almeno un numero e un carattere speciale' : '';
  }

  registra(): void {
    let registrazioneUtenteDto : RegistrationUserDto = {
      firstName: this.formRegistrazione.controls["nome"].value,
      lastName: this.formRegistrazione.controls["cognome"].value,
      email: this.formRegistrazione.controls["email"].value,
      password: this.formRegistrazione.controls["password"].value
    }
    this.userService.registra(registrazioneUtenteDto).subscribe({
      next: () => {
        this.router.navigateByUrl("/login");
      },
      error: (err: any) => {
        console.error('Registration error:', err);
      }
    });
    this.formRegistrazione.reset();
  }
}
