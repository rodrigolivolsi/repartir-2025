import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { GrupoNuevoComponent } from '../../../../../main/frontend/src/app/components/grupo-nuevo/grupo-nuevo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { IdentificarGrupoPipe } from '../../../../../main/frontend/src/app/pipes/identificar-grupo.pipe';
import { GrupoService } from '../../../../../main/frontend/src/app/services/grupo.service';
import { of } from 'rxjs';
import { Grupo } from '../../../../../main/frontend/src/app/model/grupo';
import { By } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { ChipModule } from 'primeng/chip';
import { Dialog, DialogModule } from 'primeng/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('GrupoNuevoComponent', () => {
  let component: GrupoNuevoComponent;
  let fixture: ComponentFixture<GrupoNuevoComponent>;
  let grupoServiceSpy: GrupoService;

  beforeEach(async () => {
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    grupoServiceSpy = jasmine.createSpyObj('GrupoService', ['crear']);

    await TestBed.configureTestingModule({
      declarations: [ GrupoNuevoComponent, IdentificarGrupoPipe],
      imports: [ HttpClientTestingModule, FormsModule, ButtonModule, ChipsModule, ChipModule, DialogModule, NoopAnimationsModule ],
      providers: [ 
        { provide: MessageService, useValue: messageServiceSpy }, 
        IdentificarGrupoPipe,
        { provide: GrupoService, useValue: grupoServiceSpy } 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('debe crear un grupo', () => {

    const NUEVO_GRUPO: Grupo = { id: 1, miembros: ['Luis','Pablo'], nombre: 'Fiesta' }
    grupoServiceSpy.crear = jasmine.createSpy().and.returnValue(of(NUEVO_GRUPO));

    component.nombre = NUEVO_GRUPO.nombre;
    component.miembros = NUEVO_GRUPO.miembros;
    component.guardar();

    expect(grupoServiceSpy.crear).toHaveBeenCalledWith(NUEVO_GRUPO.nombre, NUEVO_GRUPO.miembros);
  });

  it('debe crear un grupo usando la interfaz grafica', () => {

    const NUEVO_GRUPO: Grupo = { id: 1, miembros: ['Luis','Pablo'], nombre: 'Fiesta' }
    grupoServiceSpy.crear = jasmine.createSpy().and.returnValue(of(NUEVO_GRUPO));

    component.mostrar = true;
    fixture.detectChanges();    

    let inputNombre = fixture.debugElement.query(By.css("#nombreGrupoNuevoInput")).nativeElement;
    inputNombre.value = NUEVO_GRUPO.nombre;
    inputNombre.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    component.miembros = NUEVO_GRUPO.miembros;

    fixture.debugElement.query(By.css("#guardarGrupoNuevoButton button")).nativeElement.click();

    expect(grupoServiceSpy.crear).toHaveBeenCalledWith(NUEVO_GRUPO.nombre, NUEVO_GRUPO.miembros);    

  });
});
