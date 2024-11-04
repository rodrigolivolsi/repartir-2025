package ar.com.grupoesfera.repartir.controllers;

import ar.com.grupoesfera.repartir.itest.fixtures.UsuariosFixture;
import ar.com.grupoesfera.repartir.model.Usuario;
import ar.com.grupoesfera.repartir.services.UsuariosService;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.given;
import static net.javacrumbs.jsonunit.JsonMatchers.jsonEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("integrationTestWithPersonas")
class UsuariosControllerIntegrationTest {

    @LocalServerPort
    int randomServerPort;

    @MockBean
    UsuariosService usuariosService;

    final UsuariosFixture USUARIOS = new UsuariosFixture();

    @Test
    void obtenerUsuarioExistente() {

        existeElUsuario("facundo", USUARIOS.FACUNDO);

        given()
                .accept(ContentType.JSON)
                .port(randomServerPort)
                .contentType(ContentType.JSON)
                .when()
                .get("/api/usuarios/facundo")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body(jsonEquals("""
                        {
                            "id": "facundo",
                            "correo": "facundo@repartir.com.ar"
                        }
                        """));
    }

    private void existeElUsuario(String id, Usuario usuario) {

        when(usuariosService.recuperar("facundo")).thenReturn(USUARIOS.FACUNDO);
    }
}
