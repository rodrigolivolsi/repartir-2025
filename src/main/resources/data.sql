CREATE TABLE IF NOT EXISTS grupo
(
    id bigint(20) NOT NULL AUTO_INCREMENT,
    nombre varchar(1000) DEFAULT NULL,
    total decimal(12,2) DEFAULT NULL,
    CONSTRAINT grupo_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS grupo_miembros
(
    grupo_id bigint(20) NOT NULL,
    miembro varchar(255) DEFAULT NULL,
    CONSTRAINT grupo_miembros_grupo_id FOREIGN KEY (grupo_id) REFERENCES grupo (id)
);

INSERT INTO grupo
    (id, nombre, total)
VALUES
    (40, 'Viaje al sur', 9000),
    (41, 'Fiesta de fin de año', 25000),
    (42, 'Campamento', 8000.56),
    (43, 'Almuerzo', 4000),
    (44, 'Gasto minimo', 0),
    (45, 'After Office en pandemia', 3000);

INSERT INTO grupo_miembros
    (grupo_id, miembro)
VALUES
    (40, 'marcos'),
    (40, 'luis'),
    (40, 'rocio'),
    (41, 'lucas'),
    (41, 'patricia'),
    (42, 'marcos'),
    (42, 'luz'),
    (42, 'rodrigo'),
    (42, 'oscar'),
    (43, 'patricia'),
    (43, 'rocio'),
    (44, 'agustin'),
    (44, 'agustina'),
    (45, 'agustin'),
    (45, 'lucas'),
    (45, 'agustina');