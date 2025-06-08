package ar.com.grupoesfera.repartir.exceptions;

import ar.com.grupoesfera.repartir.config.LimitesDeGrupo;
import java.text.NumberFormat;
import java.util.Locale;

public class LimiteDeGastoExcedidoException extends RuntimeException {
    public LimiteDeGastoExcedidoException() {
        //formateo el numero de separador de miles, igual que en el feature y uso la constante de LIMITE_TOTAL
        super("El total del grupo no puede superar $ " + 
              NumberFormat.getInstance(new Locale("es", "AR")).format(LimitesDeGrupo.LIMITE_TOTAL));
    }
}
