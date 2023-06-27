import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleOutputDto } from 'src/app/models/article/article-output-dto.model';
import { TagOutputDto } from 'src/app/models/tag/tag-output-dto.model';
import { ArticleService } from 'src/app/shared/services/article.service';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  previewLength: number = 100;
  articles: ArticleOutputDto[] = [];
  filteredArticles: any[] = [];
  selectedCat: string = '';
  selectedTag: string = '';
  searchArticleText: string = '';
  tags: TagOutputDto[] = [];

  constructor(private articleService:ArticleService,private tagService: TagService, private router:Router) {}

  ngOnInit() {
    this.readAllArticles();
    this.readAllTags();
    this.filterArticlesByTag(this.selectedTag);
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

  readAllTags() {
    this.tagService.readAll().subscribe({
      next: (result: TagOutputDto[]) => {
        this.tags = result;
        this.filterArticlesByTag(this.selectedTag);
      },
      error: (error: any) => {
        console.error('Errore Visualizzazione Tag', error);
      }
    });
  }

  searchArticles() {
    if (this.searchArticleText.trim() === '') {
      this.filteredArticles = this.articles;
    } else {
      const searchText = this.searchArticleText.toLowerCase();
      this.filteredArticles = this.articles.filter(article =>
        article.title.toLowerCase().includes(searchText) ||
        article.content.toLowerCase().includes(searchText)
      );
    }
  }

  filterArticlesByCategory(category: string) {
    console.log('Categoria selezionata:', category);
    this.selectedCat = category;
    if (category === '') {
      this.filteredArticles = this.articles; // Se tag vuoto
    } else {
      this.filteredArticles = this.articles.filter(article =>
        article.categories.some(t => t.name === category)
      );
    }
  }

  filterArticlesByTag(tag: string) {
    console.log('Tag selezionato:', tag);
    this.selectedTag = tag;
    if (tag === '') {
      this.filteredArticles = this.articles;
    } else {
      this.filteredArticles = this.articles.filter(article =>
        article.tags && article.tags.some(t => t.name === tag)
      );
    }
  }

  viewFullArticle(articleId: number) {
    this.router.navigateByUrl('/articolo/' + articleId);
  }
}
