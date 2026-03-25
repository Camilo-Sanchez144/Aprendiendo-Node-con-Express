
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE DATABASE IF NOT EXISTS cursos;
USE cursos;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS cursos_estudiantes;
DROP TABLE IF EXISTS cursos;
DROP TABLE IF EXISTS estudiantes;
DROP TABLE IF EXISTS profesores;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE profesores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(64),
    nombre VARCHAR(64),
    apellido VARCHAR(64) NOT NULL,
    email VARCHAR(128),
    profesion VARCHAR(128),
    telefono VARCHAR(20)
) ENGINE=InnoDB;

CREATE TABLE estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(64),
    nombre VARCHAR(64),
    apellido VARCHAR(64),
    email VARCHAR(128) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(64),
    descripcion TEXT,
    profesor_id INT,
    
    CONSTRAINT cursos_profesores_FK
    FOREIGN KEY (profesor_id)
    REFERENCES profesores(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE cursos_estudiantes (
    curso_id INT,
    estudiantes_id INT,
    
    PRIMARY KEY (curso_id, estudiantes_id),

    CONSTRAINT cursos_estudiantes_cursos_FK
    FOREIGN KEY (curso_id)
    REFERENCES cursos(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT cursos_estudiantes_estudiantes_FK
    FOREIGN KEY (estudiantes_id)
    REFERENCES estudiantes(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;
