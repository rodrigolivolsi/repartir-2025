package ar.com.grupoesfera.repartir.itest.apiControllers;

import ar.com.grupoesfera.repartir.repositories.GruposRepository;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("integrationTestWithControllers")
public class IntegrationTestConfiguration {

    @MockBean
    public GruposRepository gruposRepository;

}
