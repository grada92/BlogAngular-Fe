import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleOutputDto } from 'src/app/models/article/article-output-dto.model';
import { TagOutputDto } from 'src/app/models/tag/tag-output-dto.model';
import { UserOutputDto } from 'src/app/models/user/user-output-dto.model';
import { ArticleService } from 'src/app/shared/services/article.service';
import { TagService } from 'src/app/shared/services/tag.service';
import { UserService } from 'src/app/shared/services/user.service';

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
  mostLikedArticles: ArticleOutputDto[] = [];
  isSubscribed: boolean = false;

  constructor(private articleService:ArticleService,private tagService: TagService,private userService : UserService, private router:Router) {}

  ngOnInit() {
    this.readAllArticles();
    this.readAllTags();
    this.filterArticlesByTag(this.selectedTag);
    this.checkUserSubscription();
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

  getTopLikedArticles() {
    this.articleService.getMostLikedArticles().subscribe({
      next: (result: ArticleOutputDto[]) => {
        this.filteredArticles = result;
      },
      error: (error: any) => {
        console.error('Errore Ottenimento Articoli Più Apprezzati', error);
      }
    });
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

  getArticleImage(content: string): string | null {
    const regex = /<img.*?src="(data:image\/(png|jpeg|jpg);base64,.*?)"/;
    const match = content.match(regex);
    return match ? match[1] : null;
  }

  getArticlePreviewText(content: string): string {
    const maxLength = 100;
    let previewText = content.replace(/<[^>]+>/g, '');
    if (previewText.length > maxLength) {
      previewText = previewText.substring(0, maxLength) + '...';
    }
    return previewText;
  }


  viewFullArticle(articleId: number) {
    this.router.navigateByUrl('/articolo/' + articleId);
  }

  checkUserSubscription() {
    const userId = Number(localStorage.getItem("USER_ID"));
    this.userService.getUser(userId).subscribe({
      next: (user: UserOutputDto) => {
        this.isSubscribed = user.subscription;
        console.log("L'utente è : ", this.isSubscribed);
      },
      error: (error: any) => {
        console.error("Errore Ottenimento Utente", error);
      }
    });
  }

  subscribeToNotifications() {
    const userId = Number(localStorage.getItem("USER_ID"));
    this.userService.subscribeToNotifications(userId).subscribe({
      next: () => {
        console.log("Iscrizione");
        this.isSubscribed = !this.isSubscribed;
      },
      error: (error: any) => {
        console.error("Errore Iscrizione", error);
      }
    });
  }



}
