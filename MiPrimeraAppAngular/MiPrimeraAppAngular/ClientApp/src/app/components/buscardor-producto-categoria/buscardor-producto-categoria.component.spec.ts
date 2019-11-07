import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscardorProductoCategoriaComponent } from './buscardor-producto-categoria.component';

describe('BuscardorProductoCategoriaComponent', () => {
  let component: BuscardorProductoCategoriaComponent;
  let fixture: ComponentFixture<BuscardorProductoCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscardorProductoCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscardorProductoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
