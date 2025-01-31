package ar.com.grupoesfera.repartir.steps.grupos;

import ar.com.grupoesfera.repartir.steps.CucumberSteps;
import io.cucumber.java.es.Cuando;
import io.cucumber.java.es.Entonces;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.assertj.core.api.Assertions.assertThat;
import static org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.junit.jupiter.api.DisplayName;

@DisplayName("Estado Inicial")
public class EstadoInicialSteps extends CucumberSteps {

    @Cuando("el usuario crea un grupo")
    public void elUsuarioCreaUnGrupo() {

        var crearGruposButton = driver.findElement(By.id("crearGruposButton"));
        crearGruposButton.click();

        driver.findElement(By.id("nombreGrupoNuevoInput")).sendKeys("Almuerzo del equipo");

        var miembrosInput = driver.findElement(By.id("miembrosGrupoNuevoInput"));
        miembrosInput.sendKeys("Guido");
        miembrosInput.sendKeys(Keys.ENTER);
        miembrosInput.sendKeys("Laura");
        miembrosInput.sendKeys(Keys.ENTER);
        miembrosInput.sendKeys("Mariano");
        miembrosInput.sendKeys(Keys.ENTER);
        miembrosInput.sendKeys("Juan Cruz");
        miembrosInput.sendKeys(Keys.ENTER);

        driver.findElement(By.id("guardarGrupoNuevoButton")).click();

        var wait = new WebDriverWait(driver, Duration.of(2, ChronoUnit.SECONDS));
        wait.until(visibilityOfElementLocated(By.id("mensajesToast")));
    }

    @Entonces("debería visualiza dentro del listado el grupo creado con total {string}")
    public void deberiaVisualizaDentroDelListadoElGrupoCreadoConTotal$(String monto) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        List<WebElement> grupoTR = wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(
            By.cssSelector("app-grupos table tr"), 1));

        List<WebElement> campoTDs = grupoTR.get(1).findElements(By.tagName("td"));

        assertThat(campoTDs.get(0).getText()).isNotEmpty();
        assertThat(campoTDs.get(2).getText()).isEqualTo(monto);
    }
}
