# Repartir

## Ambiente

 * JDK 17
 * Docker
 * Chrome
 * Node 18

## Build & Run

### Build del proyecto
```
./gradlew build
```

### Para levantar el ambiente local

```
./gradlew bootRun
```

### Para levantar el frontend angular

```
./iniciar-frontend
```

## Ejecutar pruebas

### Para ejecutar todas las pruebas

```
./gradlew check --info
```

### Para ejecutar pruebas ui-angular

```
./tests js unit
```

### Para ejecutar pruebas de aceptación

* Backend:
```
./tests java acceptance
```
* Frontend
```
./tests js acceptance
```
Se pueden sumistrar parámetros opcionales a la ejecución a continuación de la palabra "acceptance". (Estos son [todos los que acepta Playwright](https://playwright.dev/docs/test-cli)). Por ejemplo, para especificar el nombre de una prueba a ejecutar:
```
./tests js acceptance -g "Nombre del escenario"
```

También se puede levantar la interfaz gráfica de Playwright. Ver [README en proyecto frontend](./src/main/frontend/README.md).

## Acceso web

http://localhost:8080/

## Open API

http://localhost:8080/swagger-ui.html

## IDE

### Intellij

Es recomendable instalar los siguientes plugins:
* [Cucumber for Java](https://plugins.jetbrains.com/plugin/7212-cucumber-for-java)
