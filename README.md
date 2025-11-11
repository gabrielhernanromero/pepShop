# PepShop - API REST con Express.js y Sequelize

Servidor web completo para gestionar una tienda de mascotas (PepShop) construido con Node.js, Express y Sequelize ORM con base de datos SQLite.

## 🚀 Características

- **API REST completa** para gestionar productos y mascotas
- **Base de datos SQLite** — sin configuración externa, perfecto para desarrollo local
- **Sequelize ORM** — acceso a datos tipado y migraciones integradas
- **Estructura de carpetas organizada** — services, controllers, routes, models, middlewares
- **Middlewares reutilizables** — validación, manejo de errores, logging, autenticación
- **Middlewares Express** — `express.json()`, manejo de errores centralizado
- **Scripts npm listos** — `npm start` y `npm run dev` (con nodemon)

## � Estructura del Proyecto

```
PepShop/
├── index.js                      # Punto de entrada (servidor Express)
├── package.json                  # Dependencias y scripts
├── .env                          # Variables de entorno (DATABASE_URL)
├── dev.db                        # Base de datos SQLite (auto-generado)
├── models/
│   └── index.js                  # Configuración Sequelize y modelos (Product, Mascota, Cliente, Turno, Pedido)
├── services/
│   ├── productsService.js        # Lógica de negocio para productos
│   ├── mascotasService.js        # Lógica de negocio para mascotas
│   ├── clientsService.js         # Lógica de negocio para clientes
│   ├── turnsService.js           # Lógica de negocio para turnos
│   └── ordersService.js          # Lógica de negocio para pedidos
├── controllers/
│   ├── productsController.js     # Manejadores de peticiones HTTP (productos)
│   ├── mascotasController.js     # Manejadores de peticiones HTTP (mascotas)
│   ├── clientsController.js      # Manejadores de peticiones HTTP (clientes)
│   ├── turnsController.js        # Manejadores de peticiones HTTP (turnos)
│   └── ordersController.js       # Manejadores de peticiones HTTP (pedidos)
├── routes/
│   ├── products.js               # Definición de endpoints de productos
│   ├── mascotas.js               # Definición de endpoints de mascotas
│   ├── clients.js                # Definición de endpoints de clientes
│   ├── turns.js                  # Definición de endpoints de turnos
│   └── orders.js                 # Definición de endpoints de pedidos
├── middlewares/
│   ├── index.js                  # Exporta todos los middlewares
│   ├── validationMiddleware.js   # Validación de datos
│   ├── errorMiddleware.js        # Manejo centralizado de errores
│   ├── loggerMiddleware.js       # Logging de peticiones
│   └── authMiddleware.js         # Autenticación básica
├── test.js                       # Script de pruebas (opcional)
├── README.md                     # Esta documentación
└── MIDDLEWARES.md                # Documentación de middlewares
```

## 📦 Instalación

1. **Clonar o descargar el proyecto**
```bash
cd /Users/gabrielromero/Desktop/PepShop
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar el servidor**
```bash
npm start
# O con nodemon (reload automático):
npm run dev
```

El servidor se iniciará en `http://localhost:3000` y sincronizará la base de datos SQLite automáticamente.

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
  -d '{"name":"Rex","species":"Perro","breed":"Labrador","age":3}'
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
    "createdAt": "2025-11-10T20:48:38.885Z",
    "updatedAt": "2025-11-10T20:48:38.885Z"
  }
}
```

#### Listar mascotas
```bash
curl http://localhost:3000/api/mascotas
```

## 🔧 Configuración

### Variables de Entorno (`.env`)
```
DATABASE_URL="file:./dev.db"
PORT=3000
```

- `DATABASE_URL`: Ruta de la base de datos SQLite (local).
- `PORT`: Puerto en el que escucha el servidor (por defecto 3000).

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

---

## 🔧 Middlewares

La aplicación incluye varios middlewares reutilizables:

- **validationMiddleware** — Valida datos de entrada (nombre, precio, stock, especie, edad)
- **errorMiddleware** — Manejo centralizado de errores y rutas 404
- **loggerMiddleware** — Registra todas las peticiones (método, URL, status, tiempo)
- **authMiddleware** — Autenticación básica con token simulado

Para más detalles, consulta [MIDDLEWARES.md](./MIDDLEWARES.md).

## 🛠️ Scripts npm

```bash
# Iniciar servidor en producción
npm start

# Iniciar servidor con nodemon (reload automático en desarrollo)
npm run dev

# Ejecutar pruebas básicas (script test.js)
node test.js
```

## 🧪 Pruebas

Se incluye un script `test.js` que prueba los endpoints CRUD:
```bash
# Iniciar servidor en background y ejecutar tests
npm start &
sleep 2
node test.js
```

El script:
1. Lista productos (GET)
2. Crea un producto (POST)
3. Obtiene el producto por ID (GET)
4. Actualiza el producto (PUT)
5. Lista nuevamente (GET)
6. Elimina el producto (DELETE)

## 🚀 Próximas mejoras (roadmap)

- [ ] Validación de entrada con `joi` o `yup`
- [ ] Tests unitarios con Jest
- [ ] Autenticación con JWT
- [ ] Paginación en listados
- [ ] Filtros y búsqueda en productos
- [ ] Manejo de transacciones
- [ ] Docker setup para despliegue
- [ ] Integración con PostgreSQL para producción
- [ ] Swagger/OpenAPI documentation

## 🔄 Migración a PostgreSQL (para producción)

Si quieres cambiar de SQLite a PostgreSQL en producción, solo necesitas:

1. Instalar el driver de PostgreSQL:
```bash
npm install pg
```

2. Actualizar el `models/index.js`:
```javascript
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'pepshop',
  logging: false,
});
```

3. Actualizar `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=pepshop
PORT=3000
```

## 📝 Notas

- La base de datos SQLite se crea automáticamente en `dev.db` al iniciar el servidor.
- Los datos persisten entre reinicios (aunque en desarrollo puedes borrar `dev.db` para limpiar).
- Sequelize se configura con `logging: false` para no mostrar queries en la consola; puedes cambiarlo a `true` para debug.

## 📄 Licencia

ISC

---

**¿Necesitas ayuda?** Revisa los endpoints en el section de API o consulta el código en `routes/`, `controllers/` y `services/`.
