package ar.com.grupoesfera.repartir.repositories;

import ar.com.grupoesfera.repartir.itest.fixtures.BaseDeDatosFixture;
import ar.com.grupoesfera.repartir.model.Grupo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static ar.com.grupoesfera.repartir.itest.fixtures.Fixture.*;

@SpringBootTest
@ActiveProfiles("integrationTestWithDB")
class GruposRepositoryTest {

    @Autowired
    GruposRepository repository;

    @Autowired
    BaseDeDatosFixture baseDeDatos;

    @BeforeEach
    public void prepararBaseDeDatos() {

        baseDeDatos.estaVacia();
    }

    @Test
    void persistirCuentaCompartida() {

        Grupo grupo = new Grupo();
        grupo.setNombre("Fin de semana");
        grupo.setMiembros(Arrays.asList("utube", "rsantos", "ogomez"));
        grupo.setTotal(BigDecimal.valueOf(30025,2));

        Grupo grupoGuardado = repository.save(grupo);

        Optional<Grupo> resultado = repository.findById(grupoGuardado.getId());
        
        assertThat(resultado.isPresent()).isTrue();
        Grupo grupoRecuperado = resultado.get();
        assertThat(grupoRecuperado.getId()).isNotNull();
        assertThat(grupoRecuperado.getNombre()).isEqualTo("Fin de semana");
        assertThat(grupoRecuperado.getMiembros()).containsExactly("utube","rsantos","ogomez");
        assertThat(grupoRecuperado.getTotal()).isEqualByComparingTo(BigDecimal.valueOf(30025,2));
    }

    @Test
    void actualizarElTotal() {

        Grupo grupo = new Grupo();
        grupo.setNombre("Almuerzo");
        grupo.setMiembros(son("mariano", "juan"));
        final BigDecimal VALOR_ORIGINAL = $(210,0);
        grupo.setTotal(VALOR_ORIGINAL);
        repository.save(grupo);
        final Long ID = grupo.getId();

        final BigDecimal VALOR_ACTUALIZADO = $(334,10);
        grupo.setTotal(VALOR_ACTUALIZADO);
        repository.save(grupo);

        Optional<Grupo> resultado = repository.findById(ID);
        assertThat(resultado.isPresent()).isTrue();
        assertThat(resultado.get().getTotal()).isEqualByComparingTo(VALOR_ACTUALIZADO);
    }


    @Test
    void alCambiaElTotalDeUnaCuentaCompartidaExistenteYGuardarlaElTotalSeActualiza() {

        final Long ID = dadoQueExisteUnaCuentaConTotalDe210();
        cuandoCambioElTotalPor334_10YLoGuardoParaCuentaConId(ID);
        entoncesQuedaActualizadoElTotalPor334_10ParaCuentaConId(ID);
    }

    private Long dadoQueExisteUnaCuentaConTotalDe210() {

        final var ALGUN_NOMBRE = "Almuerzo";
        final var ALGUNOS_MIEMBROS = son("mariano", "juan");
        final var TOTAL_ORIGINAL = $(210,0);

        Grupo grupo = new Grupo();
        grupo.setNombre(ALGUN_NOMBRE);
        grupo.setMiembros(ALGUNOS_MIEMBROS);
        grupo.setTotal(TOTAL_ORIGINAL);
        repository.save(grupo);
        return grupo.getId();
    }

    private void cuandoCambioElTotalPor334_10YLoGuardoParaCuentaConId(final Long ID) {

        final BigDecimal TOTAL_ACTUALIZADO = $(334,10);

        Grupo grupo = repository.findById(ID).get();
        grupo.setTotal(TOTAL_ACTUALIZADO);
        repository.save(grupo);
    }

    private void entoncesQuedaActualizadoElTotalPor334_10ParaCuentaConId(final Long ID) {

        final var TOTAL_ESPERADO = $(334,10);

        Optional<Grupo> resultado = repository.findById(ID);
        assertThat(resultado.isPresent()).isTrue();
        assertThat(resultado.get().getTotal()).isEqualByComparingTo(TOTAL_ESPERADO);
    }

    @Test
    public void recuperarTodosLosGruposExistentes() {

        baseDeDatos.existenCuatroGrupos();

        List<Grupo> grupos = repository.findAll();

        assertThat(grupos).as("Grupos recuperados").hasSize(4);
    }
}
