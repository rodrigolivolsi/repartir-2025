# Repartir: Pruebas automatizadas

## Estructura de este proyecto

En la carpeta [```src```](../src/) existen subcarpetas con la implementación de distintos tipos de pruebas:

| Subcarpeta                                | Tipo de prueba                    | Tecnologías principales       | Descripción                                               |
|-------------------------------------------|-----------------------------------|-------------------------------|-----------------------------------------------------------|
| ```acceptanceTest```                      | de aceptación                     | java + Cucumber + Selenium    | Pruebas de aceptación de la aplicación. Los mismos escenarios reciben múltiples implementaciones en este proyecto. Esta es la implementación utilizando java y Selenium.                                                                                |
| ```fastAcceptanceTest```                  | de aceptación                     | java + Cucumber    | Experimento para demostrar como las mismas pruebas de aceptación anteriores (```acceptanceTest```) se pueden implementar con un test assembly más acotado. En este caso, contra el modelo, sin pasar por la interfaz gráfica ni por otros componentes.  |
| ```integrationTest/apiControllersTest```  | de componentes / de API           | java                          | Pruebas de los controladores mockeando la capa de servicios. Testean varios componentes desplegados en el container.                                                                                                                                   |
| ```integrationTest/apiExternaTest```      | de componentes / de integración   | java + WireMock + Feign       | Pruebas de los clientes que interfacean con sistemas externos                                                                                                                                                                                           |
| ```integrationTest/dbTest```              | de componentes                    | java                          | Pruebas de los repositorios de datos utilizando una base de datos "real"                                                                                                                                                                                |
| ```jsAcceptanceTest```                    | de aceptación                     | JS + Playwright + bdd-gen     | Las mismas pruebas de aceptación de ```acceptanceTest``` pero implementadas ahora en la capa del frontend                                                                                                                                               |
| ```jsAdvancedAcceptanceTest```            | de aceptación                     | JS + Playwright + bdd-gen     | Pruebas de aceptación reutilizables en múltiples assemblies siguiendo el modelo de Subsecond TDD y el patrón de Ports & Adapters. Ver [Arquitectura de pruebas](./arquitectura-de-pruebas.md)                                                           |
| ```test```                                | unitarias                         | java                          | Pruebas unitarias de cada uno de los componentes del backend                                                                                                                                                                                            |
| ```uiTest```                              | de UI                             | java + Selenium               | Pruebas del comportamiento de la interfaz gráfica implementadas con la tecnología del backend                                                                                                                                                           |
| ```jsUnitTest```                                | unitarias                         | JS + Angular                   | Pruebas unitarias de cada uno de los componentes del frontend  


## Ejecución de pruebas

Estas pruebas se ejecutan con gradle o con npm dependiendo de la tecnología que utilicen:

|                         | Nombre carpeta                  | Comando                             | Desde qué carpeta       |
|-------------------------|---------------------------------|-------------------------------------|-------------------------|
| Gradle                  | acceptanceTest                  | ```./gradlew acceptanceTest```      |                         |
|                         | fastAcceptanceTest              | ```./gradlew fastAcceptanceTest```  |                         |
|                         | apiControllersTest              | ```./gradlew apiControllersTest```  |                         |
|                         | apiExternaTest                  | ```./gradlew apiExternaTest```      |                         |
|                         | dbTest                          | ```./gradlew dbTest```              |                         |
|                         | test                            | ```./gradlew test```                |                         |
|                         | uiTest                          | ```./gradlew uiTest```              |                         |
| NPM                     | jsAcceptanceTest                | ```npm run acceptance-test```           | ```src/main/frontend``` |
|                         | jsAdvancedAcceptanceTest        | ```npm run acceptance-test:e2e```       | ```src/main/frontend``` |
|                         |                                 | ```npm run acceptance-test:mock-api```  |                         |
|                         |                                 | ```npm run acceptance-test:backend```   |                         |
|                         | jsUnitTest                      | ```npm run test```                      | ```src/main/frontend``` |

Aparte hay algunos otros comandos útiles y filtros que se pueden aplicar, que se explican a continuación.

### Ejecución de pruebas etiquetadas

Existe la posiblidad de ejecutar todas las pruebas que corren con Gradle (independientemente del tipo de prueba) etiquetadas con uno o más tags. 
A modo de ejemplo, existen en el proyecto pruebas anotadas con ```@Tag("api")```. Para ejecutarlas utilizar:

```
 ./gradlew taggedTest -Dtags=[NOMBRE_DEL_TAG]
```

Ejemplo:

```
 ./gradlew taggedTest -Dtags=api
```

Esto **no incluye** a las pruebas de aceptación.

### Para ejecutar todas las pruebas que usan Gradle

```
./gradlew check --info
```

### Para ejecutar pruebas java específicas

> Sirve para pruebas que no usan cucumber (hoy, todas menos ```acceptanceTest``` y  ```fastAcceptanceTest```)

```
./gradlew <task> --tests "<filter>"
```

Donde task es "test", "dbTest", etc... y filter la regex a evaluar.

#### [Guia](https://docs.gradle.org/current/userguide/java_testing.html#test_filtering) para aplicar filtros. Ejemplos:

```
# Clase específica
./gradlew test --tests ar.com.grupoesfera.repartir.model.GrupoTest

# Clase específica y método
./gradlew test --tests ar.com.grupoesfera.repartir.model.GrupoTest.noEstaFormadoCuandoTieneSoloUnMiembro

# Todas las clases de un paquete específico (recursivamente)
./gradlew test --tests 'ar.com.grupoesfera.repartir.model*'

# Método específico en un paquete específico
./gradlew test --tests 'ar.com.grupoesfera.repartir*.noEstaFormadoCuandoTieneSoloUnMiembro'

./gradlew apiControllersTest --tests '*listarCuandoExistenUnUnicoGrupo'

./gradlew dbTest --tests '*persistir*Compartida'
```

### Para ejecutar pruebas de aceptación java especificas

> Sirve para pruebas que usan cucumber (hoy, ```acceptanceTest``` y  ```fastAcceptanceTest```)

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
