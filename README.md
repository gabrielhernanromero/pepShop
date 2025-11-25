# PepShop - API REST con Express.js y Sequelize

Servidor web completo para gestionar una tienda de mascotas (PepShop) construido con Node.js, Express y Sequelize ORM con base de datos MySQL.

## 🚀 Características

- **API REST completa** para gestionar productos, clientes, mascotas, turnos y pedidos
- **Base de datos MySQL** — potente sistema de gestión de base de datos relacional
- **Sequelize ORM** — acceso a datos tipado y sincronización automática de esquemas
- **Estructura de carpetas organizada** — services, controllers, routes, models, middlewares, conection
- **Middlewares reutilizables** — validación, manejo de errores, logging, autenticación
- **Middlewares Express** — `express.json()`, manejo de errores centralizado
- **Scripts npm listos** — `npm start` y `npm run dev` (con nodemon)
- **Relaciones entre modelos** — Cliente tiene Mascotas, Turnos y Pedidos

## 📁 Estructura del Proyecto

```
PepShop/
├── index.js                      # Punto de entrada (servidor Express e inicialización)
├── package.json                  # Dependencias y scripts
├── .env                          # Variables de entorno (opcional)
├── models/
│   ├── index.js                  # Agregador de modelos y asociaciones
│   ├── Product.js                # Modelo de Producto
│   ├── Cliente.js                # Modelo de Cliente
│   ├── Mascota.js                # Modelo de Mascota (FK: clienteId)
│   ├── Turno.js                  # Modelo de Turno (FK: clienteId)
│   └── Pedido.js                 # Modelo de Pedido (FK: clienteId)
├── src/
│   ├── conection/
│   │   └── conection.js          # Configuración de Sequelize con MySQL
│   ├── services/
│   │   ├── productsService.js    # Lógica de negocio para productos
│   │   ├── mascotasService.js    # Lógica de negocio para mascotas
│   │   ├── clientsService.js     # Lógica de negocio para clientes
│   │   ├── turnsService.js       # Lógica de negocio para turnos
│   │   └── ordersService.js      # Lógica de negocio para pedidos
│   ├── controllers/
│   │   ├── productsController.js # Manejadores de peticiones HTTP (productos)
│   │   ├── mascotasController.js # Manejadores de peticiones HTTP (mascotas)
│   │   ├── clientsController.js  # Manejadores de peticiones HTTP (clientes)
│   │   ├── turnsController.js    # Manejadores de peticiones HTTP (turnos)
│   │   └── ordersController.js   # Manejadores de peticiones HTTP (pedidos)
│   ├── routes/
│   │   ├── products.js           # Definición de endpoints de productos
│   │   ├── mascotas.js           # Definición de endpoints de mascotas
│   │   ├── clients.js            # Definición de endpoints de clientes
│   │   ├── turns.js              # Definición de endpoints de turnos
│   │   └── orders.js             # Definición de endpoints de pedidos
│   └── middlewares/
│       ├── index.js              # Exporta todos los middlewares
│       ├── validationMiddleware.js   # Validación de datos
│       ├── errorMiddleware.js        # Manejo centralizado de errores
│       ├── loggerMiddleware.js       # Logging de peticiones
│       └── authMiddleware.js         # Autenticación básica
└── README.md                     # Esta documentación
```

## 📦 Instalación

### Prerrequisitos

- **Node.js** (v14 o superior)
- **MySQL** (v5.7 o superior) o **MAMP/XAMPP** para desarrollo local
- **npm** (incluido con Node.js)

### Pasos de instalación

1. **Clonar o descargar el proyecto**
```bash
cd /Users/gabrielromero/Desktop/PepShop
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

   - Copiar el archivo `.env.example` y renombrarlo a `.env`:
   ```bash
   cp .env.example .env
   ```

   - Editar el archivo `.env` con tus credenciales de MySQL:
   ```env
   DB_NAME="pepShop"
   DB_USER="root"
   DB_PASSWORD="root"
   DB_HOST="localhost"
   DB_PORT="8889"
   DB_DIALECT="mysql"
   SERVER_PORT=3000
   ```

   **Nota:** El archivo `.env.example` sirve como guía para saber qué variables configurar. Nunca subas el archivo `.env` a GitHub ya que contiene información sensible.

4. **Configurar la base de datos MySQL**

   - Crear la base de datos `pepShop` en MySQL:
   ```sql
   CREATE DATABASE pepShop;
   ```

   - La configuración de conexión se toma automáticamente del archivo `.env`

5. **Ejecutar el servidor**
```bash
npm start
# O con nodemon (reload automático):
npm run dev
```

El servidor se iniciará en `http://localhost:3000`, autenticará la conexión MySQL y sincronizará las tablas automáticamente.

## 📡 API Endpoints

Todos los endpoints devuelven JSON con estructura: `{ success: boolean, data: any, error?: string }`

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Listar todos los productos |
| GET | `/api/productos/:id` | Obtener un producto por ID |
| POST | `/api/productos` | Crear un nuevo producto |
| PUT | `/api/productos/:id` | Actualizar un producto |
| DELETE | `/api/productos/:id` | Eliminar un producto |

### Mascotas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/mascotas` | Listar todas las mascotas |
| GET | `/api/mascotas/:id` | Obtener una mascota por ID |
| POST | `/api/mascotas` | Crear una nueva mascota |
| PUT | `/api/mascotas/:id` | Actualizar una mascota |
| DELETE | `/api/mascotas/:id` | Eliminar una mascota |

### Clientes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/clientes` | Listar todos los clientes |
| GET | `/api/clientes/:id` | Obtener un cliente por ID |
| POST | `/api/clientes` | Crear un nuevo cliente |
| PUT | `/api/clientes/:id` | Actualizar un cliente |
| DELETE | `/api/clientes/:id` | Eliminar un cliente |

### Turnos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/turnos` | Listar todos los turnos |
| GET | `/api/turnos/:id` | Obtener un turno por ID |
| POST | `/api/turnos` | Crear un nuevo turno |
| PUT | `/api/turnos/:id` | Actualizar un turno |
| DELETE | `/api/turnos/:id` | Eliminar un turno |

### Pedidos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/pedidos` | Listar todos los pedidos |
| GET | `/api/pedidos/:id` | Obtener un pedido por ID |
| POST | `/api/pedidos` | Crear un nuevo pedido |
| PUT | `/api/pedidos/:id` | Actualizar un pedido |
| DELETE | `/api/pedidos/:id` | Eliminar un pedido |

### Ejemplos de uso

#### Crear un producto
```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"name":"Collar para perro","price":15.99,"stock":20,"description":"Collar ajustable"}'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Collar para perro",
    "description": "Collar ajustable",
    "price": 15.99,
    "stock": 20,
    "createdAt": "2025-11-10T20:40:55.294Z",
    "updatedAt": "2025-11-10T20:40:55.294Z"
  }
}
```

#### Listar productos
```bash
curl http://localhost:3000/api/productos
```

#### Obtener un producto por ID
```bash
curl http://localhost:3000/api/productos/1
```

#### Actualizar un producto
```bash
curl -X PUT http://localhost:3000/api/productos/1 \
  -H "Content-Type: application/json" \
  -d '{"price":19.99,"stock":15}'
```

#### Eliminar un producto
```bash
curl -X DELETE http://localhost:3000/api/productos/1
```

#### Crear una mascota
```bash
curl -X POST http://localhost:3000/api/mascotas \
  -H "Content-Type: application/json" \
  -d '{"name":"Rex","species":"Perro","breed":"Labrador","age":3,"clienteId":1}'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Rex",
    "species": "Perro",
    "breed": "Labrador",
    "age": 3,
    "clienteId": 1,
    "createdAt": "2025-11-15T20:48:38.885Z",
    "updatedAt": "2025-11-15T20:48:38.885Z"
  }
}
```

#### Crear un cliente
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@example.com","phone":"555-1234","password":"MiPasswordSegura123"}'
```

#### Listar mascotas
```bash
curl http://localhost:3000/api/mascotas
```

## 🔧 Configuración

### Conexión a MySQL

La configuración de la base de datos está en `src/conection/conection.js`:

```javascript
const { Sequelize } = require('sequelize');

const conection = new Sequelize('pepShop', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 8889,  // Puerto de MAMP (cambiar a 3306 para MySQL estándar)
  logging: false,  // Cambiar a true para ver queries SQL
});

module.exports = conection;
```

Para cambiar la configuración, modifica los parámetros:
- **database**: nombre de la base de datos
- **username**: usuario de MySQL
- **password**: contraseña de MySQL
- **host**: servidor de MySQL (localhost por defecto)
- **port**: puerto de MySQL (8889 para MAMP, 3306 para MySQL estándar)

### Variables de Entorno (opcional)

Puedes crear un archivo `.env` para configurar variables:
```
PORT=3000
DB_HOST=localhost
DB_PORT=8889
DB_USER=root
DB_PASSWORD=root
DB_NAME=pepShop
```

### Modelos de Datos

#### Product
```javascript
{
  id: Integer (PK, auto-increment),
  name: String (requerido),
  description: Text (opcional),
  price: Float (requerido, default 0),
  stock: Integer (requerido, default 0),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

#### Cliente
```javascript
{
  id: Integer (PK, auto-increment),
  name: String (requerido),
  email: String (opcional),
  phone: String (opcional),
  password: String (hash bcrypt, requerido),
  salt: String (salt usado para generar el hash),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

#### Mascota
```javascript
{
  id: Integer (PK, auto-increment),
  name: String (requerido),
  species: String (requerido),
  breed: String (opcional),
  age: Integer (opcional),
  clienteId: Integer (FK a Cliente, requerido),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

#### Turno
```javascript
{
  id: Integer (PK, auto-increment),
  dateTime: DateTime (requerido),
  reason: String (opcional),
  status: String (requerido, default 'pendiente'),
  clienteId: Integer (FK a Cliente, requerido),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

#### Pedido
```javascript
{
  id: Integer (PK, auto-increment),
  total: Float (requerido, default 0),
  status: String (requerido, default 'pendiente'),
  clienteId: Integer (FK a Cliente, requerido),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Relaciones entre Modelos

- **Cliente** `hasMany` **Mascota** (un cliente puede tener muchas mascotas)
- **Mascota** `belongsTo` **Cliente** (cada mascota pertenece a un cliente)
- **Cliente** `hasMany` **Turno** (un cliente puede tener muchos turnos)
- **Turno** `belongsTo` **Cliente** (cada turno pertenece a un cliente)
- **Cliente** `hasMany` **Pedido** (un cliente puede tener muchos pedidos)
- **Pedido** `belongsTo` **Cliente** (cada pedido pertenece a un cliente)
```javascript
{
  id: Integer (PK, auto-increment),
  name: String (requerido),
  species: String (requerido),
  breed: String (opcional),
  age: Integer (opcional),
  clienteId: Integer (FK a Cliente, requerido),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

---

## 🔧 Middlewares

La aplicación incluye varios middlewares reutilizables ubicados en `src/middlewares/`:

- **validationMiddleware** — Valida datos de entrada (nombre, precio, stock, especie, edad, email, etc.)
- **errorMiddleware** — Manejo centralizado de errores y rutas 404
- **loggerMiddleware** — Registra todas las peticiones (método, URL, status, tiempo)
- **authMiddleware** — Autenticación básica con token simulado

Todos se exportan desde `src/middlewares/index.js`.

## 🔐 Gestión de Contraseñas (Clientes)

Para el modelo `Cliente` se implementó almacenamiento seguro de contraseñas usando **bcrypt**.

### Campos añadidos
- `password`: almacena el hash de la contraseña (nunca texto plano).
- `salt`: almacena el salt generado por bcrypt para esa contraseña.

### Hook `beforeCreate`
Al crear un cliente:
1. Se genera un salt con `bcrypt.genSalt(10)`.
2. Se genera el hash con `bcrypt.hash(plainPassword, salt)`.
3. Se guarda el `salt` y el hash en los campos correspondientes antes de que el registro se inserte.

### Métodos de verificación
- Método de instancia: `cliente.verifyPassword(plain)` retorna `true/false` comparando la contraseña ingresada con el hash.
- Método estático: `Cliente.decodeVerifyPass(plain, hash)` permite verificar manualmente un hash si se necesita.

### Sanitización de respuestas
El controlador de clientes elimina `password` y `salt` antes de enviar respuestas JSON para evitar exponer información sensible.

### Ejemplo de verificación
```javascript
const Cliente = require('./src/models/Cliente');
const user = await Cliente.findByPk(1);
const ok = await user.verifyPassword('MiPasswordSegura123'); // true si coincide
```

### Creación de cliente (POST)
El endpoint `/api/clientes` ahora requiere el campo `password`:
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana","email":"ana@example.com","phone":"555-9999","password":"OtraPasswordFuerte!"}'
```

### Notas de seguridad futuras
- Implementar rotación de salt sólo al cambiar contraseña.
- Agregar política de complejidad de password (longitud mínima, caracteres especiales).
- Migrar a autenticación con JWT en endpoints protegidos.
- Evitar devolver el objeto `Cliente` sin sanitización en nuevos servicios.

## 🔑 Autenticación (Login con JWT)

Se implementó un endpoint de login que genera tokens **JWT** para autenticar solicitudes posteriores.

### Endpoint
`POST /api/auth/login`

### Body (JSON)
```json
{
  "email": "demo@local.test",
  "password": "SuperSegura123"
}
```

### Respuesta exitosa
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "demo@local.test",
    "name": "Demo User"
  }
}
```

### Flujo interno
1. Se valida formato de email y que ambos campos existan.
2. Se busca el usuario por email en la base de datos.
3. Se verifica la contraseña con `bcrypt.compare` (método `verifyPassword`).
4. Se construye un payload público `{ id, email, name }`.
5. Se firma el token con `jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' })`.
6. Se retorna el token y los datos públicos del usuario (sin password ni salt).

### Uso del token en peticiones protegidas
Enviar el token en el encabezado `Authorization`:
```
Authorization: Bearer <token>
```

### Variable de entorno necesaria
Agregar en tu `.env` (ya documentado en `.env.example`):
```
JWT_SECRET="tuClaveSecretaMuySegura"
```
Si falta, se usa un valor por defecto (`pepShopSuperSecreto`) sólo apto para desarrollo.

### Probar con curl
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@local.test","password":"SuperSegura123"}'
```

### Próximos pasos sugeridos
- Crear middleware que valide y decodifique el JWT para proteger rutas.
- Añadir roles/permisos dentro del payload (por ejemplo `role: 'admin'`).
- Refrescar tokens (refresh token + access token) para sesiones largas.
- Invalidar tokens rotando `JWT_SECRET` en producción bajo políticas.

## 🛠️ Scripts npm

```bash
# Iniciar servidor en producción
npm start

# Iniciar servidor con nodemon (reload automático en desarrollo)
npm run dev
```

Al iniciar, el servidor:
1. Autentica la conexión con MySQL
2. Sincroniza las tablas automáticamente (con `alter: true`)
3. Monta las rutas de la API
4. Escucha en el puerto 3000

## 🚀 Próximas mejoras (roadmap)

- [ ] Validación de entrada con `joi` o `yup`
- [ ] Tests unitarios con Jest
- [ ] Autenticación con JWT
- [ ] Paginación en listados
- [ ] Filtros y búsqueda avanzada
- [ ] Manejo de transacciones
- [ ] Docker setup para despliegue
- [ ] Migraciones con Sequelize CLI
- [ ] Seeders para datos de prueba
- [ ] Swagger/OpenAPI documentation

## 🔄 Gestión de la Base de Datos

### Sincronización Automática

El servidor usa `conection.sync({ alter: true })` que:
- Crea las tablas si no existen
- Actualiza las columnas si cambia el modelo
- **No elimina** datos existentes

### Reiniciar la Base de Datos

Para empezar desde cero:
```sql
DROP DATABASE pepShop;
CREATE DATABASE pepShop;
```

Luego reinicia el servidor y las tablas se crearán automáticamente.

## 📝 Notas

- La base de datos MySQL debe estar ejecutándose antes de iniciar el servidor.
- Las tablas se crean/actualizan automáticamente al iniciar con `sync({ alter: true })`.
- Sequelize se configura con `logging: false` para no mostrar queries en la consola; puedes cambiarlo a `true` para debug.
- Para producción, considera usar migraciones en lugar de `sync()`.
- Los modelos están en la carpeta `models/` en la raíz del proyecto.
- La conexión y la lógica de negocio están organizadas dentro de `src/`.

## � Tecnologías

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web minimalista
- **Sequelize** - ORM para Node.js
- **MySQL** - Sistema de gestión de base de datos relacional
- **mysql2** - Driver de MySQL para Node.js
- **Nodemon** - Herramienta de desarrollo para reinicio automático



**¿Necesitas ayuda?** Revisa los endpoints en la sección de API o consulta el código en `src/routes/`, `src/controllers/` y `src/services/`.
