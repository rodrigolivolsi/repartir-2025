package ar.com.grupoesfera.repartir.itest.fixtures;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
@Profile("integrationTestWithDB")
public class BaseDeDatosFixture extends Fixture {

    private static final String MIGRATION_PATH = "filesystem:src/main/db/migrations";

    @Autowired
    private DataSource dataSource;

    @Autowired
    private ResourceLoader resourceLoader;

    public void estaVacia() {

        Flyway flyway = Flyway
                .configure()
                .dataSource(dataSource)
                .locations(MIGRATION_PATH)
                .createSchemas(true)
                .load();

        flyway.clean();
        flyway.migrate();
    }

    public void existenCuatroGrupos() {

        estaVacia();
        var populator = new ResourceDatabasePopulator();
        populator.addScript(resourceLoader.getResource("classpath:data/existenCuatroGrupos.sql"));
        populator.execute(dataSource);
    }
}
