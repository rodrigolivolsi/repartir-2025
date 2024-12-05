package ar.com.grupoesfera.repartir.itest.apiControllers.fixtures;

import ar.com.grupoesfera.repartir.model.Usuario;

public class UsuariosFixture extends Fixture {

    public final Usuario FACUNDO = unUsuario()
            .conId("facundo")
            .conCorreo("facundo@repartir.com.ar")
            .obtener();
}
