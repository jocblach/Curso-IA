package com.iasolutions.demo.Model;

import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;

@Entity
@Table(name = "Comments")
@Getter
@Setter
public class Comments {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "idComments")
    private Long idComments;

    @Column(name = "mensaje")
    private String comentario;

    @Enumerated(EnumType.STRING)
    @Column(name = "asunto")
    private Asuntos asunto;

    @Column(name = "Email")
    private String email; 

    @Column(name = "nombre")
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private UsuarioEntity usuario;

}
