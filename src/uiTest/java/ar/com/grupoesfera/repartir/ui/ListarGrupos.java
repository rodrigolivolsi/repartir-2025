package ar.com.grupoesfera.repartir.ui;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;

import ar.com.grupoesfera.repartir.itest.apiControllers.fixtures.Fixture;

import static ar.com.grupoesfera.repartir.itest.apiControllers.fixtures.Fixture.*;
import static java.util.Arrays.asList;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.*;

public class ListarGrupos extends UITest {

    @Test
    public void cuandoSoloExisteUno() {

        dadoQueExisteSoloElGrupoCampamentoConRocioYMacarena();

        driver.navigate().to(url("/"));
        var iniciarButton = driver.findElement(By.id("iniciarBienvenidaButton"));
        iniciarButton.click();

        var gruposTRs = driver.findElements(By.cssSelector("app-grupos table tbody tr"));
        assertThat(gruposTRs).hasSize(1);

        var campoTDs = gruposTRs.get(0).findElements(By.tagName("td"));
        assertThat(campoTDs.get(0).getText()).isEqualTo("56");
        assertThat(campoTDs.get(1).getText()).isEqualTo("Campamento");
        assertThat(campoTDs.get(2).getText()).isEqualTo("$  4.000,95");
        assertThat(campoTDs.get(3).getText()).contains("rocio","macarena");

    }

    private void dadoQueExisteSoloElGrupoCampamentoConRocioYMacarena() {

        var CAMPAMENTO = Fixture
                .unGrupo()
                .conId(56L)
                .conNombre("Campamento")
                .conMiembros(son("rocio", "macarena"))
                .conTotal($(4000,95))
                .obtener();

        when(gruposService.listarGrupos()).thenReturn(asList(CAMPAMENTO));
    }
}


