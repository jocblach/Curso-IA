package com.iasolutions.demo.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Usuarios")
@Getter
@Setter
public class UsuarioEntity {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "idUsuario")
    private Long idU;

    @Column(name = "nombre_Usuario")
    private String nombreU;

    @Column(name = "Email")
    private String emailU;

    @Column(name = "Password")
    private String passwordU;
}
