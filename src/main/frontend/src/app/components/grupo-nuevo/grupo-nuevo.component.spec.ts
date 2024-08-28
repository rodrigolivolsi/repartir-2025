import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoNuevoComponent } from './grupo-nuevo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { IdentificarGrupoPipe } from 'src/app/pipes/identificar-grupo.pipe';

describe('GrupoNuevoComponent', () => {
  let component: GrupoNuevoComponent;
  let fixture: ComponentFixture<GrupoNuevoComponent>;

  beforeEach(async () => {
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [ GrupoNuevoComponent, IdentificarGrupoPipe ],
      imports: [ HttpClientTestingModule ],
      providers: [ {provide: MessageService, useValue: messageServiceSpy}, IdentificarGrupoPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
