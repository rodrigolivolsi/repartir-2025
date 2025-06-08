package ar.com.grupoesfera.repartir.config;

import java.math.BigDecimal;

//constante que define el limite total del grupo
//se utiliza en la validacion de gastos y en la excepción de limite excedido
//solo cambiar aca el valor del limite total si se desea modificar el limite
public class LimitesDeGrupo {
    public static final BigDecimal LIMITE_TOTAL = new BigDecimal("100000");
}