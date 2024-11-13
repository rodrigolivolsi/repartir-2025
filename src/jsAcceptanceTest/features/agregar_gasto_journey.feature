# language: es

Característica: Experiencia al agregar gastos a los grupos

  @journey
  Escenario: Creo un grupo con integrantes y agrego un gasto
  * que el usuario inició Repartir
  * el usuario crea un grupo indicando el nombre 'Viaje a Rosario' con miembros 'Guillermo' y 'Giuliana'
  * el usuario selecciona el grupo creado y agrega un monto de $'4000'
  * debería visualizar dentro del listado el grupo 'Viaje a Rosario' con total '$  4.000,00' y miembros 'Guillermo' y 'Giuliana'
