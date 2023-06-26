import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TagInputDto } from "src/app/models/tag/tag-input-dto.model";
import { TagOutputDto } from "src/app/models/tag/tag-output-dto.model";
import { environment } from "src/environment/environment";

@Injectable({providedIn: 'root'})
export class TagService {

    constructor(private httpClient: HttpClient) {}
    create(tagInputDto: TagInputDto): Observable<TagOutputDto> {
      return this.httpClient.post<TagOutputDto>(environment.endpoint + "blog/tag", tagInputDto);
    }

    readAll() : Observable<TagOutputDto[]>{
        return this.httpClient.get<TagOutputDto[]>(environment.endpoint + "blog/tag",{
            headers : {
                skip : "true"
            }
        });
    }

}
