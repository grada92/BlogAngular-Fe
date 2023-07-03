import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleOutputDto } from 'src/app/models/article/article-output-dto.model';
import { CommentInputDto } from 'src/app/models/comment/comment-input-dto.model';
import { CommentOutputDto } from 'src/app/models/comment/comment-output-dto.model';
import { UserOutputDto } from 'src/app/models/user/user-output-dto.model';
import { VoteInputDto } from 'src/app/models/vote/vote-input-dto.model';
import { VoteOutputDto } from 'src/app/models/vote/vote-output-dto.model';
import { ArticleService } from 'src/app/shared/services/article.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { VoteService } from 'src/app/shared/services/vote.service';

@Component({
  selector: 'app-articleview',
  templateUrl: './articleview.component.html',
  styleUrls: ['./articleview.component.css']
})
export class ArticleviewComponent implements OnInit {
  article?: ArticleOutputDto;
  articleId: number = -1;
  commentContent: string = '';
  comments: CommentOutputDto[] = [];
  users: UserOutputDto[] = [];




  constructor(private articleService: ArticleService,private commentService:CommentService, private route: ActivatedRoute, private router: Router,private voteService:VoteService){}

  findbyId(id : number){
    this.articleService.findById(id).subscribe(value => this.article = value);
  }

  getComments(articleId: number) {
    this.commentService.getCommentsByArticleId(articleId).subscribe(comments => {
      this.comments = comments;
      console.log('Commenti ricevuti:', comments);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articleId = Number(params["id"]);
      this.findbyId(this.articleId);
      this.getComments(this.articleId);
    });
  }

  createComment() {
    if (this.commentContent.trim().length === 0 || this.commentContent === '') {
    return;
  }
    const commentInputDto: CommentInputDto = {
      content: this.commentContent,
      userId: 1,
      articleId: this.articleId,
    };

    this.commentService.create(commentInputDto).subscribe(
      (createdComment: CommentOutputDto) => {
        console.log('Commento creato:', createdComment);
        this.commentContent = '';
        this.getComments(this.articleId);
      },
      (error) => {
        console.error('Errore creazione Commento', error);
      }
    );
  }

  voteArticle(liked: boolean) {
    if (this.article) {
      const voteInputDto: VoteInputDto = {
        liked: liked,
        disliked: !liked,
        userId: 2,
        articleId: this.article.id,
      };

      this.voteService.voteArticle(voteInputDto).subscribe(
        (vote: VoteOutputDto) => {
          console.log('Voto registrato', vote);
          this.router.navigateByUrl("/articolo/" + this.articleId).then(() => {
            window.location.reload();
          })
        },
        (error) => {
          console.error('Errore durante il voto', error);
        }
      );
    }
  }

}
