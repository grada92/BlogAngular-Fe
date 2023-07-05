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
import { UserService } from 'src/app/shared/services/user.service';
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
  deleteError: string = '';



  constructor(private articleService: ArticleService,private userService: UserService,private commentService:CommentService, private route: ActivatedRoute, private router: Router,private voteService:VoteService){}

  user : string = '';
  staff : string = '';
  admin : string = '';

  findbyId(id : number){
    this.articleService.findById(id).subscribe(value => this.article = value);
  }

  private findRoles(){
    if(localStorage.getItem("USER_ID")) {
      this.userService.findRolesByUserId((Number)(localStorage.getItem('USER_ID'))).subscribe({
        next : list => list.forEach(role => {
          if(role.authority === 'ROLE_ADMIN'){
            this.admin = role.authority;
          }
          if(role.authority === 'ROLE_STAFF'){
            this.staff = role.authority;
          }
          if(role.authority === 'ROLE_USER'){
            this.user = role.authority;
          }
        })
      });
    }

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
      this.findRoles();
    });
  }

  createComment() {
    if (this.commentContent.trim().length === 0 || this.commentContent === '') {
    return;
  }
    const commentInputDto: CommentInputDto = {
      content: this.commentContent,
      userId: (Number)(localStorage.getItem("USER_ID")),
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

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe(
      () => {
        console.log('Commento eliminato con successo');
        this.getComments(this.articleId);
      },
      (error) => {
        console.error("Errore eliminazione commento", error);
        this.deleteError = "Errore durante l'eliminazione del commento.";
      }
    );
  }

  deleteCommentUser(commentId: number) {
    const userId = (Number)(localStorage.getItem('USER_ID'));
    this.commentService.deleteCommentUser(commentId, userId).subscribe(
      () => {
        console.log('Commento eliminato con successo');
        this.getComments(this.articleId);
      },
      (error) => {
        console.error("Errore eliminazione commento", error);
        this.deleteError = "Errore durante l'eliminazione del commento.";
      }
    );
  }




  voteArticle(liked: boolean) {
    if (this.article) {
      const voteInputDto: VoteInputDto = {
        liked: liked,
        disliked: !liked,
        userId: (Number)(localStorage.getItem("USER_ID")),
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

  showDelete() {
    if(this.admin === '' && this.staff === '') {
     return true;
    }
    return false;
  }

  showDeleteUser() {
    if (this.user === 'ROLE_USER' && this.admin === '' && this.staff === '') {
      return true;
    }
    return false;
  }

}
