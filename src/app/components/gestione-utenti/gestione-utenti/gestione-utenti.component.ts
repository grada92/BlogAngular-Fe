import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserOutputDto } from 'src/app/models/user/user-output-dto.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-gestione-utenti',
  templateUrl: './gestione-utenti.component.html',
  styleUrls: ['./gestione-utenti.component.css']
})
export class GestioneUtentiComponent {
  displayedColumns: string[] = ['nome', 'cognome', 'email','stato', 'azioni'];
  showModal : boolean = true;
  dataSource: UserOutputDto[] = []


  constructor(private httpClient: UserService,private router: Router) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  deleteUser(id: number) {
    this.httpClient.delete(id).subscribe({
      next : () => {
        this.loadUser();
      },
      error: (err: any) => {
        console.log("Errore cancellazione autore:", err);
      }
    })
  }

  loadUser(){
    this.httpClient.findAll().subscribe({
      next: value => this.dataSource = value
    })
  }

  blockUser(id: number) {
    this.httpClient.blockUser(id).subscribe({
      next: () => {
        console.log("Utente bloccato");
        this.router.navigateByUrl("/gestione-utenti").then(() => {
          window.location.reload();
        })
      },
      error: (err: any) => {
        console.log("Errore blocco utente:", err);
      }
    });
  }

  activeUser(id: number) {
    this.httpClient.activeUser(id).subscribe({
      next: () => {
        console.log("Utente attivato");
        this.router.navigateByUrl("/gestione-utenti").then(() => {
          window.location.reload();
        })
      },
      error: (err: any) => {
        console.log("Errore attivazione utente:", err);
      }
    });
  }

}
