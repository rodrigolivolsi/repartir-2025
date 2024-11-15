# Repartir: Arquitectura de pruebas de aceptación

|                   | **DRIVER**        | **SUT**               | **SECONDARY ADAPTER**                         | **COMANDO**                           |
|-------------------|-------------------|-----------------------|-----------------------------------------------|---------------------------------------|
| Assembly E2E(*1)  | PlaywrightDriver  | frontend + backend    | MockApiPersonasAdapter, InMemoryDbAdapter(*2) | npm run acceptance-test               |
| Assembly MockApi  | PlaywrightDriver  | frontend              | MockApiAdapter                                | npm run fast-acceptance-test          |
| Assembly Backend  | HTTPDriver        | backend               | MockApiPersonasAdapter, InMemoryDbAdapter(*2) | npm run http-fast-acceptance-test     |



factory de assemblies?
como elegirla? Con tags, con un script
poder ejecutar pruebas por modulos ("grupos", "bienvenida"). Ejecutar todos los assemblies o solo uno


(*1) El punta a punta se considera solo para la aplicación principal. Las dependencias externas están mockeadas y para la base de datos se está utilizando una versión en memoria.
(*2) Estos adapters están presentes en la configuración de ejecución del backend. No existe una clase en código que los represente.