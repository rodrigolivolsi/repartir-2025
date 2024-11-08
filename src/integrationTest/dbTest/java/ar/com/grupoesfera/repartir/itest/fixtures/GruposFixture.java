package ar.com.grupoesfera.repartir.itest.fixtures;

import ar.com.grupoesfera.repartir.model.Grupo;

public class GruposFixture extends Fixture {

    public final Grupo ALMUERZO = Fixture.unGrupo()
                .conId(101L)
                .conNombre("Almuerzo")
                .conMiembros(son("martin","tatiana","mariano"))
                .conTotal($(1500, 33))
                .obtener();

    public final Grupo REGALO_PARA_LUCAS = Fixture.unGrupo()
                .conId(102L)
                .conNombre("Regalo para Lucas")
                .conMiembros(son("maria","juan","brenda","valeria"))
                .conTotal($(4000,0))
                .obtener();
}
