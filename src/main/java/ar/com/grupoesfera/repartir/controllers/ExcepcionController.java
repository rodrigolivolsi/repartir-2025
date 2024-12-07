package ar.com.grupoesfera.repartir.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import ar.com.grupoesfera.repartir.exceptions.GrupoInvalidoException;

@ControllerAdvice
public class ExcepcionController {

    @ExceptionHandler(GrupoInvalidoException.class)
    public ResponseEntity<String> handleGrupoInvalidoException(GrupoInvalidoException ex, WebRequest request) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> exception(Exception ex, WebRequest request) {
        return ResponseEntity.internalServerError().body(ex.getMessage());
    }
}