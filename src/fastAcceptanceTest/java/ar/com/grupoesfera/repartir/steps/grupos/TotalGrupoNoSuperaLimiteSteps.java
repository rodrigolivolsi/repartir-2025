package ar.com.grupoesfera.repartir.steps.grupos;

import ar.com.grupoesfera.repartir.model.Grupo;
import ar.com.grupoesfera.repartir.model.Gasto;
import ar.com.grupoesfera.repartir.services.MontosService;
import ar.com.grupoesfera.repartir.exceptions.LimiteDeGastoExcedidoException;
import io.cucumber.java.es.Dado;
import io.cucumber.java.es.Cuando;
import io.cucumber.java.es.Entonces;
import ar.com.grupoesfera.repartir.config.LimitesDeGrupo;
import java.text.NumberFormat;
import java.util.Locale;
import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.*;

public class TotalGrupoNoSuperaLimiteSteps {

    private Grupo grupo;
    private MontosService montosService = new MontosService();
    private boolean gastoAgregado;
    private String mensajeError;

    @Dado("que el usuario inició Repartir")
    public void que_el_usuario_inicio_repartir() {
        
    }

    @Dado("existe un grupo llamado {string} con un total de $ {double}")
    public void existe_un_grupo_con_total(String nombre, Double total) {
        grupo = new Grupo();
        grupo.setNombre(nombre);
        grupo.setTotal(BigDecimal.valueOf(total));
    }

    @Cuando("el usuario intenta agregar un gasto de $ {double} al grupo")
    public void usuario_intenta_agregar_gasto(Double monto) {
        Gasto gasto = new Gasto();
        gasto.setMonto(BigDecimal.valueOf(monto));
        try {
            montosService.acumularAlTotal(grupo, gasto);
            gastoAgregado = true;
        } catch (LimiteDeGastoExcedidoException e) {
            gastoAgregado = false;
            mensajeError = e.getMessage();
        }
    }

    @Cuando("el usuario agrega un gasto de $ {double} al grupo")
    public void usuario_agrega_gasto(Double monto) {
        Gasto gasto = new Gasto();
        gasto.setMonto(BigDecimal.valueOf(monto));
        try {
            montosService.acumularAlTotal(grupo, gasto);
            gastoAgregado = true;
        } catch (LimiteDeGastoExcedidoException e) {
            gastoAgregado = false;
            mensajeError = e.getMessage();
        }
    }

    @Entonces("no debería agregarse el gasto")
    public void no_deberia_agregarse_el_gasto() {
        assertThat(gastoAgregado).isFalse();
    }

    //verifica que se haya lanzado la excepcion de limite excedido
    //MANUAL: modificar el valor del limite en el feature con separador de miles (ya que es documentacion y especificacion de comportamiento para las pruebas)
    //para que represente el limite configurado en la constante LIMITE_TOTAL
    @Entonces("debería ser informado que el total del grupo no puede superar $ {double}")
    public void deberia_ser_informado_limite(Double limite) {
        String esperado = "El total del grupo no puede superar $ " + 
                          NumberFormat.getInstance(new Locale("es", "AR")).format(LimitesDeGrupo.LIMITE_TOTAL);
        assertThat(mensajeError).isEqualTo(esperado);
    }

    @Entonces("el total del grupo debería ser $ {double}")
    public void total_grupo_deberia_ser(Double esperado) {
        assertThat(grupo.getTotal()).isEqualByComparingTo(BigDecimal.valueOf(esperado));
    }

    @Entonces("el gasto debería agregarse correctamente")
    public void gasto_agregado_correctamente() {
        assertThat(gastoAgregado).isTrue();
    }
}