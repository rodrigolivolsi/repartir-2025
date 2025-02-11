# Repartir: Enunciados de ejercicios propuestos

## Recomendaciones

1. Ejecutar todos los pasos de [Setup del proyecto](../README.md#setup-del-proyecto)
2. Probar de levantar la aplicación siguiendo las instrucciones de [Ejecutar la aplicación](../README.md#ejecutar-la-aplicación) y accediendo a http://localhost:4200
3. Probar de ejecutar las pruebas de aceptación al menos una vez con
```
cd src/main/frontend
npm run acceptance-test
npm run acceptance-test:e2e
```
4. Este último paso tal vez requiera la instalación de los drivers de Playwright ejecutando
```
npx -y playwright@1.48.1 install --with-deps
```

## Ejercicio 1
### Nueva regla: El monto total de gastos no puede ser negativo

Actualmente el sistema admite que se agregue un gasto con monto negativo pero no chequea que el total de los gastos para un grupo sea mayor o igual a cero, lo cual dejaría a un grupo en un estado inconsistente o irreal.

El objetivo del ejercicio es agregar una prueba de aceptación con una nueva regla, que impida que el monto total de los gastos sea negativo, e implementar a continuación los cambios que sean necesarios para que la prueba pase.

[Ver solución](https://gitlab.com/grupo-esfera/capacitacion/recursos/repartir/-/merge_requests/14/diffs)


## Ejercicio 2
### Nueva regla: No puede haber miembros duplicados en un mismo grupo

Se desea que al crear un grupo todos los miembros tengan nombres únicos para evitar confusiones entre los participantes. Si existen dos o más miembros de igual nombre, el sistema no debe permitir que se cree el grupo, sino que debe informar el error al usuario.

Los miembros duplicados pueden aparecer en cualquier orden. Por ejemplo:

juan, juan --> ERROR

juan P, juan ---> ok

juan, paco, juan --> ERROR

Agregar las pruebas necesarias para verificar que se cumpla esta regla y luego implemementar la solución.

[Ver solución](https://gitlab.com/grupo-esfera/capacitacion/recursos/repartir/-/merge_requests/32/diffs)


## Ejercicio 3
### Procesar los errores de la API de Personas

Si se produce un error en la API de personas, ni el backend ni el frontend informan al usuario y la aplicación se sigue comportando como si no hubiese pasado nada. Sería preferible que al producirse un error, el backend informara el problema al frontend y el frontend no permitiera seguir operando hasta que se resuelva.

Se debe decidir que tipo de pruebas se quieren agregar para verificar la implementación deseada. 
[Ver solución](https://gitlab.com/grupo-esfera/capacitacion/recursos/repartir/-/merge_requests/48/diffs)

## Ejercicio 4
### Agregar una prueba de aceptación multi assembly

Resolver el problema planteado en el ejercicio 1 con una prueba de aceptación que pueda ejecutarse en múltiples test assemblies (ver [Arquitectura avanzada de pruebas](arquitectura-de-pruebas.md)).

Un camino posible: Agregar el escenario e implementar la prueba para el *Assembly Backend*. Cuando esté lista implementarla para el *Assembly E2E*. Por último para el *Assembly MockApi*.
[Ver solución](https://gitlab.com/grupo-esfera/capacitacion/recursos/repartir/-/merge_requests/62/diffs)