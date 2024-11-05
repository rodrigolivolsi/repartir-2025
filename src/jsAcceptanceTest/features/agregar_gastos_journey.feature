# language: es

Característica: Experiencia al agregar gastos a los grupos

  @journey
  Escenario: Agregar gasto a un grupo nuevo
    * existe el grupo #21 'Picnic en Palermo' sin gastos
    * el usuario inicia la aplicación
    * el usuario selecciona agregar gasto al grupo #21
    * completa con el monto de $ '4000'
    * guarda el gasto
    * ve la confirmación 'Gasto agregado al grupo'
    * ve el total del grupo #21 actualizado a '$  4.000,00'

