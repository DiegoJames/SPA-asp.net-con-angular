import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscardorProductoNombreComponent } from './buscardor-producto-nombre.component';

describe('BuscardorProductoNombreComponent', () => {
  let component: BuscardorProductoNombreComponent;
  let fixture: ComponentFixture<BuscardorProductoNombreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscardorProductoNombreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscardorProductoNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
