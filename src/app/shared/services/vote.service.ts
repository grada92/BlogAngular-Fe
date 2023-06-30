import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VoteInputDto } from "src/app/models/vote/vote-input-dto.model";
import { VoteOutputDto } from "src/app/models/vote/vote-output-dto.model";
import { environment } from "src/environment/environment";

@Injectable({providedIn: 'root'})
export class VoteService {

    constructor(private httpClient: HttpClient) {}
    voteArticle(voteInputDto: VoteInputDto): Observable<VoteOutputDto> {
      return this.httpClient.post<VoteOutputDto>(environment.endpoint + "blog/vote", voteInputDto);
    }




}
