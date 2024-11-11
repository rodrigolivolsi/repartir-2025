package ar.com.grupoesfera.repartir.controllers;

import ar.com.grupoesfera.repartir.model.Grupo;
import ar.com.grupoesfera.repartir.services.GruposService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.stream.Stream;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class GruposControllerTest {

    private GruposController controller;

    @Mock
    private GruposService gruposServiceMock;

    @BeforeEach
    public void setUp() {
        controller = new GruposController();
        controller.setGruposService(gruposServiceMock);
    }

    @Test
    @Tag("api")
    public void puedeInstanciarUnControlador() {
        Assertions.assertNotNull(controller);
    }

    @ParameterizedTest
    @Tag("api")
    @NullAndEmptySource
    @MethodSource("gruposProvider")
    public void respondeOkAlListarSiNoOcurreUnaExcepcion(List<Grupo> grupos) {
        when(gruposServiceMock.listarGrupos()).thenReturn(grupos);
        var respuesta = controller.listar();
        Assertions.assertEquals(200, respuesta.getStatusCodeValue());
    }

    static Stream<List<Grupo>> gruposProvider() {
        return Stream.of(List.of(new Grupo()));
    }

    @ParameterizedTest
    @Tag("api")
    @ValueSource(classes = {RuntimeException.class, NullPointerException.class})
    public void respondeInternalServerErrorAlListarSiOcurreCualquierExcepcion(Class<Throwable> throwable) {
        when(gruposServiceMock.listarGrupos()).thenThrow(throwable);
        var respuesta = controller.listar();
        Assertions.assertEquals(500, respuesta.getStatusCodeValue());
    }
}
