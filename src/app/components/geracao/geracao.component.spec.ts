import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeracaoComponent } from './geracao.component';

describe('GeracaoComponent', () => {
  let component: GeracaoComponent;
  let fixture: ComponentFixture<GeracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
