import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewPasswordDto } from 'src/app/models/user/new-password-dto.model';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent {

  hidePassword: boolean = true;
  formActivate: FormGroup;
  passwordsMatch: boolean = true;

  constructor(private userService: UserService, private builder: FormBuilder , private router : Router , private route: ActivatedRoute) {
    this.formActivate = this.builder.group({
      password: new FormControl('' , [Validators.required , Validators.pattern(environment.rgxPassword)]),
      repPassword: new FormControl('', [Validators.required])
    });
  }

  getPasswordErrorMessage() : string {
    if(this.formActivate.controls["password"].hasError('required')) {
      return 'Inserisci un valore valido';
    }
    return this.formActivate.controls["password"].hasError('pattern') ? 'La password deve contenere tra i 6 e i 16 caratteri, almeno un numero e un carattere speciale' : '';
  }

  getRepPasswordErrorMessage() : string {
    return this.formActivate.controls["repPassword"].hasError('required') ? 'Inserisci un valore valido' : '';
  }

  public passwordReset(): void {
    if(!(this.formActivate.controls["password"].value === this.formActivate.controls["repPassword"].value)) {
      this.passwordsMatch = false;
      console.log("Password non uguali")
      this.formActivate.reset();
      this.formActivate.clearValidators();
      return;
    }
    let id : number = -1;
    let newPasswordDto : NewPasswordDto = { password : this.formActivate.controls["password"].value };
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.userService.resetPassword(newPasswordDto,id).subscribe({

      next : () =>  this.userService.activateStaff(id).subscribe({
        next : () => this.router.navigateByUrl('/login'),
        error : (err) => console.log(err),
      }),

      error : (err) => console.log(err),

    });

  }
}
