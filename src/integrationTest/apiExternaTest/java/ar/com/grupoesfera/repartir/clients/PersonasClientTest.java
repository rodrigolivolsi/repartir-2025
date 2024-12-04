package ar.com.grupoesfera.repartir.clients;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.openfeign.FeignClientsConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.containers.BindMode;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import feign.Contract;
import feign.Feign;
import feign.codec.Decoder;
import feign.codec.Encoder;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("integrationTestWithApiExterna")
@Testcontainers
@Import(FeignClientsConfiguration.class)
class PersonasClientTest {

    @Container
    private final GenericContainer<?> personasServer = new GenericContainer<>("wiremock/wiremock:2.32.0-1")
            .withExposedPorts(8080)
            .withClasspathResourceMapping("wiremock", "/home/wiremock", BindMode.READ_ONLY);

    Feign.Builder builder;
    PersonasClient personasClient;

    @Autowired
    public PersonasClientTest(Encoder encoder, Decoder decoder, Contract contract) {

        builder = Feign.builder()
                .contract(contract)
                .encoder(encoder)
                .decoder(decoder);
    }

    @BeforeEach
    public void configurarCliente() {
        personasClient = builder.target(PersonasClient.class, construirUrl());
    }

    @Test @Tag("api")
    void recuperarDevuelveUnaPersonaExistente() {

        Persona persona = personasClient.recuperarPorId("mariela");

        assertThat(persona.getId()).isEqualTo("mariela");
        assertThat(persona.getNombre()).isEqualTo("Mariela Rios");
        assertThat(persona.getCorreo()).isEqualTo("mariela@repartir.com");
        assertThat(persona.getDocumento()).isEqualTo("47345624");
    }

    private String construirUrl() {
        StringBuilder builder = new StringBuilder();
        return builder.append("http://")
                .append(personasServer.getHost())
                .append(":")
                .append(personasServer.getMappedPort(8080))
                .toString();
    }
}
