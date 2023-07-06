import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegistrationUserDto} from "../../models/user/registration-user-dto.model";
import {Observable} from "rxjs";
import { environment } from 'src/environment/environment';
import { UserOutputDto } from 'src/app/models/user/user-output-dto.model';
import { AuthenticationDto } from 'src/app/models/user/authentication-dto-model';
import { LoginUserDto } from 'src/app/models/user/login-user-dto.model';
import { RoleOutputDto } from 'src/app/models/user/role-output-dto-model';
import { AuthorRegistrationDto } from 'src/app/models/user/author-registration-dto.model';
import { NewPasswordDto } from 'src/app/models/user/new-password-dto.model';


@Injectable({
    providedIn: 'root'
  })
export class UserService {

  constructor(private httpClient: HttpClient) {}

  registra(registrationUserDto: RegistrationUserDto) : Observable<UserOutputDto> {
    return this.httpClient.post<UserOutputDto>(environment.endpoint + "blog/user/sign", registrationUserDto, {
      headers: {
        skip: "true"
      }
    });
  }

  login(loginUserDto : LoginUserDto) : Observable<AuthenticationDto> {
    return this.httpClient.post<AuthenticationDto>(environment.endpoint + "blog/user/login", loginUserDto, {
      headers: {
        skip: "true"
      }
    });
  }

  resetPassword(newPassword: NewPasswordDto, id : number): Observable<number> {
    return this.httpClient.put<number>(environment.endpoint + "blog/user/resetPassword/" + id, newPassword, {
      headers : {
        skip: "true"
      }
    });
  }

  activateStaff(id : number): Observable<void> {
    return this.httpClient.get<void>(environment.endpoint + "blog/user/activate/" + id , {
      headers : {
        skip: "true"
      }
    });
  }

  blockUser(userId: number): Observable<void> {
    return this.httpClient.post<void>(environment.endpoint + "blog/user/block/" + userId, {
      headers: {
        skip: "true"
      }
    });
  }

  activeUser(userId: number): Observable<void> {
    return this.httpClient.post<void>(environment.endpoint + "blog/user/active/" + userId, {
      headers: {
        skip: "true"
      }
    });
  }


  findRolesByUserId(id:number): Observable<RoleOutputDto[]> {
    return this.httpClient.get<RoleOutputDto[]>(environment.endpoint + "blog/user/roles/" + id);
  }

  registraAuthor(AuthorRegister : AuthorRegistrationDto) : Observable<UserOutputDto> {
    return this.httpClient.post<UserOutputDto>(environment.endpoint + "blog/user/authorRegistration", AuthorRegister)
  }

  findAll():Observable<UserOutputDto[]>{
    return this.httpClient.get<UserOutputDto[]>(environment.endpoint + "blog/user");
  }

  findAllAuthor():Observable<UserOutputDto[]>{
    return this.httpClient.get<UserOutputDto[]>(environment.endpoint + "blog/user/authors");
  }

  delete(id : number): Observable<void>{
    return this.httpClient.delete<void>(environment.endpoint + "blog/user/deleteAuthor/" + id);
  }

}
