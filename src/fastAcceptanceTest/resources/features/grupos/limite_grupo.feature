# language: es
Característica: Control de gastos en los grupos

  Regla: El total de un grupo no debe superar un límite máximo permitido

    Escenario: No se puede agregar un gasto que haga que el total supere el límite
      Dado que el usuario inició Repartir
      Y existe un grupo llamado 'Viaje a Bariloche' con un total de $ 99000
      Cuando el usuario intenta agregar un gasto de $ 2000 al grupo
      Entonces no debería agregarse el gasto
      Y debería ser informado que el total del grupo no puede superar $ 100.000

    Escenario: Se puede agregar un gasto si el total no supera el límite
      Dado que el usuario inició Repartir
      Y existe un grupo llamado 'Viaje a Bariloche' con un total de $ 98000
      Cuando el usuario agrega un gasto de $ 1000 al grupo
      Entonces el total del grupo debería ser $ 99000
      Y el gasto debería agregarse correctamente