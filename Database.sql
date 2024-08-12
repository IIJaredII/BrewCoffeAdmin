DROP DATABASE expres_cafe;
CREATE DATABASE expres_cafe;

USE expres_cafe;

CREATE TABLE clientes(
	ID_cliente BIGINT(13) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
    Correo VARCHAR(30) NOT NULL,
    Contraseña VARCHAR(150) NOT NULL, /*La encriptare en el programa*/
    Estado INT NOT NULL
);

CREATE TABLE empleados(
	ID_empleado BIGINT(13) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
    Correo VARCHAR(30) NOT NULL,
    Direccion VARCHAR(50) NOT NULL,
    Contraseña VARCHAR(150) NOT NULL, /*La encriptare en el programa*/
    Estado INT NOT NULL
);

CREATE TABLE administradores(
	ID_administrador BIGINT(13) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
    Direccion VARCHAR(50) NOT NULL,
    Contraseña VARCHAR(150) NOT NULL, /*La encriptare en el programa*/
    Estado INT NOT NULL
);

CREATE TABLE categorias_producto(
    ID_categoria INT(4) AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(30) NOT NULL,
    Descripcion VARCHAR(100) NOT NULL,
    Estado INT NOT NULL
);


CREATE TABLE productos(
    ID_producto INT(4) AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    ID_categoria INT NOT NULL,
    Estado INT,
    CONSTRAINT fk_categoria FOREIGN KEY (ID_categoria) REFERENCES categorias_producto(ID_categoria)
);

CREATE TABLE tamano_porcion(
    ID_producto INT(4) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    Precio DECIMAL(10,2),
    Estado INT NOT NULL,
    CONSTRAINT fk_producto_tipo FOREIGN KEY (ID_producto) REFERENCES productos(ID_producto)
);

CREATE TABLE Ventas (
    ID_venta INT(8) AUTO_INCREMENT PRIMARY KEY,
    ID_cliente BIGINT NOT NULL,
    ID_empleado BIGINT NOT NULL,
    Fecha_venta DATETIME NOT NULL,
    Total DECIMAL(10, 2),
    Estado INT, 
    Tipo_venta INT,
    Metodo_pago INT,
    CONSTRAINT fk_cliente FOREIGN KEY (ID_cliente) REFERENCES clientes(ID_cliente),
    CONSTRAINT fk_empleado FOREIGN KEY (ID_empleado) REFERENCES empleados(ID_empleado)
);


CREATE TABLE Detalles_venta (
    ID_venta INT NOT NULL,
    ID_producto INT NOT NULL,
    Tamaño_porcion VARCHAR(50),
    Cantidad INT NOT NULL,
    Precio DECIMAL(10, 2),
    Comentario VARCHAR(100),
    CONSTRAINT fk_venta FOREIGN KEY (ID_venta) REFERENCES ventas(ID_venta),
    CONSTRAINT fk_producto FOREIGN KEY (ID_producto) REFERENCES productos(ID_producto)
);


CREATE TABLE bitacora (
    ID_bitacora INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_registro DATETIME,
    ID_Usuario BIGINT(13),
    Tabla_afectada VARCHAR(50),
    Tipo_evento INT NOT NULL,
    Descripcion VARCHAR(150)
);