import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaDadosComponent } from './entrada-dados.component';

describe('EntradaDadosComponent', () => {
  let component: EntradaDadosComponent;
  let fixture: ComponentFixture<EntradaDadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaDadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
