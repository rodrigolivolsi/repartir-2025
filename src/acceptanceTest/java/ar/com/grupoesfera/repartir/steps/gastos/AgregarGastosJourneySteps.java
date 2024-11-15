package ar.com.grupoesfera.repartir.steps.gastos;

import ar.com.grupoesfera.repartir.steps.CucumberSteps;
import ar.com.grupoesfera.repartir.steps.Step;

import org.junit.jupiter.api.DisplayName;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated;

@DisplayName("Agregar Gastos")
public class AgregarGastosJourneySteps extends CucumberSteps {
    @Step("el usuario agrega un gasto de ${string} al grupo #{string}")
    public void elUsuarioIniciaLaAplicacion(String gasto,String grupoId) {
        var wait = new WebDriverWait(driver, 2);
        var agregarGastoButton = wait.until(visibilityOfElementLocated(By.id("agregarGastoGruposButton-" + grupoId)));
        agregarGastoButton.click();

        var montoInput = driver.findElement(By.id("montoGastoNuevoInput"));
        montoInput.clear();
        montoInput.sendKeys(gasto);


        var aceptarGastoButton = driver.findElement(By.id("guardarGastoNuevoButton"));
        aceptarGastoButton.click();
    }
}
