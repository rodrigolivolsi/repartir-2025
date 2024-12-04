package ar.com.grupoesfera.repartir;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("integrationTestWithControllers")
class RepartirApplicationControllerTests {

	@Test
	void cargaElContextoDeSpringSinGenerarExcepciones() {
	}
}
