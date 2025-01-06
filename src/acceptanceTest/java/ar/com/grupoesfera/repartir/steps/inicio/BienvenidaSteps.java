package ar.com.grupoesfera.repartir.steps.inicio;

import ar.com.grupoesfera.repartir.steps.CucumberSteps;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.java.es.Dado;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.assertj.core.api.Assertions.*;
import static org.openqa.selenium.support.ui.ExpectedConditions.*;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

import org.junit.jupiter.api.DisplayName;

@DisplayName("Bienvenida")
public class BienvenidaSteps extends CucumberSteps {

    @Then("el usuario accede a la aplicación")
    public void elUsuarioAccedeALaAplicacion() {

        driver.navigate().to(url("/"));
    }

    @Then("se muestra el mensaje de bienvenida")
    public void seMuestraElMensajeDeBienvenida() {

        var wait = new WebDriverWait(driver, Duration.of(2, ChronoUnit.SECONDS));
        wait.until(invisibilityOfElementWithText(By.tagName("p-dialog"), "Repartir"));
    }

    @Given("que el usuario accedió a la aplicación")
    public void queElUsuarioAccedioALaAplicacion() {

        driver.navigate().to(url("/"));
    }

    @When("decidió iniciar")
    public void decidioIniciar() {
        driver.findElement(By.id("usuarioInput")).sendKeys("julian");
        var iniciarButton = driver.findElement(By.id("iniciarBienvenidaButton"));
        iniciarButton.click();

        var crearGruposButton = driver.findElement(By.cssSelector("#crearGruposButton button"));
        crearGruposButton.click();
    }

    @Then("puede empezar a usarla")
    public void puedeEmpezarAUsarla() {

        var wait = new WebDriverWait(driver, Duration.of(2, ChronoUnit.SECONDS));
        var nuegoGrupoDialog = driver.findElement(By.cssSelector("app-grupo-nuevo"));
        wait.until(textToBePresentInElement(nuegoGrupoDialog, "Nuevo Grupo"));

        assertThat(nuegoGrupoDialog.isDisplayed())
                .as("Dialogo de Nuevo Grupo visible")
                .isTrue();
        assertThat(nuegoGrupoDialog.getText())
                .as("Dialogo de Nuebo Grupo con titulo")
                .contains("Nuevo Grupo");
    }

    @Dado("que el usuario inició Repartir")
    public void elUsuarioInicioRepartir() {

        baseDeDatos.estaVacia();
        driver.navigate().to(url("/"));

        var wait = new WebDriverWait(driver, Duration.of(2, ChronoUnit.SECONDS));
        wait.until(visibilityOfElementLocated(By.id("iniciarDialog")));

        driver.findElement(By.id("usuarioInput")).sendKeys("julian");
        var iniciarButton = driver.findElement(By.id("iniciarBienvenidaButton"));
        iniciarButton.click();

        wait.until(invisibilityOfElementLocated(By.id("iniciarDialog")));
    }

    @Before
    public void prepararBaseDeDatos() {

        baseDeDatos.estaVacia();
    }

}
