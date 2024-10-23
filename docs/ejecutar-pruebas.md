# Repartir: Pruebas automatizadas

## Ejecutar pruebas

### Para ejecutar todas las pruebas

```
./gradlew check --info
```

### Para ejecutar pruebas especificas en java

> Sirve para pruebas que no usan cucumber (hoy, todas menos las de aceptación)

```
./gradlew <task> --tests "<filter>"
```

Donde task es "test", "integrationTest", etc... y filter la regex a evaluar.

#### [Guia](https://docs.gradle.org/current/userguide/java_testing.html#test_filtering) para filters:

```
# specific class
./gradlew test --tests org.gradle.SomeTestClass

# specific class and method
./gradlew test --tests org.gradle.SomeTestClass.someSpecificMethod

# method name containing spaces
./gradlew test --tests "org.gradle.SomeTestClass.some method containing spaces"

# all classes at specific package (recursively)
./gradlew test --tests 'all.in.specific.package*'

# specific method at specific package (recursively)
./gradlew test --tests 'all.in.specific.package*.someSpecificMethod'

./gradlew test --tests '*IntegTest'

./gradlew test --tests '*IntegTest*ui*'

./gradlew test --tests '*ParameterizedTest.foo*'

# the second iteration of a parameterized test
./gradlew test --tests '*ParameterizedTest.*[2]'
```

### Para ejecutar pruebas especificas en java

> Sirve para pruebas que usan cucumber (hoy, las de aceptacion)

```
./gradlew acceptanceTest -Dcucumber.filter.name="<regex>"
```

El comando matchea la regex con los textos dentro de cada archivo .feature, tanto escenarios como reglas como características.

> IMPORTANTE: La regex no puede tener un '\*' ni al principio ni al final.

### Para ejecutar pruebas ui-angular

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

También se puede levantar la interfaz gráfica de Playwright. Ver [README en proyecto frontend](./src/main/frontend/README.md).
