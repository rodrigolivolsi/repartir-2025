# Repartir: Arquitectura de pruebas de aceptación

|                   | **DRIVER**        | **SUT**                                       | **BACKEND ADAPTER**                           |
|-------------------|-------------------|-----------------------------------------------|-----------------------------------------------|
| Assembly E2E(*)   | PlaywrightDriver  | frontend + backend                            | MockApiPersonasAdapter, InMemoryDbAdapter     |
| Assembly MockApi  | PlaywrightDriver  | frontend                                      | MockApiAdapter                                |

(*) El punta a punta se considera solo para la aplicación principal. Las dependencias externas están mockeadas y para la base de datos se está utilizando una versión en memoria.