package ar.com.grupoesfera.repartir.exceptions;

public class LimiteDeGastoExcedidoException extends RuntimeException {
    public LimiteDeGastoExcedidoException() {
        //modificar el monto del mensaje de error si se cambia el LIMITE_TOTAL en MontosService
        super("El total del grupo no puede superar $ 100.000");
    }
}
