import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TagOutputDto } from "src/app/models/tag/tag-output-dto.model";
import { environment } from "src/environment/environment";

@Injectable({providedIn: 'root'})
export class TagService {

    constructor(private httpClient: HttpClient) {}

    readAll() : Observable<TagOutputDto[]>{
        return this.httpClient.get<TagOutputDto[]>(environment.endpoint + "blog/tag",{
            headers : {
                skip : "true"
            }
        });
    }

}
