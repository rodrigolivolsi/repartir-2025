# Repartir: Enunciados de ejercicios propuestos

## Ejercicio 1: Agregar una prueba de aceptación
Actualmente el sistema admite que se agregue un gasto con monto negativo pero no chequea que el total de los gastos para un grupo sea mayor o igual a cero, lo cual dejaría a un grupo en un estado inconsistente o irreal.

El objetivo del ejercicio es agregar una prueba de aceptación con una nueva regla, que impida que el monto total de los gastos sea negativo, e implementar a continuación los cambios que sean necesarios para que la prueba pase.


## Ejercicio 2: Procesar los errores de la API de Personas
Si se produce un error en la API de personas, ni el backend ni el frontend informan al usuario y la aplicación se sigue comportando como si no hubiese pasado nada. Sería preferible que al producirse un error, el backend informara el problema al frontend y el frontend no permitiera seguir operando hasta que se resuelva.

