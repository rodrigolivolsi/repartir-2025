package ar.com.grupoesfera.repartir.steps;

import ar.com.grupoesfera.repartir.repositories.GruposRepository;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.openqa.selenium.support.ui.ExpectedConditions.*;

public class ExpenseSteps extends CucumberSteps {

    String groupName = "Grupo inicial";
    String groupId = "2000";

    @Given("a group with 2500 total")
    public void a_new_group() {
        baseDeDatos.existeUnUnicoGrupo();
        userLoggedIn();
    }

    @When("adding an expense for {int}")
    public void adding_an_expense_for(Integer expense) {
        userAddsAnExpense(expense.toString());
    }
    @Then("group expenses should total {string}")
    public void group_expenses_should_total(String total) {
        groupIsShownWithTotal(groupName,total);
    }

    private void userLoggedIn(){
        driver.navigate().to(url("/"));

        var wait = new WebDriverWait(driver, Duration.of(2, ChronoUnit.SECONDS));
        wait.until(visibilityOfElementLocated(By.id("iniciarDialog")));

        driver.findElement(By.id("usuarioInput")).sendKeys("julian");
        var iniciarButton = driver.findElement(By.id("iniciarBienvenidaButton"));
        iniciarButton.click();

        wait.until(invisibilityOfElementLocated(By.id("iniciarDialog")));
    }

    private void userAddsAnExpense(String amount) {
        var wait = new WebDriverWait(driver, Duration.of(2, ChronoUnit.SECONDS));
        var agregarGastoButton = wait.until(visibilityOfElementLocated(By.id("agregarGastoGruposButton-" + groupId)));
        agregarGastoButton.click();

        var montoInput = driver.findElement(By.id("montoGastoNuevoInput"));
        montoInput.clear();
        montoInput.sendKeys(amount);


        var aceptarGastoButton = driver.findElement(By.id("guardarGastoNuevoButton"));
        aceptarGastoButton.click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("mensajesToast")));
    }

    private void groupIsShownWithTotal(String nombre, String total) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.of(30, ChronoUnit.SECONDS));
        WebElement fila = wait.until(driver -> {
            List<WebElement> filas = driver.findElements(By.cssSelector("app-grupos table tr"));
            for (WebElement f : filas) {
                try {
                    List<WebElement> columnas = f.findElements(By.tagName("td"));
                    if (columnas.size() > 2 &&
                            columnas.get(1).getText().equals(nombre) &&
                            columnas.get(2).getText().contains(total)) {
                        return f;
                    }
                } catch (StaleElementReferenceException ignored) {

                }
            }
            return null;
        });

        assertThat(fila).isNotNull();
    }
}
