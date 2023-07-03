import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleOutputDto } from 'src/app/models/article/article-output-dto.model';
import { ValidationInputDto } from 'src/app/models/validation/validation-input-dto.model';
import { ValidationOutputDto } from 'src/app/models/validation/validation-output.dto.model';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  createValidation: FormGroup;
  previewLength: number = 150;
  articles: ArticleOutputDto[] = [];
  validations?: ValidationOutputDto;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private articleService:ArticleService, private router:Router,private builder:FormBuilder, private validationService: ValidationService) {
    this.createValidation = builder.group ({
      title: new FormControl(''),
      content: new FormControl('')
    })
  }

  ngOnInit() {
    this.readAllArticles();
    this.getValidations();
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
  getValidations() {
    this.validationService.getValidationAdmin().subscribe(
      (result: ValidationOutputDto) => {
        this.validations = result;
      },
      (error: any) => {
        console.log('Errore recupero validazioni', error);
      }
    );
  }


  viewFullArticle(articleId: number) {
    this.router.navigateByUrl('/revisione/' + articleId);
  }

  save() {
  let validation: ValidationInputDto = {
    maxTitleLength: this.createValidation.controls['title'].value,
    maxContentLength: this.createValidation.controls['content'].value
  };

  this.validationService.update(validation).subscribe(
    {
      next: () => {
        this.createValidation.reset();
        this.successMessage = 'Validazione creata con successo!';
        this.errorMessage = '';

        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
        this.getValidations();

      },
      error: err => {
        console.log(err);
        this.successMessage = '';
        this.errorMessage = 'Errore creazione validazione, rivedere i parametri inseriti!';
      }
    }
  );
}


}
