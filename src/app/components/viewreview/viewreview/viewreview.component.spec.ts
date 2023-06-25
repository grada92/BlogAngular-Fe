import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewreviewComponent } from './viewreview.component';

describe('ViewreviewComponent', () => {
  let component: ViewreviewComponent;
  let fixture: ComponentFixture<ViewreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewreviewComponent]
    });
    fixture = TestBed.createComponent(ViewreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
