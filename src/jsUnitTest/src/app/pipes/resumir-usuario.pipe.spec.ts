import { Usuario } from '../../../../main/frontend/src/app/model/usuario';
import { ResumirUsuarioPipe } from '../../../../main/frontend/src/app/pipes/resumir-usuario.pipe';

describe('ResumirUsuarioPipe', () => {
  
  it('debería devolver un string vacio si el usuario es nulo', () => {
    const pipe = new ResumirUsuarioPipe();
    expect(pipe.transform(null)).toBe('');
  });

  it('debería devolver id y nombre del grupo', () => {
    const pipe = new ResumirUsuarioPipe();
    const usuario : Usuario = {
      id: "23",
      correo: "usuario@test.com"
    };

    let resultado = pipe.transform(usuario); 
    expect(resultado).toContain(usuario.id);
    expect(resultado).toContain(usuario.correo);
  });

});
