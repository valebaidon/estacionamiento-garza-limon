# Sistema de Gestión de Estacionamiento

Prueba técnica desarrollada para Grupo Garza Limón.

## Descripción

Aplicación web desarrollada con Node.js, Express y MySQL para administrar el acceso y cobro de un estacionamiento.

El sistema permite registrar entradas y salidas de vehículos, calcular automáticamente el importe a pagar según el tipo de vehículo y generar reportes filtrados por fecha y hora con opción de exportarlos a Excel.

## Tecnologías utilizadas

- Node.js
- Express.js
- EJS
- MySQL
- Bootstrap 5
- ExcelJS

## Arquitectura

El proyecto está desarrollado siguiendo el patrón de diseño MVC (Modelo - Vista - Controlador).

```
controllers/
models/
routes/
views/
services/
config/
public/
```

## Tipos de vehículos

| Tipo | Tarifa |
|-------|---------|
| Oficial | Sin costo |
| Residente | $1.00 MXN por minuto |
| No Residente | $3.00 MXN por minuto |

## Funcionalidades

- Registro de entrada de vehículos
- Registro de salida de vehículos
- Cálculo automático del tiempo de estancia
- Cálculo automático del importe
- Control de vehículos oficiales
- Reportes por fecha y hora
- Exportación de reportes a Excel
- Base de datos relacional en MySQL

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/valebaidon/estacionamiento-garza-limon.git
```

### 2. Entrar al proyecto

```bash
cd estacionamiento-garza-limon
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Crear la base de datos

Crear una base de datos llamada:

```
estacionamiento_db
```

Importar el archivo:

```
estacionamiento.sql
```

### 5. Configurar la conexión

Editar el archivo:

config/db.js

y modificar los siguientes datos según la configuración local de MySQL:

- host
- user
- password
- database

### 6. Ejecutar el proyecto

```bash
npm start
```

Abrir:

```
http://localhost:3000
```

## Autor

Valeria Anais Contreras Baidón

Ingeniería en Sistemas Computacionales

Instituto Tecnológico de Durango