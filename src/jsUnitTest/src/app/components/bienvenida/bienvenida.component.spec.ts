import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BienvenidaComponent } from '../../../../../main/frontend/src/app/components/bienvenida/bienvenida.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



describe('BienvenidaComponent', () => {
  let component: BienvenidaComponent;
  let fixture: ComponentFixture<BienvenidaComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BienvenidaComponent],
      imports: [FormsModule, DialogModule, ButtonModule,BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería deshabilitar el botón "Iniciar" si el nombre está vacío', () => {
    component.nombre = '';
    fixture.detectChanges();

    const iniciarButton = fixture.debugElement.query(By.css('#iniciarBienvenidaButton button')).nativeElement;

    expect(iniciarButton.disabled).toBeTrue();
  });

  it('debería habilitar el botón "Iniciar" si el nombre existe', () => {
    component.nombre = 'Juan Pérez';
    fixture.detectChanges();

    const iniciarButton = fixture.debugElement.query(By.css('#iniciarBienvenidaButton button')).nativeElement;

    expect(iniciarButton.disabled).toBeFalse();
  });
});
