import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneAutoriComponent } from './gestione-autori.component';

describe('GestioneAutoriComponent', () => {
  let component: GestioneAutoriComponent;
  let fixture: ComponentFixture<GestioneAutoriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioneAutoriComponent]
    });
    fixture = TestBed.createComponent(GestioneAutoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
