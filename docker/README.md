# Generación de la imagen de Docker utilizada en este proyecto

La imagen de docker que estamos usando en este proyecto fue generada a partir del archivo [Dockerfile](./Dockerfile) presente en este directorio y subida al registry de Gitlab con el siguiente nombre:

**registry.gitlab.com/grupo-esfera/capacitacion/recursos/repartir**

## Como cambiar la imagen de Docker

De ser necesario realizar algún cambio en la imagen, seguir los siguientes pasos:

* Pararse en la carpeta donde está el Dockerfile
```
cd docker
```
* Hacer login
```
echo $GITLAB_TOKEN | docker login registry.gitlab.com -u [USER_NAME] --password-stdin
```
donde $GITLAB_TOKEN es un Access Token generado desde la página de perfil del usuario que se va a conectar y [USER_NAME] es el nombre de dicho usuario.
* Buildear la imagen
```
docker build -t registry.gitlab.com/grupo-esfera/capacitacion/recursos/repartir . 
```
* Como al final del Dockerfile estamos levantando una terminal, la imagen se puede testear ejecutando cualquier comando de bash. Por ejemplo:
```
docker run registry.gitlab.com/grupo-esfera/capacitacion/recursos/repartir:latest node -v
```
* Pushear la imagen a la registry
```
docker push registry.gitlab.com/grupo-esfera/capacitacion/recursos/repartir:latest
```
