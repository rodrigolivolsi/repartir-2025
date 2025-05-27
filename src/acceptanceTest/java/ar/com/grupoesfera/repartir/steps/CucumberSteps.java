package ar.com.grupoesfera.repartir.steps;

import ar.com.grupoesfera.repartir.atest.BaseDeDatosFixture;
import io.cucumber.spring.CucumberContextConfiguration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.openqa.selenium.support.ui.ExpectedConditions.textToBePresentInElement;
import static org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated;

@CucumberContextConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("acceptanceTest")
public abstract class CucumberSteps {

    @LocalServerPort
    int randomServerPort;

    @Autowired
    protected WebDriver driver;

    @Autowired
    protected BaseDeDatosFixture baseDeDatos;

    protected String url(String path) {

        return "http://localhost:" + randomServerPort + path;
    }

    public void shouldShowAnError(String message) {

        var wait = new WebDriverWait(driver, Duration.of(2, ChronoUnit.SECONDS));
        var mensajesToast = wait.withMessage("Mostro Toast")
                .until(visibilityOfElementLocated(By.id("mensajesToast")));
        wait.withMessage("Título del Toast es 'Error'")
                .until(textToBePresentInElement(mensajesToast, "Error"));
        assertThat(mensajesToast.getText())
                .as("Descripción del Toast")
                .contains(message);
    }
}
