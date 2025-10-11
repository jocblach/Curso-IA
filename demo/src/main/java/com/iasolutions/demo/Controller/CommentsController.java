package com.iasolutions.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iasolutions.demo.Model.Comments;
import com.iasolutions.demo.Service.CommentsService;


@RestController
@RequestMapping("/api/comentarios")
@CrossOrigin(origins = "http://localhost:8080")
public class CommentsController {

    @Autowired
    private CommentsService commentsService;

    @PostMapping
    public ResponseEntity<String> postComent(@RequestBody Comments comentario) {
        commentsService.guardarComentario(comentario);
        return ResponseEntity.ok("Comentario guardado exitosamente");
    }
}
