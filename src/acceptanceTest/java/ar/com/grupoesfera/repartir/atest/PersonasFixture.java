package ar.com.grupoesfera.repartir.atest;

import ar.com.grupoesfera.repartir.clients.PersonasClient;
import feign.Contract;
import feign.Feign;
import feign.codec.Decoder;
import feign.codec.Encoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.FeignClientsConfiguration;
import org.springframework.context.annotation.*;
import org.testcontainers.containers.BindMode;
import org.testcontainers.containers.GenericContainer;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Configuration
@Profile("acceptanceTest")
@Import(FeignClientsConfiguration.class)
public class PersonasFixture {

    private Logger logger = LoggerFactory.getLogger(PersonasFixture.class);

    private final GenericContainer<?> personasServer = new GenericContainer<>("wiremock/wiremock:2.32.0-1")
            .withExposedPorts(8080)
            .withClasspathResourceMapping("wiremock", "/home/wiremock", BindMode.READ_ONLY)
            .withCommand("-global-response-templating");

    @PostConstruct
    public void iniciar() {

        personasServer.start();

    }

    @Bean(name = "fixedPersonasClient")
    @Primary
    @Autowired
    public PersonasClient personasClient(Encoder encoder, Decoder decoder, Contract contract) {

        String url = "http://" + personasServer.getHost() + ":" + personasServer.getMappedPort(8080);
        logger.info("Personas Mock Server Started: {}", url);

        return Feign.builder()
                    .contract(contract)
                    .encoder(encoder)
                    .decoder(decoder)
                    .target(PersonasClient.class, url);
    }

    @PreDestroy
    public void terminar() {

        personasServer.stop();
    }
}