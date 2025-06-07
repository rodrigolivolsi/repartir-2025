package ar.com.grupoesfera.repartir.services;

import ar.com.grupoesfera.repartir.model.Gasto;
import ar.com.grupoesfera.repartir.model.Grupo;
import org.springframework.stereotype.Service;
import ar.com.grupoesfera.repartir.exceptions.LimiteDeGastoExcedidoException;

import java.math.BigDecimal;

@Service
public class MontosService {

    private static final BigDecimal LIMITE_TOTAL = new BigDecimal("10000.00");

    public void inicializarTotal(Grupo grupo) {

        grupo.setTotal(BigDecimal.valueOf(0,2));
    }

    public void acumularAlTotal(Grupo grupo, Gasto gasto) {

        BigDecimal total = grupo.getTotal();
        BigDecimal nuevoTotal = total.add(gasto.getMonto());
        if (nuevoTotal.compareTo(LIMITE_TOTAL) > 0) {
            throw new LimiteDeGastoExcedidoException();
        
    }
    grupo.setTotal(nuevoTotal);
    }
}
