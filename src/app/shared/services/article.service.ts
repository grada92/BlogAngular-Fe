import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ArticleInputDto } from "src/app/models/article/article-input-dto.model";
import { ArticleOutputDto } from "src/app/models/article/article-output-dto.model";
import { environment } from "src/environment/environment";

@Injectable({providedIn: 'root'})
export class ArticleService {

    constructor(private httpClient: HttpClient) {}

    create(articleInputDto: ArticleInputDto): Observable<ArticleOutputDto> {
      return this.httpClient.post<ArticleOutputDto>(environment.endpoint + "blog/article", articleInputDto);
  }

    readAll() : Observable<ArticleOutputDto[]>{
        return this.httpClient.get<ArticleOutputDto[]>(environment.endpoint + "blog/article/all",{
            headers : {
                skip : "true"
            }
        });
    }

}
