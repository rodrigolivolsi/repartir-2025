package ar.com.grupoesfera.repartir.exceptions;

public class LimiteDeGastoExcedidoException extends RuntimeException {
    public LimiteDeGastoExcedidoException() {
        super("El total del grupo no puede superar $ 10.000,00");
    }
}
