import { Component, OnInit } from '@angular/core';
import { UserOutputDto } from 'src/app/models/user/user-output-dto.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-gestione-autori',
  templateUrl: './gestione-autori.component.html',
  styleUrls: ['./gestione-autori.component.css']
})
export class GestioneAutoriComponent implements OnInit{
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
    this.httpClient.findAllAuthor().subscribe({
      next: value => this.dataSource = value
    })
  }
}
