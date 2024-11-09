package ar.com.grupoesfera.repartir.steps.grupos;

import ar.com.grupoesfera.repartir.steps.CucumberSteps;
import ar.com.grupoesfera.repartir.steps.Step;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.openqa.selenium.support.ui.ExpectedConditions.*;
import static org.assertj.core.api.Assertions.*;

public class CrearGrupoJourneySteps extends CucumberSteps {

    @Step("el usuario inicia la aplicación")
    public void elUsuarioIniciaLaAplicacion() {

        driver.navigate().to(url("/"));
        var iniciarButton = driver.findElement(By.id("iniciarBienvenidaButton"));
        iniciarButton.click();
    }

    @Step("se muestra {int}° el grupo {string} con total {string}")
    public void seMuestraElNuevoGrupo(int posicion, String nombre, String total) {

        var wait = new WebDriverWait(driver, 2);
        wait.until(visibilityOfElementLocated(By.id("mensajesToast")));

        var grupoTR = driver.findElements(By.cssSelector("app-grupos table tr"));
        assertThat(grupoTR).hasSizeGreaterThan(posicion);

        var campoTDs = grupoTR.get(posicion).findElements(By.tagName("td"));
        assertThat(campoTDs.get(0).getText()).isNotEmpty();
        assertThat(campoTDs.get(1).getText()).isEqualTo(nombre);
        assertThat(campoTDs.get(2).getText()).isEqualTo(total);
    }
}
