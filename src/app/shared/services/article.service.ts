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

  readAllApproved() : Observable<ArticleOutputDto[]>{
    return this.httpClient.get<ArticleOutputDto[]>(environment.endpoint + "blog/article/approved",{
        headers : {
            skip : "true"
        }
    });
  }

  readAllUnapproved() : Observable<ArticleOutputDto[]>{
  return this.httpClient.get<ArticleOutputDto[]>(environment.endpoint + "blog/article/unapproved",{
      headers : {
          skip : "true"
      }
    });
  }

  articleApproved(id: number): Observable<ArticleOutputDto> {
    return this.httpClient.put<ArticleOutputDto>(environment.endpoint + "blog/article/approved/" + `${id}`, null, {
      headers: {
        skip: "true"
      }
    });
  }

  findById(id: number): Observable<ArticleOutputDto> {
    return this.httpClient.get<ArticleOutputDto>(environment.endpoint + "blog/article/" + `${id}`, {
      headers: {
        skip: "true"
      }
    });
  }

  getMostLikedArticles(): Observable<ArticleOutputDto[]> {
    return this.httpClient.get<ArticleOutputDto[]>(environment.endpoint + 'blog/article/top', {
      headers: {
        skip: 'true'
      }
    });
  }

  delete(articleId: number) : Observable<void> {
    return this.httpClient.delete<void>(environment.endpoint + "blog/article/" + articleId );
  }


}
