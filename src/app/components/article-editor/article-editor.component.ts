import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { QuillModules } from 'ngx-quill';
import { ArticleInputDto } from 'src/app/models/article/article-input-dto.model';
import { ArticleOutputDto } from 'src/app/models/article/article-output-dto.model';
import { CategoryOutputDto } from 'src/app/models/category/category-output-dto.model';
import { TagInputDto } from 'src/app/models/tag/tag-input-dto.model';
import { TagOutputDto } from 'src/app/models/tag/tag-output-dto.model';
import { ArticleService } from 'src/app/shared/services/article.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { TagService } from 'src/app/shared/services/tag.service';
import Quill from 'quill'
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);
@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit{
  articleForm: FormGroup;
  editorContent: string = '';
  tagFormArray?: FormArray;
  categoryFormArray?: FormArray;
  tags: TagOutputDto[] = [];
  categories: CategoryOutputDto[] = [];
  userId:number = 1;
  newTag: string = '';
  exist:boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private tagService: TagService, private categoryService: CategoryService, private articleService: ArticleService) {
    this.articleForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', Validators.required),
      tags: this.formBuilder.array([]),
      categories: this.formBuilder.array([])
    })
   }

   quillTitle: QuillModules ={
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }]
    ],
   }

   quillEditor: QuillModules ={
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'align': [] }],
      ['clean'],
      ['link', 'image'],


    ],
    blotFormatter: { },
   }

  ngOnInit() {
    this.readAllTags();
    this.readAllCategories();
  }

  readAllTags() {
    this.tagService.readAll().subscribe({
      next: (result: TagOutputDto[]) => {
        this.tags = result;
        this.tagFormArray = this.formBuilder.array(
          this.tags.map(() => new FormControl(false))
        );
        this.articleForm.setControl('tags', this.tagFormArray);
      },
      error: (err: any) => {
        console.log("ERRORE", err);
      }
    });
  }

  readAllCategories() {
    this.categoryService.readAll().subscribe({
      next: (categories: CategoryOutputDto[]) => {
        this.categories = categories;
        this.categoryFormArray = this.formBuilder.array(
          this.categories.map(() => new FormControl(false))
        );
        this.articleForm.setControl('categories', this.categoryFormArray);
      },
      error: (err: any) => {
        console.log("ERRORE", err);
      }
    });
  }

  addTag() {
    if (this.newTag) {
      const existingTag = this.tags.find(tag => tag.name.toLowerCase() === this.newTag.toLowerCase());
      if (existingTag) {
        console.log('Il tag esiste già:', existingTag);
        this.exist = true;
        return; //
      }

      const newTag: TagInputDto = {
        name: this.newTag
      };

      this.tagService.create(newTag).subscribe({
        next: (val: TagOutputDto) => {
          console.log('Tag creato:', val);
          window.location.reload();
        },
        error: (error: any) => {
          console.error('Errore Articolo non Valido', error);
        }
      });
    }
  }



  onSubmit() {
    if (this.articleForm?.valid) {
      const selectedTags = this.tags
        .filter((tag, index) => this.tagFormArray?.value[index])
        .map(tag => tag.id);

      const selectedCategories = this.categories
        .filter((category, index) => this.categoryFormArray?.value[index])
        .map(category => category.id);

      const articleInputDto: ArticleInputDto = {
        title: this.articleForm.value.title,
        content: this.articleForm.value.content,
        categories: selectedCategories,
        tags: selectedTags,
        userId: this.userId
      };
      console.log("Selezionati TAG: " + selectedTags);
      console.log("Selezionate CATEGORIE : " + selectedCategories);

      this.articleService.create(articleInputDto).subscribe({
        next: (val: ArticleOutputDto) => {
          console.log('Articolo creato:', val);
          this.successMessage = 'Articolo creato con successo! Andato in revisione.';
          this.errorMessage = ''; // Resetta il messaggio di errore
        },
        error: (error: any) => {
          console.error('Errore Articolo non Valido', error);
          this.errorMessage = 'Errore durante la creazione dell\'articolo.';
          this.successMessage = ''; // Resetta il messaggio di successo
        }
      });
    }
  }


}

