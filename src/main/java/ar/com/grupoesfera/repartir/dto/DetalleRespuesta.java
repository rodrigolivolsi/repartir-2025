package ar.com.grupoesfera.repartir.dto;

public class DetalleRespuesta<T> {
    private T datos;
    private String mensaje;

    public DetalleRespuesta(T datos, String mensaje) {
        this.datos = datos;
        this.mensaje = mensaje;
    }

    public T getDatos() {
        return datos;
    }

    public void setDatos(T datos) {
        this.datos = datos;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
