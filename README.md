# 🛒 E-commerce Microservice - Users & Addresses

Un microservicio de e-commerce construido con **NestJS**, **TypeScript**, **PostgreSQL** y **Docker**. Incluye autenticación JWT, gestión de usuarios y direcciones, y está preparado para despliegue en AWS.

## ✨ Características

- 🔐 **Autenticación JWT** completa
- 👤 **Gestión de usuarios** con perfiles
- 📍 **Sistema de direcciones** con dirección por defecto
- 🐘 **PostgreSQL** como base de datos
- 🐳 **Docker** containerizado
- ☁️ **Despliegue en AWS** (EC2, RDS, CloudFormation)
- 📝 **Validación completa** con class-validator
- 🧪 **Tests incluidos** (unitarios y e2e)

## 🏗️ Arquitectura

### Base de Datos

```sql
-- Usuarios
users (
  id: UUID PRIMARY KEY,
  email: VARCHAR UNIQUE,
  password_hash: VARCHAR,
  full_name: VARCHAR,
  created_at: TIMESTAMP
)

-- Direcciones
addresses (
  id: UUID PRIMARY KEY,
  user_id: UUID (FK → users.id),
  line1: VARCHAR,
  city: VARCHAR,
  country: VARCHAR,
  is_default: BOOLEAN
)
```

### Endpoints API

#### 🔐 Autenticación

- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión y obtener JWT

#### 👤 Usuarios

- `GET /users/me` - Obtener perfil del usuario autenticado

#### 📍 Direcciones

- `POST /addresses` - Crear nueva dirección
- `GET /addresses` - Listar direcciones del usuario
- `PATCH /addresses/:id` - Actualizar dirección
- `DELETE /addresses/:id` - Eliminar dirección

## 🚀 Inicio Rápido

### Prerrequisitos

- Docker y Docker Compose
- Node.js 18+ (opcional, para desarrollo local)

### Instalación y Ejecución

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/marcosotomac/users-microservice-nestjs.git
   cd users-microservice-nestjs
   ```

2. **Ejecutar con Docker (Recomendado)**

   ```bash
   docker-compose up -d
   ```

3. **Verificar que esté corriendo**
   ```bash
   curl http://localhost:3000
   ```

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run start:dev

# Ejecutar tests
npm run test:e2e
```

## 🧪 Testing con Postman

Importa la colección de Postman incluida:

1. Abre Postman
2. Importa `postman-collection.json`
3. Importa `postman-environment.json`
4. Selecciona el entorno "E-commerce API Environment"
5. ¡Comienza a probar los endpoints!

### Flujo de testing recomendado:

1. **Register** → Crear usuario
2. **Login** → Obtener token JWT
3. **Get Profile** → Ver perfil
4. **Create Address** → Agregar dirección
5. **Get Addresses** → Listar direcciones
6. **Update/Delete Address** → Gestionar direcciones

## ☁️ Despliegue en AWS

### Opción 1: Despliegue Manual

1. **EC2 Instance**

   ```bash
   # Crear instancia EC2 t2.micro con Ubuntu
   # Conectar por SSH
   ```

2. **Instalar Docker en EC2**

   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose
   sudo systemctl start docker
   sudo usermod -aG docker ubuntu
   ```

3. **RDS PostgreSQL**
   - Crear instancia RDS PostgreSQL
   - Configurar security groups
   - Obtener connection string

4. **Desplegar aplicación**
   ```bash
   git clone <tu-repo>
   cd users-microservice-nestjs
   docker-compose up -d
   ```

### Opción 2: CloudFormation (Recomendado para Academy)

Usa el template `cloudformation-template.yml` incluido:

```bash
aws cloudformation create-stack \
  --stack-name ecommerce-microservice \
  --template-body file://cloudformation-template.yml \
  --parameters ParameterKey=KeyName,ParameterValue=tu-key-pair
```

### Variables de Entorno para Producción

```env
DATABASE_URL=postgresql://user:password@rds-endpoint:5432/dbname
JWT_SECRET=tu-jwt-secret-super-seguro
NODE_ENV=production
```

## 🐳 Docker Configuration

### Servicios incluidos:

- **app**: Aplicación NestJS
- **db**: PostgreSQL 15
- **nginx**: Reverse proxy (opcional)

### Comandos útiles:

```bash
# Ver logs
docker-compose logs -f app

# Ejecutar comandos en el contenedor
docker-compose exec app npm run test

# Reiniciar servicios
docker-compose restart

# Limpiar todo
docker-compose down -v
```

## 📦 Dependencias Principales

- **@nestjs/core**: Framework principal
- **@nestjs/typeorm**: ORM para TypeORM
- **@nestjs/jwt**: Autenticación JWT
- **@nestjs/passport**: Estrategias de autenticación
- **bcrypt**: Hashing de contraseñas
- **class-validator**: Validación de DTOs
- **pg**: Driver PostgreSQL
- **typeorm**: ORM

## 🧪 Tests

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura
npm run test:cov
```

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- JWT tokens con expiración
- Validación de entrada con class-validator
- CORS configurado
- Rate limiting (implementable)

## 📈 Monitoreo

Para producción, considera agregar:

- **PM2** para gestión de procesos
- **Winston** para logging
- **Health checks** endpoints
- **Metrics** con Prometheus

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Marcos Otomaceda** - [GitHub](https://github.com/marcosotomac)

## 🙏 Agradecimientos

- [NestJS](https://nestjs.com/) - Framework increíble
- [TypeORM](https://typeorm.io/) - ORM poderoso
- [PostgreSQL](https://postgresql.org/) - Base de datos robusta
- Comunidad de NestJS por la documentación y soporte

---

⭐ Si te gusta este proyecto, ¡dale una estrella!

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
