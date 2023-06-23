import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryOutputDto } from "src/app/models/category/category-output-dto.model";
import { environment } from "src/environment/environment";

@Injectable({providedIn: 'root'})
export class CategoryService {

    constructor(private httpClient: HttpClient) {}

    readAll() : Observable<CategoryOutputDto[]>{
        return this.httpClient.get<CategoryOutputDto[]>(environment.endpoint + "blog/category",{
            headers : {
                skip : "true"
            }
        });
    }

}
