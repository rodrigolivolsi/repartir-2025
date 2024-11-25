# language: es

Característica: Bienvenida a la aplicación

  Escenario: Mostrar un mensaje de bienvenida
    Cuando el usuario accede a la aplicación
    Entonces se muestra el mensaje de bienvenida

  Escenario: Iniciar el uso de la aplicación luego de la bienvenida
    Dado el usuario accede a la aplicación
    Cuando decidió iniciar
    Entonces puede empezar a usarla