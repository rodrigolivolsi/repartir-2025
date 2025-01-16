# Repartir

## Prerequisitos

- JDK 17
- Docker (Solo para correr la demo)
- Chrome
- Node 22.13.0

## Arquitectura general

La aplicación está compuesta por 3 componentes principales:

- **Frontend**: Aplicación Angular que permite a los usuarios interactuar con la aplicación.
- **Backend**: Aplicación Spring Boot que provee una API REST para el frontend.
- **API Personas**: API externa a la que el backend se conecta para obtener información de personas.

## Desarrollo Local (TL;DR instrucciones resumidas)

### Setup del proyecto


Ver pasos del Setup del ambiente en el [README del frontend](./src/main/frontend/README.md)
```
cd src/main/frontend
npm install
npm run build
```

### Ejecutar la aplicación

_(Todos los comandos se deben ejecutar desde la raíz del proyecto)_

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

## Desarrollo Local (Instrucciones detalladas)

_(Todos los comandos se deben ejecutar desde la raíz del proyecto)_

Ya que la API de personas es un servicio externo, antes de poder correr la aplicación en un entorno local es necesario levantar un servicio que haga las veces de API Personas. Para facilitar esto, se provee un mock de la API Personas que se puede levantar con Wiremock corriendo el siguiente comando:

```
npx wiremock --port 8081 --root-dir src/manualTest/resources/wiremock --global-response-templating
```

Esto levantará un servicio en http://localhost:8081. Podemos inspeccionar sus endpoints y demás características en http://localhost:8081/\_\_admin.

### Voy a desarrollar únicamente backend (Java)

Si lo que queremos es trabajar únicamente con el backend, podemos usar la task `bootRun` de Gradle:

```
./gradlew bootRun
```

_(También se puede ejecutar esta task desde la sección de Gradle el IDE)_

> **Nota**: Si la API Personas se levanta en otro puerto o en otra URL que no sea localhost, debes actualizar la variable `personas.api.url` en el archivo [`src/main/resources/application.properties`](./src/main/resources/application.properties) antes de correr el backend.

Esto levantará la aplicación en http://localhost:8080, con una base de datos in-memory (H2) y un build del frontend angular embebido. Podemos inspeccionar la base de datos en http://localhost:8080/h2-console así como la API REST en http://localhost:8080/swagger-ui.html.

### Voy a desarrollar únicamente frontend (Angular)

Para trabajar únicamente con el frontend, debemos de todos modos tener una instancia del backend corriendo en http://localhost:8080 ya que el frontend depende de la API REST que provee el backend. Podemos correr el backend como se indicó en el paso anterior.

Luego, para levantar el frontend angular podemos seguir los pasos indicados en el [README del frontend](./src/main/frontend/README.md) o correr el siguiente comando:

```
./iniciar-frontend
```

### Voy a desarrollar todo (Java y Angular)

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

## Reportes

El proyecto cuenta con varios reportes generados por las pruebas automatizadas, por la herramienta de análisis estático y por la herramienta de análisis de cobertura de código. Los mismos son generados al momento de pushear a la rama `main` y se pueden visualizar en la [página de GitLab Pages](https://repartir-grupo-esfera-capacitacion-recursos-4efd1f82300430ba014.gitlab.io/) del proyecto.

## Links de interés

### Infra

- [Generación de la imagen de Docker utilizada en este proyecto](./docker/README.md)

### Pruebas automatizadas

- [Como ejecutar las pruebas automatizadas](./docs/ejecutar-pruebas.md)
- [Instrucciones específicas para el frontend de esta aplicación](./src/main/frontend/README.md)
- [Arquitectura avanzada de pruebas](./docs/arquitectura-de-pruebas.md)

### Que se puede hacer en este repo

- [Algunos ejercicios propuestos para trabajar en este repo](./docs/enunciados-ejercicios.md)

## IDE

### Intellij

Es recomendable instalar los siguientes plugins:

- [Cucumber for Java](https://plugins.jetbrains.com/plugin/7212-cucumber-for-java)

### Visual Studio Code

Es recomendable instalar los siguientes plugins:

- [Gradle for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-gradle)
- [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=RobinGROSS.mycucumberautocomplete)
- [Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)


## Posibles errores

### Al correr npm run build en src/main/frontend

Si se obtiene un error de este estilo:

```
[error] SyntaxError: Unexpected end of input
    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:152:18)
    at ModuleLoader.moduleProvider (node:internal/modules/esm/loader:299:14)
```
- Correr npm install
- Si ya lo hiciste, chequear en el main.ts o algún otro archivo si hay imports que dice que no encuentra.
- Borrar la carpeta node_modules y volver a correr el npm install