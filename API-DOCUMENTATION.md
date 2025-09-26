# E-commerce Microservice API

Este microservicio de e-commerce proporciona gestión de usuarios, direcciones y autenticación JWT con las siguientes características:

## Entidades

### Users (Usuarios)

- `id`: ID único del usuario (auto-generado)
- `email`: Email único del usuario
- `password_hash`: Hash de la contraseña (encriptada con bcrypt)
- `full_name`: Nombre completo del usuario
- `created_at`: Fecha de creación (auto-generada)

### Addresses (Direcciones)

- `id`: ID único de la dirección (auto-generado)
- `user_id`: ID del usuario propietario
- `line1`: Línea de dirección principal
- `city`: Ciudad
- `country`: País
- `is_default`: Indica si es la dirección por defecto

## Endpoints

### Authentication API

#### Registro de Usuario

```bash
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123",
  "full_name": "Juan Pérez"
}

# Respuesta:
{
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "full_name": "Juan Pérez",
    "created_at": "2025-09-26T04:29:08.394Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Inicio de Sesión

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}

# Respuesta:
{
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "full_name": "Juan Pérez",
    "created_at": "2025-09-26T04:29:08.394Z",
    "addresses": [...]
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Perfil de Usuario (Protegido con JWT)

```bash
GET /auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Respuesta:
{
  "id": 1,
  "email": "usuario@example.com",
  "full_name": "Juan Pérez",
  "created_at": "2025-09-26T04:29:08.394Z",
  "addresses": [
    {
      "id": 1,
      "user_id": 1,
      "line1": "Calle Principal 123",
      "city": "Madrid",
      "country": "Spain",
      "is_default": true
    }
  ]
}
```

### Users API

#### Crear Usuario

```bash
POST /users
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123",
  "full_name": "Juan Pérez"
}
```

#### Obtener Todos los Usuarios

```bash
GET /users
```

#### Obtener Usuario por ID

```bash
GET /users/:id
```

#### Actualizar Usuario

```bash
PATCH /users/:id
Content-Type: application/json

{
  "full_name": "Nuevo Nombre",
  "password": "newpassword123"
}
```

#### Eliminar Usuario

```bash
DELETE /users/:id
```

### Addresses API

#### Crear Dirección

```bash
POST /addresses
Content-Type: application/json

{
  "user_id": 1,
  "line1": "Calle Principal 123",
  "city": "Madrid",
  "country": "España",
  "is_default": true
}
```

#### Obtener Todas las Direcciones

```bash
GET /addresses
```

#### Obtener Direcciones por Usuario

```bash
GET /addresses/user/:userId
```

#### Obtener Dirección por Defecto de un Usuario

```bash
GET /addresses/user/:userId/default
```

#### Obtener Dirección por ID

```bash
GET /addresses/:id
```

#### Actualizar Dirección

```bash
PATCH /addresses/:id
Content-Type: application/json

{
  "line1": "Nueva Calle 456",
  "city": "Barcelona"
}
```

#### Establecer Dirección como Por Defecto

```bash
PATCH /addresses/:id/set-default
```

#### Eliminar Dirección

```bash
DELETE /addresses/:id
```

## Características Especiales

- **Autenticación JWT**: Sistema completo de registro, login y protección de rutas
- **Tokens de 24 horas**: Los JWT tokens expiran en 24 horas por seguridad
- **Seguridad de Contraseñas**: Las contraseñas se encriptan con bcrypt antes de almacenarse
- **Validación**: Todos los endpoints incluyen validación de datos de entrada
- **Relaciones**: Los usuarios pueden tener múltiples direcciones
- **Direcciones por Defecto**: Solo una dirección puede ser por defecto por usuario
- **Cascada**: Al eliminar un usuario, se eliminan automáticamente sus direcciones
- **Protección de Rutas**: El endpoint del perfil requiere autenticación JWT

## Tecnologías Utilizadas

- **NestJS**: Framework de Node.js
- **TypeORM**: ORM para manejo de base de datos
- **PostgreSQL**: Base de datos
- **JWT**: JSON Web Tokens para autenticación
- **Passport**: Middleware de autenticación
- **bcrypt**: Encriptación de contraseñas
- **class-validator**: Validación de DTOs
- **Docker**: Containerización

## Cómo Ejecutar

1. Asegúrate de tener Docker y Docker Compose instalados
2. Ejecuta: `docker-compose up --build`
3. La aplicación estará disponible en `http://localhost:3000`
4. PostgreSQL estará disponible en `localhost:5432`
5. pgAdmin estará disponible en `http://localhost:5050` (admin@admin.com / pgadmin4)

## Ejemplos de Uso

### Flujo completo de autenticación:

```bash
# 1. Registrar usuario
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ana@example.com",
    "password": "password123",
    "full_name": "Ana Pérez"
  }'

# Respuesta incluye access_token

# 2. Crear dirección para el usuario
curl -X POST http://localhost:3000/addresses \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 4,
    "line1": "Calle del Sol 789",
    "city": "Valencia",
    "country": "Spain",
    "is_default": true
  }'

# 3. Obtener perfil con direcciones (usando JWT)
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer [JWT_TOKEN_AQUI]"

# 4. Login (alternativa al registro)
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ana@example.com",
    "password": "password123"
  }'
```

### Crear usuario y direcciones (método tradicional):

```bash
# Crear usuario
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123",
    "full_name": "Juan Pérez"
  }'

# Crear dirección por defecto
curl -X POST http://localhost:3000/addresses \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "line1": "Calle Principal 123",
    "city": "Madrid",
    "country": "España",
    "is_default": true
  }'

# Crear segunda dirección
curl -X POST http://localhost:3000/addresses \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "line1": "Avenida Secundaria 456",
    "city": "Barcelona",
    "country": "España",
    "is_default": false
  }'
```
