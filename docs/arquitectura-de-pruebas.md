# Repartir: Arquitectura de pruebas de aceptación

|                   | **DRIVER**        | **SUT**               | **SECONDARY ADAPTER**                         | **COMANDO**                   |
|-------------------|-------------------|-----------------------|-----------------------------------------------|-------------------------------|
| Assembly E2E(*)   | PlaywrightDriver  | frontend + backend    | MockApiPersonasAdapter, InMemoryDbAdapter     | npm run acceptance-test       |
| Assembly MockApi  | PlaywrightDriver  | frontend              | MockApiAdapter                                | npm run fast-acceptance-test  |

(*) El punta a punta se considera solo para la aplicación principal. Las dependencias externas están mockeadas y para la base de datos se está utilizando una versión en memoria.