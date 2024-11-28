-- -----------------------------------------------------
-- Schema PlayTab
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `PlayTab` ;

-- -----------------------------------------------------
-- Schema PlayTab
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `PlayTab`;
USE `PlayTab` ;

-- Deshabilitar restricciones de claves foráneas temporalmente
SET FOREIGN_KEY_CHECKS = 0;

-- Tabla REGION
CREATE TABLE IF NOT EXISTS REGION (
  `Id_Region` INT NOT NULL UNIQUE,
  `Nombre_Region` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`Id_Region`)
);

-- Tabla COMUNA
CREATE TABLE IF NOT EXISTS COMUNA (
  `Id_Comuna` INT NOT NULL UNIQUE,
  `Nombre_Comuna` VARCHAR(45) NOT NULL,
  `Id_Region` INT NOT NULL,
  PRIMARY KEY (`Id_Comuna`),
  CONSTRAINT `FK_Comuna_Region`
    FOREIGN KEY (`Id_Region`)
    REFERENCES `REGION` (`Id_Region`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

-- Tabla CATEGORIA
CREATE TABLE IF NOT EXISTS CATEGORIA (
  `Id_Categoria` INT NOT NULL UNIQUE,
  `Nom_Categoria` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`Id_Categoria`)
);

-- Tabla SUBCATEGORIA
CREATE TABLE IF NOT EXISTS SUBCATEGORIA (
  `Id_SubCategoria` INT NOT NULL UNIQUE,
  `Nom_SubCategoria` VARCHAR(50) NOT NULL,
  `Id_Categoria` INT NOT NULL,
  PRIMARY KEY (`Id_SubCategoria`),
  CONSTRAINT `FK_SubCategoria_Categoria`
    FOREIGN KEY (`Id_Categoria`)
    REFERENCES `CATEGORIA` (`Id_Categoria`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

-- Tabla ESTADO_ACTIVIDAD
CREATE TABLE IF NOT EXISTS ESTADO_ACTIVIDAD (
  `Id_Estado` INT NOT NULL UNIQUE,
  `Tipo_Estado` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`Id_Estado`)
);

-- Tabla MAXJUGADOR
CREATE TABLE IF NOT EXISTS MAXJUGADOR (
  `Id_MaxJugador` INT NOT NULL UNIQUE,
  `Cantidad_MaxJugador` INT NOT NULL,
  PRIMARY KEY (`Id_MaxJugador`)
);

-- Tabla USUARIO
CREATE TABLE IF NOT EXISTS USUARIO (
  `Id_User` INT auto_increment NOT NULL UNIQUE,
  `Run_User` VARCHAR(10) NOT NULL UNIQUE,
  `Tipo_User` INT NOT NULL,
  `Nom_User` VARCHAR(50) NOT NULL,
  `Correo_User` VARCHAR(70) NOT NULL,
  `Contra_User` VARCHAR(64) NOT NULL,
  `Celular_User` VARCHAR(12) NOT NULL,
  `FechaNac_User` DATE NOT NULL,
  `FechaCreacion_User` DATE NOT NULL,
  `Id_Comuna` INT NOT NULL,
  `Id_Estado` INT NOT NULL,
  `Id_Clasificacion` INT,
  `token` VARCHAR(255) NULL,
  PRIMARY KEY (`Id_User`),
  CONSTRAINT `FK_Usuario_Comuna`
    FOREIGN KEY (`Id_Comuna`)
    REFERENCES `COMUNA` (`Id_Comuna`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Usuario_EstadoActividad`
    FOREIGN KEY (`Id_Estado`)
    REFERENCES `ESTADO_ACTIVIDAD` (`Id_Estado`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) auto_increment=100;

-- Tabla ACTIVIDAD
CREATE TABLE IF NOT EXISTS ACTIVIDAD (
  `Id_Actividad` INT auto_increment NOT NULL UNIQUE,
  `Nom_Actividad` VARCHAR(45) NOT NULL,
  `Desc_actividad` VARCHAR(100),
  `Direccion_Actividad` VARCHAR(60),
  `Id_MaxJugador` int NOT NULL,
  `Id_Anfitrion_Actividad` INT NOT NULL,
  `Celular_User` VARCHAR(12) NOT NULL,
  `Id_Comuna` INT NOT NULL,
  `Fecha_INI_Actividad` DATETIME NOT NULL,
  `Fecha_TER_Actividad` DATETIME NOT NULL,
  `Id_SubCategoria` INT NOT NULL,
  `Id_Estado` INT NOT NULL,
  PRIMARY KEY (`Id_Actividad`),
  CONSTRAINT `FK_Actividad_Comuna`
    FOREIGN KEY (`Id_Comuna`)
    REFERENCES `COMUNA` (`Id_Comuna`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Actividad_SubCategoria`
    FOREIGN KEY (`Id_SubCategoria`)
    REFERENCES `SUBCATEGORIA` (`Id_SubCategoria`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Actividad_MaxJugador`
    FOREIGN KEY (`Id_MaxJugador`)
    REFERENCES `MAXJUGADOR` (`Id_MaxJugador`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Actividad_Estado`
    FOREIGN KEY (`Id_Estado`)
    REFERENCES `ESTADO_ACTIVIDAD` (`Id_Estado`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Actividad_Anfitrion` 
    FOREIGN KEY (`Id_Anfitrion_Actividad`)
    REFERENCES `USUARIO` (`Id_User`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) auto_increment=1000;

CREATE TABLE IF NOT EXISTS IMAGEN (
    `Id_Imagen` INT AUTO_INCREMENT NOT NULL UNIQUE,
    `Id_SubCategoria` INT NOT NULL,
    `Url` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`Id_Imagen`),
    CONSTRAINT `FK_Imagen_SubCategoria`
        FOREIGN KEY (`Id_SubCategoria`)
        REFERENCES `SUBCATEGORIA` (`Id_SubCategoria`)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
) AUTO_INCREMENT=1;

CREATE TABLE FAVORITO (
    `Id_Favorito` INT auto_increment PRIMARY KEY NOT NULL,
    `Id_User` INT NOT NULL UNIQUE, 
    `Id_SubCategoria` INT NULL,
    FOREIGN KEY (`Id_User`) REFERENCES  `USUARIO`(`Id_User`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
    FOREIGN KEY (`Id_SubCategoria`) REFERENCES `ACTIVIDAD`(`Id_SubCategoria`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);


CREATE TABLE IF NOT EXISTS PARTICIPANTE (
  `Id_Actividad` INT NOT NULL,
  `Id_User` INT NOT NULL,
  `Tipo_Participante` INT NOT NULL,
  `Id_Asistencia` INT NOT NULL,
  PRIMARY KEY (`Id_Actividad`, `Id_User`), -- Llave primaria compuesta
  CONSTRAINT `FK_Participante_Actividad`
    FOREIGN KEY (`Id_Actividad`)
    REFERENCES `ACTIVIDAD` (`Id_Actividad`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Participante_Usuario`
    FOREIGN KEY (`Id_User`)
    REFERENCES `USUARIO` (`Id_User`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Participante_Asistencia`
    FOREIGN KEY (`Id_Asistencia`)
    REFERENCES `ASISTENCIA` (`Id_Asistencia`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);


-- Tabla ASISTENCIA
CREATE TABLE IF NOT EXISTS ASISTENCIA (
  `Id_Asistencia` INT NOT NULL UNIQUE,
  `Tipo_Asistencia` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`Id_Asistencia`)
);

-- Tabla CLASIFICACION
CREATE TABLE IF NOT EXISTS CLASIFICACION (
  `Id_Clasificacion` INT auto_increment NOT NULL UNIQUE,
  `Comentario_clasificacion` VARCHAR(100),
  `Id_User` INT NOT NULL,
  `Id_User_Clasificar` INT NOT NULL,
  `Id_NomClasificacion` INT NOT NULL,
  PRIMARY KEY (`Id_Clasificacion`),
  CONSTRAINT `FK_Clasificacion_User`
    FOREIGN KEY (`Id_User`)
    REFERENCES `USUARIO` (`Id_User`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Clasificacion_NomClasificacion`
    FOREIGN KEY (`Id_NomClasificacion`)
    REFERENCES `NOMBRE_CLASIFICACION` (`Id_NomClasificacion`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

-- Tabla NOMBRE_CLASIFICACION
CREATE TABLE IF NOT EXISTS NOMBRE_CLASIFICACION (
  `Id_NomClasificacion` INT NOT NULL UNIQUE,
  `Nombre_Clasificacion` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`Id_NomClasificacion`)
);

-- Tabla REPORTE
CREATE TABLE IF NOT EXISTS REPORTE (
  `Id_Reporte` INT auto_increment NOT NULL UNIQUE,
  `Razon_Reporte` VARCHAR(300) NOT NULL,
  `Id_User` INT NOT NULL,
  `Id_User_Reportar` INT NOT NULL,
  PRIMARY KEY (`Id_Reporte`),
  CONSTRAINT `FK_Reporte_User`
    FOREIGN KEY (`Id_User`)
    REFERENCES `USUARIO` (`Id_User`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Reporte_UserReportar`
    FOREIGN KEY (`Id_User_Reportar`)
    REFERENCES `USUARIO` (`Id_User`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

-- Habilitar restricciones de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;


-- TRIGGERS's
DELIMITER //

-- Trigger para que el anfitrion no se repita por actividad
CREATE TRIGGER AddAnfitrionToParticipante
AFTER INSERT ON `ACTIVIDAD`
FOR EACH ROW
BEGIN
    INSERT INTO `PARTICIPANTE` (
        `Id_Actividad`, `Id_User`, `Tipo_Participante`, `Id_Asistencia`
    ) 
    VALUES (
        NEW.Id_Actividad, 
        NEW.Id_Anfitrion_Actividad,
        100,
        800
    );
END //

DELIMITER ;

-- Trigger para que se inscriba participantes
DELIMITER //

CREATE PROCEDURE InscribirParticipanteSimple(
    IN p_Id_Actividad INT, 
    IN p_Id_User INT,
    IN p_Tipo_Participante INT
)
BEGIN
    INSERT INTO `PARTICIPANTE` (Id_Actividad, Id_User, Tipo_Participante, Id_Asistencia)
    VALUES (p_Id_Actividad, p_Id_User, p_Tipo_Participante, 900);
END //

DELIMITER ;

-- Trigger para eliminar usuario.
DELIMITER //

CREATE TRIGGER EliminarUsuario
AFTER DELETE ON USUARIO
FOR EACH ROW
BEGIN
    -- Elimina los registros relacionados en la tabla actividad
    DELETE FROM CLASIFICACION WHERE Id_User = OLD.Id_User;
    DELETE FROM REPORTE WHERE Id_User = OLD.Id_User;
    DELETE FROM FAVORITO WHERE Id_User = OLD.Id_User;
    DELETE FROM PARTICIPANTE WHERE Id_User = OLD.Id_User;
    DELETE FROM ACTIVIDAD WHERE Id_Anfitrion_Actividad = OLD.Id_User;
END //

DELIMITER ;

-- Inserción en REGION
INSERT INTO REGION (`Id_Region`,`Nombre_Region`) VALUES 
(10, 'Los Lagos'), 
(20, 'Los Rios');

-- Inserción en COMUNA
INSERT INTO COMUNA (`Id_Comuna`, `Nombre_Comuna`, `Id_Region`) VALUES 
(100, 'Puerto Montt', 10), 
(200, 'Puerto Varas', 10),
(300, 'Osorno', 10), 
(400, 'Valdivia', 20), 
(500, 'Panguipulli', 20),
(600, 'Corral', 20),
(700, 'Frutillar', 10);

-- Inserción en CATEGORIA
INSERT INTO CATEGORIA (`Id_Categoria`,`Nom_Categoria`) VALUES
(1000,'Juegos'),
(2000,'Deportes');

-- Inserción en NOMBRE_CLASIFICACION
INSERT INTO NOMBRE_CLASIFICACION (`Id_NomClasificacion`, `Nombre_Clasificacion`) VALUES 
(5, 'Muy Malo'), 
(10, 'Malo'),
(15, 'Regular'), 
(20, 'Bueno'),
(25, 'Muy Bueno');

-- Inserción en MAXJUGADOR
INSERT INTO MAXJUGADOR (`Id_MaxJugador`, `Cantidad_MaxJugador`) VALUES 
(10, '3'), 
(20, '4'),
(30, '5'), 
(40, '6'),
(50, '7'),
(60, '8'), 
(70, '10'),
(80, '16'), 
(90, '18'),
(100, '22'),
(110, '24'); 

-- Inserción en SUBCATEGORIA
INSERT INTO SUBCATEGORIA (`Id_SubCategoria`,`Nom_SubCategoria`,`Id_Categoria`) VALUES
(10001,'Fortnite',1000),(10002,'League of Legends',1000),(10003,'Valorant',1000),(10004,'Apex Legends',1000),
(10005,'Counter-Strike: Global Offensive',1000),(10006,'Rocket League',1000),(10007,'Among Us',1000),
(20001,'Fútbol',2000),(20002,'Baloncesto',2000),(20003,'Voleibol',2000),(20004,'Béisbol',2000),
(20005,'Rugby',2000),(20006,'ciclismo',2000),(20007,'trekking',2000);

-- Inserción en ESTADO_ACTIVIDAD
INSERT INTO ESTADO_ACTIVIDAD (`Id_Estado`, `Tipo_Estado`) VALUES 
(15, 'Activo'), 
(30, 'Realizada');

-- Inserción en ASISTENCIA
INSERT INTO ASISTENCIA (`Id_Asistencia`, `Tipo_Asistencia`) VALUES 
(800, 'Presente'), 
(900, 'Ausente');

-- Inserción en USUARIO
INSERT INTO USUARIO 
(`Run_User`, `Tipo_User`, `Nom_User`, `Correo_User`, `Contra_User`, `Celular_User`, `FechaNac_User`, `FechaCreacion_User`, `Id_Comuna`, `Id_Estado`, `Id_Clasificacion`) 
VALUES
('00000000-0', 102, 'Admin', 'playtab.app2024@gmail.com', '$2a$10$8CRMgXGnji.jAoBgZwTT9uo5eNScNX9.21C6/40E8FlqDJF6Rgkyq','+56900000000', '1989-12-12', '2024-10-21', 100, 15, 30),
('00000000-1', 101, 'Kevin', 'kev.vivanco@duocuc.cl', '$2a$10$8CRMgXGnji.jAoBgZwTT9uo5eNScNX9.21C6/40E8FlqDJF6Rgkyq','+56900000001', '2002-12-12', '2024-10-21', 100, 15, 30),
('00000000-2', 101, 'Ricardo', 'rica.ojeda@duocuc.cl', '$2a$10$8CRMgXGnji.jAoBgZwTT9uo5eNScNX9.21C6/40E8FlqDJF6Rgkyq','+56900000002', '2002-12-13', '2024-10-21', 100, 15, 30),
('00000000-3', 101, 'Sebastian', 'seba.carrera@duocuc.cl', '$2a$10$8CRMgXGnji.jAoBgZwTT9uo5eNScNX9.21C6/40E8FlqDJF6Rgkyq','+56900000003', '2004-12-14', '2024-10-21', 100, 15, 30);

-- insert imagenes aactividades
insert into imagen(Id_SubCategoria,Url) values(10002,"assets/portrait/lol.jpg");
insert into imagen(Id_SubCategoria,Url) values(20001,"assets/portrait/futbol.jpg");
insert into  imagen(Id_SubCategoria,Url) values(20007,"assets/portrait/trekking.jpg");
insert into  imagen(Id_SubCategoria,Url) values(20006,"assets/portrait/ciclismo.jpg");
insert into  imagen(Id_SubCategoria,Url) values(20005,"assets/portrait/rugby.jpg");
insert into  imagen(Id_SubCategoria,Url) values(20004,"assets/portrait/beisbol.jpg");
insert into  imagen(Id_SubCategoria,Url) values(20003,"assets/portrait/voleibol.jpg");
insert into  imagen(Id_SubCategoria,Url) values(20002,"assets/portrait/baloncesto.jpg");
insert into  imagen(Id_SubCategoria,Url) values(10007,"assets/portrait/amongus.png");
insert into  imagen(Id_SubCategoria,Url) values(10006,"assets/portrait/rocketleague.jpg");
insert into  imagen(Id_SubCategoria,Url) values(10005,"assets/portrait/csgo.png");
insert into  imagen(Id_SubCategoria,Url) values(10004,"assets/portrait/apexlegends.jpg");
insert into  imagen(Id_SubCategoria,Url) values(10003,"assets/portrait/valorant.jpg");
insert into  imagen(Id_SubCategoria,Url) values(10001,"assets/portrait/fortnite.jpg");


USE PLAYTAB;
Select * from USUARIO;
SELECT p.Id_Actividad, p.Id_User, i.Nom_Actividad FROM PARTICIPANTE p
INNER JOIN ACTIVIDAD i on p.Id_Actividad=i.Id_Actividad;
SELECT * FROM ACTIVIDAD;


Use PlayTab;
Select * from USUARIO;
Select * from Actividad;
select * from participante;

SELECT COUNT(*) FROM `PlayTab`.`PARTICIPANTE` WHERE Id_Actividad = 1003;
    
SELECT m.Cantidad_MaxJugador
    FROM `PlayTab`.`ACTIVIDAD` a
    JOIN `PlayTab`.`MAXJUGADOR` m ON a.Id_MaxJugador = m.Id_MaxJugador
    WHERE a.Id_Actividad = 1003;

USE PLAYTAB;
-- Select solo para el historial de las partidas donde haya o esté presente el jugador.
SELECT DISTINCT a.Nom_Actividad, p.Id_User, a.Fecha_INI_Actividad, a.Fecha_TER_Actividad, s.Nom_SubCategoria, i.url
FROM Participante p
JOIN ACTIVIDAD a ON p.Id_Actividad = a.Id_Anfitrion_Actividad
JOIN subcategoria s ON s.Id_SubCategoria = a.Id_SubCategoria
JOIN imagen i ON a.Id_SubCategoria = i.Id_SubCategoria
WHERE p.Id_User = 106;

-- delete para borrar una actividad credada
DELETE FROM ACTIVIDAD
WHERE Id_Anfitrion_Actividad=102 AND Id_Actividad=1002;

-- delete para borrar un Participante.
DELETE FROM PARTICIPANTE
WHERE Id_User=102;

-- Actualizar la comuna del usuario
UPDATE USUARIO 
SET Id_Comuna= 100 
WHERE Id_User = 106;

INSERT INTO FAVORITO (`Id_User`, `Id_SubCategoria`)
VALUES (101, 20001);

UPDATE FAVORITO 
SET Id_SubCategoria=20001
WHERE Id_User= 100;

SELECT a.Id_Actividad, a.Nom_Actividad,i.Url,a.Fecha_TER_actividad, s.Nom_SubCategoria 
from participante p 
inner join Actividad a on p.Id_actividad=a.Id_actividad  
inner join imagen i on a.Id_SubCategoria=i.Id_SubCategoria 
inner join subcategoria s on a.Id_subcategoria=s.Id_subcategoria 
where Id_user=101;

SELECT DISTINCT a.Nom_Actividad, u.Nom_User, a.Fecha_INI_Actividad, a.Fecha_TER_Actividad, p.Tipo_Participante,s.Nom_SubCategoria, i.url
                  FROM PARTICIPANTE p
                  JOIN ACTIVIDAD a ON p.Id_Actividad = a.Id_Actividad
                  JOIN USUARIO u ON a.Id_Anfitrion_Actividad = u.Id_User
                  LEFT JOIN SUBCATEGORIA s ON s.Id_SubCategoria = a.Id_SubCategoria
                  LEFT JOIN IMAGEN i ON a.Id_SubCategoria = i.Id_SubCategoria
                  WHERE p.Id_User = 101 AND  p.Tipo_Participante=100 and Fecha_INI_Actividad<=now() and Fecha_TER_Actividad>=now();
                  
select * from actividad;
select * from participante;