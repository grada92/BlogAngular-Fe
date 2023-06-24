import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleOutputDto } from 'src/app/models/article/article-output-dto.model';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  previewLength: number = 150; // Lunghezza dell'anteprima degli articoli
  articles: ArticleOutputDto[] = [];
  constructor(private articleService:ArticleService, private router:Router) {}

  ngOnInit() {
    this.readAllArticles();
  }

  readAllArticles() {
    this.articleService.readAll().subscribe({
      next: (result: ArticleOutputDto[]) => {
        this.articles = result;
      },
      error: (error: any) => {
        console.error('Errore Visualizzazione Articoli', error);
      }
    });
  }

  viewFullArticle(articleId: number) {
    this.router.navigateByUrl('/articolo/' + articleId);
  }
}
