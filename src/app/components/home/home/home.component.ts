import { Component, OnInit } from '@angular/core';
import { ArticleOutputDto } from 'src/app/models/article/article-output-dto.model';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: ArticleOutputDto[] = [];
  constructor(private articleService:ArticleService) {}

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

}
