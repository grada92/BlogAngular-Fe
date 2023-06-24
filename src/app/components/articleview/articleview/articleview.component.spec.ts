import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleviewComponent } from './articleview.component';

describe('ArticleviewComponent', () => {
  let component: ArticleviewComponent;
  let fixture: ComponentFixture<ArticleviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleviewComponent]
    });
    fixture = TestBed.createComponent(ArticleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
