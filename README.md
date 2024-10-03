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
Se pueden sumistrar parámetros opcionales a la ejecución. Por ejemplo, el nombre de una prueba a ejecutar:
* Frontend
```
./tests js acceptance --name "Nombre del escenario"
```

## Acceso web

http://localhost:8080/

## Open API

http://localhost:8080/swagger-ui.html

##
