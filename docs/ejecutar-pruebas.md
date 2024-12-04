# Repartir: Pruebas automatizadas

## Ejecutar pruebas

### Para ejecutar todas las pruebas unitarias y de integración en java

```
./gradlew check --info
```

### Para ejecutar pruebas especificas en java

> Sirve para pruebas que no usan cucumber (hoy, todas menos las de aceptación)

```
./gradlew <task> --tests "<filter>"
```

Donde task es "test", "dbTest", etc... y filter la regex a evaluar.

#### [Guia](https://docs.gradle.org/current/userguide/java_testing.html#test_filtering) para filters:

```
# specific class
./gradlew test --tests ar.com.grupoesfera.repartir.model.GrupoTest

# specific class and method
./gradlew test --tests ar.com.grupoesfera.repartir.model.GrupoTest.noEstaFormadoCuandoTieneSoloUnMiembro

# all classes at specific package (recursively)
./gradlew test --tests 'ar.com.grupoesfera.repartir.model*'

# specific method at specific package (recursively)
./gradlew test --tests 'ar.com.grupoesfera.repartir*.noEstaFormadoCuandoTieneSoloUnMiembro'

./gradlew apiControllersTest --tests '*listarCuandoExistenUnUnicoGrupo'

./gradlew dbTest --tests '*persistir*Compartida'
```

### Para ejecutar pruebas de aceptación especificas en java

> Sirve para pruebas que usan cucumber (hoy, las de aceptacion)

```
./gradlew acceptanceTest -Dcucumber.filter.name="<nombre del escenario>"
```


### Para ejecutar pruebas unitarias del frontend

```
./tests js unit
```

### Para ejecutar pruebas de aceptación

- Backend:

```
./tests java acceptance
```

- Frontend

  Como el script "tests" levanta el backend y el frontend para ejecutar las pruebas de aceptación, es necesario verificar que ninguno de los dos esté corriendo antes de iniciar.

```
./tests js acceptance
```

Se pueden sumistrar parámetros opcionales a la ejecución. (Estos son [todos los que acepta Playwright](https://playwright.dev/docs/test-cli)). Por ejemplo, para especificar el nombre de una prueba a ejecutar:

```
./tests js acceptance -g "Nombre del escenario"
```

También se puede levantar la interfaz gráfica de Playwright. Ver [README en proyecto frontend](../src/main/frontend/README.md).
