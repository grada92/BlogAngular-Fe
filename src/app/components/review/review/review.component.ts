import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleOutputDto } from 'src/app/models/article/article-output-dto.model';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  previewLength: number = 150;
  articles: ArticleOutputDto[] = [];
  constructor(private articleService:ArticleService, private router:Router) {}

  ngOnInit() {
    this.readAllArticles();
  }

  readAllArticles() {
    this.articleService.readAllUnapproved().subscribe({
      next: (result: ArticleOutputDto[]) => {
        this.articles = result;
      },
      error: (error: any) => {
        console.error('Errore Visualizzazione Articoli', error);
      }
    });
  }

  viewFullArticle(articleId: number) {
    this.router.navigateByUrl('/revisione/' + articleId);
  }
}
