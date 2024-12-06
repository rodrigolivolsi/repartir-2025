# Repartir: Arquitectura de pruebas de aceptación

Adicionalmente a las pruebas de aceptación JS cuya ejecución se describe en [este documento](../src/main/frontend/README.md) existe una versión de pruebas de aceptación inspiradas en el modelo de [Subsecond TDD](https://github.com/subsecondtdd) propuesto por Aslak Hellesoy y sustentadas por el patrón de arquitectura de [Ports & Adapters](https://alistair.cockburn.us/hexagonal-architecture/) de Alistair Cockburn.

El objetivo es tener pruebas de aceptación reutilizables que puedan ejecutarse contra distintos test assemblies, variando así su velocidad de ejecución (y también su significatividad).

Para ello se definiron los siguientes assemblies:


|                   | **DRIVER**        | **SUT**               | **SECONDARY ADAPTER**                         | **COMANDO QUE LO EJECUTA**            |
|-------------------|-------------------|-----------------------|-----------------------------------------------|---------------------------------------|
| Assembly E2E(*1)  | PlaywrightDriver  | frontend + backend    | MockApiPersonasAdapter, InMemoryDbAdapter(*2) | ```npm run acceptance-test:e2e```     |
| Assembly MockApi  | PlaywrightDriver  | frontend              | MockApiAdapter                                | ```npm run acceptance-test:mock-api```|
| Assembly Backend  | HTTPDriver        | backend               | MockApiPersonasAdapter, InMemoryDbAdapter(*2) | ```npm run acceptance-test:backend``` |

(*1) El punta a punta se considera solo para la aplicación principal. Las dependencias externas están mockeadas y para la base de datos se está utilizando una versión en memoria.

(*2) Estos adapters están presentes en la configuración de ejecución del backend. No existe una clase en código que los represente.


## Ejecución

Los tres comandos de npm que se listan en el cuadro chequean que los componentes que necesitan para ejecutar las pruebas estén levantados antes de comenzar y, en caso contrario, los levantan. Por ejemplo, ```npm run acceptance-test:mock-api``` solo levanta el frontend, y no el backend o la API de personas.


## Dónde encontrar el código

Las implementaciones de estos tests pueden encontrarse en:
- [Definición de los escenarios en Gherkin](../src/jsAdvancedAcceptanceTest/features/)
- [Implementación de los steps, delegando la ejecución en un driver del test assembly](../src/jsAdvancedAcceptanceTest/steps/)
- [Interfaces e implementaciones de los drivers, adapters y el test assembly](../src/jsAdvancedAcceptanceTest/src/test-drivers/)
- [Fixture de Playwright que permite configurar e inyectar el test assembly en los steps](../src/jsAdvancedAcceptanceTest/src/fixtures.ts)




