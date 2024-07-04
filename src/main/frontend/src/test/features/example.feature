Feature: Example

  Scenario: Visitar pagina de repartir y crear nuevo grupo
    Given Accedemos a la pagina de repartir
    When Creamos un grupo
    Then El grupo debe haberse creado exitosamente