package ar.com.grupoesfera.repartir.dto;

public class Respuesta<Grupo> {
    private Grupo grupo;
    private String mensaje;

    public Respuesta(Grupo grupo, String mensaje) {
        this.grupo = grupo;
        this.mensaje = mensaje;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo datos) {
        this.grupo = datos;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
