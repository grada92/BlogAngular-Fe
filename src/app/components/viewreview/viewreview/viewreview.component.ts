import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleOutputDto } from 'src/app/models/article/article-output-dto.model';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-viewreview',
  templateUrl: './viewreview.component.html',
  styleUrls: ['./viewreview.component.css']
})
export class ViewreviewComponent {
  article?: ArticleOutputDto;
  articleId: number = -1;

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router){}

  findbyId(id : number){
    this.articleService.findById(id).subscribe(value => this.article = value);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articleId = Number(params["id"]);
      this.findbyId(this.articleId);
    });
  }

  approveArticle(id: number) {
    this.articleService.articleApproved(id).subscribe(approvedArticle => {
      console.log('Articolo approvato:', approvedArticle);
      this.router.navigate(['/revisione']);
    });
  }

  deleteArticle(articleId: number) {
    this.articleService.delete(articleId).subscribe(article => {
      console.log("articolo eliminato", article);
      this.router.navigate(['/revisione']);
    })
  }
}
