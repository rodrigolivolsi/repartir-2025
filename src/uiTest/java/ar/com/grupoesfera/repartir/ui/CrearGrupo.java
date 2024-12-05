package ar.com.grupoesfera.repartir.ui;

import ar.com.grupoesfera.repartir.exceptions.GrupoInvalidoException;
import ar.com.grupoesfera.repartir.model.Grupo;
import ar.com.grupoesfera.repartir.pages.GruposPage;
import org.junit.jupiter.api.Test;

import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

public class CrearGrupo extends UITest {

    @Test
    public void tieneExitoParaElAfterOfficeConTresPersonas() {

        dadoQueSePuedeCrearUnGrupoConTresPersonas();

        GruposPage gruposPage = new GruposPage(this);
        gruposPage.ir();

        gruposPage.clickEnCrear();
        gruposPage.tipearNombre("After Office");
        gruposPage.tipearMiembro("pablo")
                  .tipearMiembro("maria")
                  .tipearMiembro("roberto");
        gruposPage.clickEnGuardar();

        var notificacion = gruposPage.leerNotificacionExito();
        assertThat(notificacion).contains("Éxito", "Grupo '#10 null' creado");

        comprobarQueSeRecibieronLosDatosDelGrupo("After Office", "pablo", "maria", "roberto");
    }

    private void dadoQueSePuedeCrearUnGrupoConTresPersonas() {

        when(gruposService.crear(any(Grupo.class))).thenReturn(new Grupo(10));
    }

    private void comprobarQueSeRecibieronLosDatosDelGrupo(String nombre, String... miembros) {

        verify(gruposService).crear(argThat(grupo ->
                (grupo.getNombre().equals(nombre)) &&
                (grupo.getMiembros().containsAll(asList(miembros)))));
    }

    @Test
    public void fallaParaLaCenaDeUnaPersona() {

        dadoQueSePuedeCrearUnGrupoParaUnaPersona();

        GruposPage gruposPage = new GruposPage(this);
        gruposPage.ir();

        gruposPage.clickEnCrear();
        gruposPage.tipearNombre("Cena");
        gruposPage.tipearMiembro("luis");
        gruposPage.clickEnGuardar();

        var notificacion = gruposPage.leerNotificacionError();
        assertThat(notificacion)
                .as("La notificación debe contener texto")
                .isNotBlank();

        comprobarQueSeRecibieronLosDatosDelGrupo("Cena", "luis");
    }

    private void dadoQueSePuedeCrearUnGrupoParaUnaPersona() {

        when(gruposService.crear(any(Grupo.class))).thenThrow(new GrupoInvalidoException(GrupoInvalidoException.CodigoError.MIEMBROS_INSUFICIENTES));
    }

}
