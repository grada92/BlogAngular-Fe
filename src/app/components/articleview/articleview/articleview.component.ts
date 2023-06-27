import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleOutputDto } from 'src/app/models/article/article-output-dto.model';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-articleview',
  templateUrl: './articleview.component.html',
  styleUrls: ['./articleview.component.css']
})
export class ArticleviewComponent implements OnInit {
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

}
