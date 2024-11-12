# language: es

Característica: Experiencia al agregar gastos a los grupos

  @journey
  Escenario: Creo un grupo con integrantes y agrego un gasto
  * el usuario inicia la aplicación
  * el usuario crea un grupo indicando el nombre 'Viaje a Rosario'
  * el usuario agrega un gasto de $'5000' al grupo #'1'
  * se muestra 1° el grupo 'Viaje a Rosario' con total '$  5.000,00'
