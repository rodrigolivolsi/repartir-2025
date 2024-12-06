import { IdentificarGrupoPipe } from '../../../../main/frontend/src/app/pipes/identificar-grupo.pipe';
import { Grupo } from '../../../../main/frontend/src/app/model/grupo';

describe('IdentificarGrupoPipe', () => {

  it('debería devolver un string vacio si el grupo es nulo', () => {
    const pipe = new IdentificarGrupoPipe();
    expect(pipe.transform(null)).toBe('');
  });

  it('debería devolver id y nombre del grupo', () => {
    const pipe = new IdentificarGrupoPipe();
    const grupo : Grupo = {
      nombre: "Grupo de prueba",
      id: 45,
      miembros: ["uno", "dos"]
    };

    let resultado = pipe.transform(grupo); 
    expect(resultado).toContain("#" + grupo.id);
    expect(resultado).toContain(grupo.nombre);
  });
});
