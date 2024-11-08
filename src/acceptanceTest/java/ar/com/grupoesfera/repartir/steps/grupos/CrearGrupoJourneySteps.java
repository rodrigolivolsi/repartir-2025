package ar.com.grupoesfera.repartir.steps.grupos;

import ar.com.grupoesfera.repartir.steps.CucumberSteps;
import ar.com.grupoesfera.repartir.steps.Step;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

import static org.openqa.selenium.support.ui.ExpectedConditions.*;
import static org.assertj.core.api.Assertions.*;

public class CrearGrupoJourneySteps extends CucumberSteps {

    @Step("no existe ningún grupo")
    public void noExisteNingunGrupo() {

        baseDeDatos.estaVacia();
    }

    @Step("existe un grupo")
    public void existeUnGrupo() {

        baseDeDatos.existeUnUnicoGrupo();
    }

    @Step("el usuario inicia la aplicación")
    public void elUsuarioIniciaLaAplicacion() {

        driver.navigate().to(url("/"));
        var iniciarButton = driver.findElement(By.id("iniciarBienvenidaButton"));
        iniciarButton.click();
    }

    @Step("el usuario selecciona crear grupo")
    public void elUsuarioSeleccionaCrearGrupo() {

        var crearGruposButton = driver.findElement(By.id("crearGruposButton"));
        crearGruposButton.click();
    }

    @Step("completa con el nombre {string}")
    public void completaConElNombre(String nombre) {

        driver.findElement(By.id("nombreGrupoNuevoInput")).sendKeys(nombre);
    }

    @Step("indica que los miembros son {string}, {string} y {string}")
    public void indicaQueLosMiembroSon(String miembro1, String miembro2, String miembro3) {

        var miembrosInput = driver.findElement(By.id("miembrosGrupoNuevoInput"));
        miembrosInput.sendKeys(miembro1);
        miembrosInput.sendKeys(Keys.ENTER);
        miembrosInput.sendKeys(miembro2);
        miembrosInput.sendKeys(Keys.ENTER);
        miembrosInput.sendKeys(miembro3);
        miembrosInput.sendKeys(Keys.ENTER);
    }

    @Step("indica que los miembros son:")
    public void indicaQueLosMiembroSon(List<String> miembros) {

        var miembrosInput = driver.findElement(By.id("miembrosGrupoNuevoInput"));

        for (var miembro : miembros) {
            miembrosInput.sendKeys(miembro);
            miembrosInput.sendKeys(Keys.ENTER);
        }
    }

    @Step("guarda el grupo")
    public void guardaElGrupo() {

        driver.findElement(By.id("guardarGrupoNuevoButton")).click();
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
