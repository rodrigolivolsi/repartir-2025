package ar.com.grupoesfera.repartir.steps.grupos;

import ar.com.grupoesfera.repartir.steps.CucumberSteps;
import ar.com.grupoesfera.repartir.steps.Step;

import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.DisplayName;
import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.List;
import java.time.Duration;
import java.time.temporal.ChronoUnit;

import static org.assertj.core.api.Assertions.*;

@DisplayName("Crear Grupo")
public class CrearGrupoJourneySteps extends CucumberSteps {

    @Step("el usuario inicia la aplicación")
    public void elUsuarioIniciaLaAplicacion() {

        driver.navigate().to(url("/"));
        driver.findElement(By.id("usuarioInput")).sendKeys("julian");
        var iniciarButton = driver.findElement(By.id("iniciarBienvenidaButton"));
        iniciarButton.click();
    }

    @Step("se muestra {int}° el grupo {string} con total {string}")
    public void seMuestraElNuevoGrupo(int posicion, String nombre, String total) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.of(30, ChronoUnit.SECONDS));
        WebElement fila = wait.until(driver -> {
            List<WebElement> filas = driver.findElements(By.cssSelector("app-grupos table tr"));
            for (WebElement f : filas) {
                try {
                    List<WebElement> columnas = f.findElements(By.tagName("td"));
                    if (columnas.size() > 2 &&
                            columnas.get(1).getText().equals(nombre) &&
                            columnas.get(2).getText().equals(total)) {
                        return f;
                    }
                } catch (StaleElementReferenceException ignored) {

                }
            }
            return null;
        });

        assertThat(fila).isNotNull();
    }

    private @NotNull List<WebElement> obtenerGrupo() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.of(30, ChronoUnit.SECONDS));
        var grupoTR = wait.until(
                ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector("app-grupos table tr")));
        assertThat(grupoTR).hasSizeGreaterThan(1);
        return grupoTR;
    }

}
