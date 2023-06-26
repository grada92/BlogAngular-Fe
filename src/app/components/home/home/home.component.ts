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
  previewLength: number = 150;
  articles: ArticleOutputDto[] = [];
  filteredArticles: any[] = [];
  selectedCat: string = '';

  constructor(private articleService:ArticleService, private router:Router) {}

  ngOnInit() {
    this.readAllArticles();
  }

  readAllArticles() {
    this.articleService.readAllApproved().subscribe({
      next: (result: ArticleOutputDto[]) => {
        this.articles = result;
        this.filteredArticles = this.articles;
      },
      error: (error: any) => {
        console.error('Errore Visualizzazione Articoli', error);
      }
    });
  }


  filterArticlesByCategory(category: string) {
    console.log('Tag selezionato:', category);
    this.selectedCat = category;
    if (category === '') {
      this.filteredArticles = this.articles; // Se il tag è vuoto, mostra tutti gli articoli
    } else {
      this.filteredArticles = this.articles.filter(article =>
        article.categories.some(t => t.name === category)
      );
    }
  }


  viewFullArticle(articleId: number) {
    this.router.navigateByUrl('/articolo/' + articleId);
  }
}
