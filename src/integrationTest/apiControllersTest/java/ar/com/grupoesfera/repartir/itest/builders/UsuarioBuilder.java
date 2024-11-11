package ar.com.grupoesfera.repartir.itest.builders;

import ar.com.grupoesfera.repartir.model.Usuario;

public class UsuarioBuilder {

    private Usuario unUsuario = new Usuario();

    public UsuarioBuilder conId(String id) {
        unUsuario.setId(id);
        return this;
    }

    public UsuarioBuilder conCorreo(String correo) {
        unUsuario.setCorreo(correo);
        return this;
    }

    public Usuario obtener() {
        return unUsuario;
    }
}
