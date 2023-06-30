import { Component } from '@angular/core';
import { UserOutputDto } from 'src/app/models/user/user-output-dto.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-gestione-utenti',
  templateUrl: './gestione-utenti.component.html',
  styleUrls: ['./gestione-utenti.component.css']
})
export class GestioneUtentiComponent {
  displayedColumns: string[] = ['nome', 'cognome', 'email', 'actions'];
  showModal : boolean = true;
  dataSource: UserOutputDto[] = []


  constructor(private httpClient: UserService) {
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
}
