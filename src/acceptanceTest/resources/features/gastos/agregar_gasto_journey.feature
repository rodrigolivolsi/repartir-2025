# language: es

Característica: Experiencia al agregar gastos a los grupos

  @journey
  Escenario: Creo un grupo con integrantes y agrego un gasto
  * el usuario inicia la aplicación
  * el usuario selecciona crear grupo
  * completa con el nombre 'regalo'
  * indica que los miembros son:
      | Guillermo |
      | Giuliana |
  * guarda el grupo
  * el usuario selecciona agregar gasto al grupo #1
  * completa con el monto de $ '5000'
  * guarda el gasto
  * ve el total del grupo #1 actualizado a '$  5.000,00'
