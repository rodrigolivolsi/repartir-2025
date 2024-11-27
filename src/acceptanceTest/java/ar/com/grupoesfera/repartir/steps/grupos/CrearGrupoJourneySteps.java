package ar.com.grupoesfera.repartir.steps.grupos;

import ar.com.grupoesfera.repartir.steps.CucumberSteps;
import ar.com.grupoesfera.repartir.steps.Step;

import org.junit.jupiter.api.DisplayName;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.List;
import java.time.Duration;
import java.time.temporal.ChronoUnit;

import static org.openqa.selenium.support.ui.ExpectedConditions.*;
import static org.assertj.core.api.Assertions.*;

@DisplayName("Crear Grupo")
public class CrearGrupoJourneySteps extends CucumberSteps {

    @Step("el usuario inicia la aplicación")
    public void elUsuarioIniciaLaAplicacion() {

        driver.navigate().to(url("/"));
        var iniciarButton = driver.findElement(By.id("iniciarBienvenidaButton"));
        iniciarButton.click();
    }

    @Step("se muestra {int}° el grupo {string} con total {string}")
    public void seMuestraElNuevoGrupo(int posicion, String nombre, String total) {
        var wait = new WebDriverWait(driver, Duration.of(2, ChronoUnit.SECONDS));

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("mensajesToast")));

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("app-grupos table")));

        List<WebElement> grupoTR = wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(By.cssSelector("app-grupos table tr"), posicion));
        assertThat(grupoTR).hasSizeGreaterThan(posicion);

        WebElement fila = grupoTR.get(posicion);
        List<WebElement> campoTDs = wait.until(ExpectedConditions.visibilityOfAllElements(fila.findElements(By.tagName("td"))));

        assertThat(campoTDs.get(0).getText()).isNotEmpty();
        assertThat(campoTDs.get(1).getText()).isEqualTo(nombre);
        assertThat(campoTDs.get(2).getText()).isEqualTo(total);
    }

}
