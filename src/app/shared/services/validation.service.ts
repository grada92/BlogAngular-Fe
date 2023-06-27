import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ValidationInputDto } from "src/app/models/validation/validation-input-dto.model";
import { ValidationOutputDto } from "src/app/models/validation/validation-output.dto.model";
import { environment } from "src/environment/environment";

@Injectable({providedIn: 'root'})
export class ValidationService {

    constructor(private httpClient: HttpClient) {}
    create(validationInputDto: ValidationInputDto): Observable<ValidationOutputDto> {
      return this.httpClient.post<ValidationOutputDto>(environment.endpoint + "blog/validation/create", validationInputDto);
    }

    update(validationInputDto: ValidationInputDto): Observable<ValidationOutputDto> {
      return this.httpClient.put<ValidationOutputDto>(environment.endpoint + "blog/validation/update", validationInputDto);
    }




}
