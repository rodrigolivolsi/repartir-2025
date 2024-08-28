import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioComponent } from './usuario.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BienvenidaComponent } from '../bienvenida/bienvenida.component';

describe('UsuarioComponent', () => {
  let component: UsuarioComponent;
  let fixture: ComponentFixture<UsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioComponent, BienvenidaComponent ],
      imports: [ HttpClientTestingModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
