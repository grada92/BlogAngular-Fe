import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnChanges, OnInit {

  constructor(private userService : UserService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.router.events.subscribe(event => {
      this.findRoles();
    });
  }

  user : string = '';
  staff : string = '';
  admin : string = '';

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.findRoles();
    })
  }

  private findRoles(){
    if(localStorage.getItem("USER_ID")) {
      this.userService.findRolesByUserId((Number)(localStorage.getItem('USER_ID'))).subscribe({
        next : list => list.forEach(role => {
          if(role.authority === 'ROLE_ADMIN'){
            this.admin = role.authority;
          }
          if(role.authority === 'ROLE_STAFF'){
            this.staff = role.authority;
          }
          if(role.authority === 'ROLE_USER'){
            this.user = role.authority;
          }
        })
      });
    }

  }

  logout() {
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("JWT");
    this.user = '';
    this.admin = '';
    this.staff = '';
    this.router.navigateByUrl("/login");
  }

  showLogout(): boolean {
    if(this.user === '' && this.admin === '' && this.staff === '') {
      return true;
    }
    return false;
  }

  showReview() {
    if(this.admin === '' && this.staff === '') {
     return true;
    }
    return false;
  }
}
