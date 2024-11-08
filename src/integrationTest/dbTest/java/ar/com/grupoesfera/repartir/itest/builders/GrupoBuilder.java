package ar.com.grupoesfera.repartir.itest.builders;

import ar.com.grupoesfera.repartir.model.Grupo;

import java.math.BigDecimal;
import java.util.List;

public class GrupoBuilder {

    private Grupo unGrupo = new Grupo();

    public GrupoBuilder conId(Long id) {
        unGrupo.setId(id);
        return this;
    }

    public GrupoBuilder conNombre(String nombre) {
        unGrupo.setNombre(nombre);
        return this;
    }

    public GrupoBuilder conMiembros(List<String> miembros) {
        unGrupo.setMiembros(miembros);
        return this;
    }

    public GrupoBuilder conTotal(BigDecimal monto) {
        unGrupo.setTotal(monto);
        return this;
    }

    public Grupo obtener() {

        return unGrupo;
    }
}
