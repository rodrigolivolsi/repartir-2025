package ar.com.grupoesfera.repartir.services;

import ar.com.grupoesfera.repartir.model.Gasto;
import ar.com.grupoesfera.repartir.model.Grupo;
import org.springframework.stereotype.Service;
import ar.com.grupoesfera.repartir.exceptions.LimiteDeGastoExcedidoException;
import ar.com.grupoesfera.repartir.config.LimitesDeGrupo;

import java.math.BigDecimal;

@Service
public class MontosService {

    public void inicializarTotal(Grupo grupo) {

        grupo.setTotal(BigDecimal.valueOf(0,2));
    }

    public void acumularAlTotal(Grupo grupo, Gasto gasto) {

        BigDecimal total = grupo.getTotal();
        BigDecimal nuevoTotal = total.add(gasto.getMonto());
        //utilizo la constante de LIMITE_TOTAL para ver si fue superado
        //si el nuevo total es mayor al limite, lanzo la excepcion
        if (nuevoTotal.compareTo(LimitesDeGrupo.LIMITE_TOTAL) > 0) {
            throw new LimiteDeGastoExcedidoException();
        
    }
    grupo.setTotal(nuevoTotal);
    }
}
