package ar.com.grupoesfera.repartir.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import ar.com.grupoesfera.repartir.dto.Respuesta;
import ar.com.grupoesfera.repartir.exceptions.GrupoInvalidoException;

@ControllerAdvice
public class ExcepcionController {

    @ExceptionHandler(GrupoInvalidoException.class)
    public ResponseEntity<?> handleGrupoInvalidoException(GrupoInvalidoException ex, WebRequest request) {
        return ResponseEntity.badRequest().body(new Respuesta<>(null, "Grupo inválido"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> exception(Exception ex, WebRequest request) {
        return ResponseEntity.internalServerError().body(new Respuesta<>(null, "Ocurrió un error inesperado"));
    }
}