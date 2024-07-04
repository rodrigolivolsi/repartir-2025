# Repartir


## Ambiente:


Disponibilizar `node v16.13.x` en `NODE_PATH` 

```
export PATH=${NODE_PATH}/bin:${PATH}
```

Instalar angular

```
npm install -g @angular/cli@13.0.4
```

Instalar drivers para playright

```
npx playwright@1.40 install
```

## Iniciar

```
npm install
npm run start
```

## Ejecutar pruebas playwright
```
Tener iniciado el front
Iniciar el backend y la BD con ./gradlew bootRun en la raiz del proyecto
Luego ejecutar npx playwright test | npm playwright test --ui

```

## Empaquetar

```
npm run build 
```
