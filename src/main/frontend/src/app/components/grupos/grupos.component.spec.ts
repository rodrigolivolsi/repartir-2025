import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposComponent } from './grupos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { GrupoNuevoComponent } from '../grupo-nuevo/grupo-nuevo.component';
import { GastoNuevoComponent } from '../gasto-nuevo/gasto-nuevo.component';
import { IdentificarGrupoPipe } from 'src/app/pipes/identificar-grupo.pipe';

describe('GruposComponent', () => {
  let component: GruposComponent;
  let fixture: ComponentFixture<GruposComponent>;

  beforeEach(async () => {
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [ GruposComponent, GrupoNuevoComponent, GastoNuevoComponent, IdentificarGrupoPipe, ],
      imports: [ HttpClientTestingModule ],
      providers: [ {provide: MessageService, useValue: messageServiceSpy}, IdentificarGrupoPipe,],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
