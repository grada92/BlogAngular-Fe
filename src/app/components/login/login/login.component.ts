import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationDto } from 'src/app/models/user/authentication-dto-model';
import { LoginUserDto } from 'src/app/models/user/login-user-dto.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin : FormGroup;
  hidePassword = true;
  loginError: string = '';
  showError: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService : UserService,  private router: Router){
    this.formLogin =  this.formBuilder.group({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required])
    });
  }

  getEmailErrorMessage() {
    if(this.formLogin.controls["email"].hasError('required')) {
      return 'Inserisci un valore';
    }
    return this.formLogin.controls["email"].hasError('email') ? 'Email non valida' : '';
  }

  getPasswordErrorMessage() {
    return this.formLogin.controls["password"].hasError('required') ? 'Inserisci un valore' : '';
  }

  login(): void {
    let user: LoginUserDto = {
      email: this.formLogin.controls["email"].value,
      password: this.formLogin.controls["password"].value
    };

    this.userService.login(user).subscribe({
      next: (value: AuthenticationDto) => {
        localStorage.setItem("JWT", value.jwt);
        localStorage.setItem("USER_ID", value.user.id + '');
        this.router.navigateByUrl("/home");
      },
      error: (err: any) => {
        console.log("Errore durante il login:", err);
        this.loginError = 'Email o password errati. Riprova.';
        this.showError = true;
      },
      complete: () => {
        this.formLogin.reset();
        this.formLogin.markAsPristine();
        this.formLogin.markAsUntouched();
        this.loginError = '';
        this.showError = false;
      }
    });
  }

}
