import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommentInputDto } from "src/app/models/comment/comment-input-dto.model";
import { CommentOutputDto } from "src/app/models/comment/comment-output-dto.model";
import { environment } from "src/environment/environment";

@Injectable({providedIn: 'root'})
export class CommentService {

    constructor(private httpClient: HttpClient) {}
    create( commentInputDto:CommentInputDto ): Observable<CommentOutputDto> {
      return this.httpClient.post<CommentOutputDto>(environment.endpoint + "blog/comment", commentInputDto);
    }

    createAnotherComment(parentCommentId: number, commentInputDto: CommentInputDto): Observable<CommentOutputDto> {
      return this.httpClient.post<CommentOutputDto>(environment.endpoint + "/comment/" + {parentCommentId} + "/comments", commentInputDto);
    }

    getCommentsByArticleId(articleId: number): Observable<CommentOutputDto[]> {
      return this.httpClient.get<CommentOutputDto[]>(environment.endpoint + "blog/comment" + {articleId});
    }

    getAnotherCommentsByParentId(parentId: number): Observable<CommentOutputDto[]> {
      return this.httpClient.get<CommentOutputDto[]>(environment.endpoint + "blog/comment" + {parentId});
    }

    deleteComment(commentId: number): Observable<void> {
      return this.httpClient.delete<void>(environment.endpoint + "blog/comment" + {commentId});
    }

    deleteAnotherComment(anotherCommentId: number): Observable<void> {
      return this.httpClient.delete<void>(environment.endpoint + "blog/comment" + {anotherCommentId});
    }




}
