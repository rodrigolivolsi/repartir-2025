import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoNuevoComponent } from './gasto-nuevo.component';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { IdentificarGrupoPipe } from 'src/app/pipes/identificar-grupo.pipe';

describe('GastoNuevoComponent', () => {
  let component: GastoNuevoComponent;
  let fixture: ComponentFixture<GastoNuevoComponent>;

  beforeEach(async () => {
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [ GastoNuevoComponent, IdentificarGrupoPipe, ],
      imports: [ HttpClientTestingModule ],
      providers: [ {provide: MessageService, useValue: messageServiceSpy}, IdentificarGrupoPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
