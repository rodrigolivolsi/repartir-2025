# Repartir

## Prerequisitos

- JDK 17
- Docker (Solo para correr la demo)
- Chrome
- Node 18

## Arquitectura general

La aplicación está compuesta por 3 componentes principales:

- **Frontend**: Aplicación Angular que permite a los usuarios interactuar con la aplicación.
- **Backend**: Aplicación Spring Boot que provee una API REST para el frontend.
- **API Personas**: API externa a la que el backend se conecta para obtener información de personas.

## Desarrollo Local

_(Todos los comandos se deben ejecutar desde la raíz del proyecto)_

### TL;DR (Resumen)

1. API Personas:

```
npx wiremock --port 8081 --root-dir src/manualTest/resources/wiremock --global-response-templating
```

2. Backend:

```
./gradlew bootRun
```

3. Frontend:

```
./iniciar-frontend
```

### Instrucciones detalladas

Ya que la API de personas es un servicio externo, antes de poder correr la aplicación en un entorno local es necesario levantar un servicio que haga las veces de API Personas. Para facilitar esto, se provee un mock de la API Personas que se puede levantar con Wiremock corriendo el siguiente comando:

```
npx wiremock --port 8081 --root-dir src/manualTest/resources/wiremock --global-response-templating
```

> **Nota**: Si la API Personas se levanta en otro puerto o en otra URL que no sea localhost, debes actualizar la variable `personas.api.url` en el archivo [`src/main/resources/application.properties`](./src/main/resources/application.properties)

#### Voy a desarrollar únicamente backend (Java)

Si lo que queremos es trabajar únicamente con el backend, podemos usar la task `bootRun` de Gradle:

```
./gradlew bootRun
```

> También se puede ejecutar esa task desde la sección de Gradle el IDE.

Esto levantará la aplicación en http://localhost:8080, con una base de datos in-memory (H2) y un build del frontend angular embebido. Podemos inspeccionar la base de datos en http://localhost:8080/h2-console así como la API REST en http://localhost:8080/swagger-ui.html.

#### Voy a desarrollar únicamente frontend (Angular)

Para trabajar únicamente con el frontend, debemos de todos modos tener una instancia del backend corriendo en http://localhost:8080 ya que el frontend depende de la API REST que provee el backend.

Luego, para levantar el frontend angular podemos seguir los pasos indicados en el [README del frontend](./src/main/frontend/README.md) o correr el siguiente comando:

```
./iniciar-frontend
```

#### Voy a desarrollar todo (Java y Angular)

Si queremos desarrollar tanto el backend como el frontend, podemos levantar ambos componentes de la aplicación como se indica en los pasos anteriores.

Además, si queremos ver nuestros cambios de frontend reflejados en http://localhost:8080 mientras los desarrollamos, debemos correr el script `watch` del frontend:

```
cd src/main/frontend
npm run watch
```

## Ejecutar la demo

El proyecto cuenta con una demo que levanta la aplicación en un entorno Dockerizado usando testcontainers, incluyendo una base de datos MariaDB populada y un mock de la API Personas. Para correr la demo, ejecutar el siguiente comando desde la raíz del proyecto:

```
./gradlew demo
```

> **Recordatorio**: Para levantar la demo, es necesario tener Docker instalado en la máquina.

> **Nota**: Así como cuando se corre la aplicación en un entorno local, se puede inspeccionar la API REST en http://localhost:8080/swagger-ui.html. Sin embargo, la base de datos no estará disponible en http://localhost:8080/h2-console ya que la base de datos es MariaDB y se encuentra en un contenedor Docker.

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

```
./tests js acceptance
```

Se pueden sumistrar parámetros opcionales a la ejecución. (Estos son [todos los que acepta Playwright](https://playwright.dev/docs/test-cli)). Por ejemplo, para especificar el nombre de una prueba a ejecutar:

- Frontend

```
./tests js acceptance -g "Nombre del escenario"
```

También se puede levantar la interfaz gráfica de Playwright. Ver [README en proyecto frontend](./src/main/frontend/README.md).

## IDE

### Intellij

Es recomendable instalar los siguientes plugins:

- [Cucumber for Java](https://plugins.jetbrains.com/plugin/7212-cucumber-for-java)

### Visual Studio Code

Es recomendable instalar los siguientes plugins:

- [Gradle for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-gradle)
- [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=RobinGROSS.mycucumberautocomplete)
- [Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)
