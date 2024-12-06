import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoNuevoComponent } from '../../../../../main/frontend/src/app/components/gasto-nuevo/gasto-nuevo.component'
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { IdentificarGrupoPipe } from '../../../../../main/frontend/src/app/pipes/identificar-grupo.pipe';
import { Grupo } from '../../../../../main/frontend/src/app/model/grupo';
import { GrupoService } from '../../../../../main/frontend/src/app/services/grupo.service';
import { of, throwError } from 'rxjs';

describe('GastoNuevoComponent', () => {
  let component: GastoNuevoComponent;
  let fixture: ComponentFixture<GastoNuevoComponent>;
  const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
  const grupoService = jasmine.createSpyObj('GrupoService', ['agregarGasto']);

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ GastoNuevoComponent, IdentificarGrupoPipe, ],
      imports: [ HttpClientTestingModule ],
      providers: [ {provide: MessageService, useValue: messageServiceSpy}, IdentificarGrupoPipe , {provide: GrupoService, useValue: grupoService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const GRUPO_SIN_GASTOS: Grupo = {
    id: 1,
    miembros: ['lucas','patricia'],
    nombre: 'Fiesta de fin de año',
    total: 0.0
  }

  it('debería permanecer oculto cuando es creado', () => {
    const componente = TestBed.createComponent(GastoNuevoComponent).componentInstance;
    expect(componente.mostrar).toBeFalse();
  });

  it('debería inicializar el monto en $0,00', () => {
    component.iniciarPara(GRUPO_SIN_GASTOS);
    expect(component.monto).toBe(0);
  });

  it('debería permanecer visible cuando es iniciado', () => {
    component.iniciarPara(GRUPO_SIN_GASTOS);
    expect(component.mostrar).toBeTrue()
  });

  it('debería notificar que el gasto fue agregado exitosamente', () => {
    grupoService.agregarGasto.and.returnValue(of({}));
    component.iniciarPara(GRUPO_SIN_GASTOS);
    component.guardar();
    expect(messageServiceSpy.add).toHaveBeenCalledWith(jasmine.objectContaining({severity: 'success'}));
  });

  it('debería notificar que ocurrió un error al guardar el gasto', () => {
    grupoService.agregarGasto.and.returnValue(throwError(() => new Error('Error al guardar el gasto')));
    component.iniciarPara(GRUPO_SIN_GASTOS);
    component.guardar();
    expect(messageServiceSpy.add).toHaveBeenCalledWith(jasmine.objectContaining({severity: 'error'}));
  })
});