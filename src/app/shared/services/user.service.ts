import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegistrationUserDto} from "../../models/user/registration-user-dto.model";
import {Observable} from "rxjs";
import { environment } from 'src/environment/environment';
import { UserOutputDto } from 'src/app/models/user/user-output-dto.model';
import { AuthenticationDto } from 'src/app/models/user/authentication-dto-model';
import { LoginUserDto } from 'src/app/models/user/login-user-dto.model';
import { RoleOutputDto } from 'src/app/models/user/role-output-dto-model';


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

  findRolesByUserId(id:number): Observable<RoleOutputDto[]> {
    return this.httpClient.get<RoleOutputDto[]>(environment.endpoint + "blog/user/roles/" + id);
  }
/*


  findAll():Observable<UserOutputDto[]>{
    return this.httpClient.get<UserOutputDto[]>(environment.endpoint + "auth/user");
  }

  delete(id : number): Observable<void>{
    return this.httpClient.delete<void>(environment.endpoint + "auth/user/deleteUser/" + id);
  }
  */
}
