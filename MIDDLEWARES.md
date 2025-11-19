# 📋 Guía de Middlewares - PepShop

Los middlewares son funciones que se ejecutan antes de que llegue la petición al controlador. Son útiles para validación, autenticación, logging y manejo de errores.

## 📂 Estructura de Middlewares

```
src/middlewares/
├── index.js                    # Exporta todos los middlewares
├── validationMiddleware.js     # Validación de datos (productos, mascotas, clientes, turnos, pedidos)
├── errorMiddleware.js          # Manejo centralizado de errores
├── loggerMiddleware.js         # Logging de peticiones
└── authMiddleware.js           # Autenticación básica
```

## 🔧 Middlewares Disponibles

### 1. **validationMiddleware.js**

**Función:** Valida los datos de entrada antes de procesarlos.

**Middlewares:**
- `validateProduct` — Valida campos de productos (name, price, stock)
- `validateMascota` — Valida campos de mascotas (name, species, age, clienteId)
- `validateClient` — Valida campos de clientes (name, email?)
- `validateTurn` — Valida campos de turnos (dateTime, clienteId?)
- `validateOrder` — Valida campos de pedidos (total, clienteId?)

**Uso en rutas:**
```javascript
const { validateProduct } = require('../middlewares');

router.post('/', validateProduct, controller.create);
router.put('/:id', validateProduct, controller.update);
```

**Validaciones aplicadas (resumen):**
- Producto: `name` requerido string no vacío; `price` requerido número >= 0; `stock` opcional entero >= 0
- Mascota: `name` y `species` requeridos string no vacíos; `age` opcional entero >= 0; `clienteId` opcional numérico
- Cliente: `name` requerido string no vacío; `email` opcional string válido (no vacío si viene)
- Turno: `dateTime` requerido; `clienteId` opcional numérico
- Pedido: `total` requerido número >= 0; `clienteId` opcional numérico

**Ejemplo de error:**
```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"price":15.99}'  # Falta name

# Respuesta:
{"success":false,"error":"El campo \"name\" es requerido y debe ser una cadena de texto no vacía"}
```

---

### 2. **errorMiddleware.js**

**Función:** Captura todos los errores no controlados y devuelve respuestas consistentes.

**Middlewares:**
- `errorHandler` — Maneja errores de la aplicación
- `notFoundHandler` — Responde 404 para rutas inexistentes

**Uso en index.js (debe ser el último):**
```javascript
app.use(notFoundHandler);
app.use(errorHandler);
```

**Errores que maneja:**
- Errores de validación de Sequelize (400)
- Errores de constraint (409 Conflict)
- Errores de conexión a BD (503)
- Errores genéricos de servidor (500)

**Ejemplo de error 404:**
```bash
curl http://localhost:3000/api/inexistente

# Respuesta:
{"success":false,"error":"Ruta no encontrada: GET /api/inexistente"}
```

---

### 3. **loggerMiddleware.js**

**Función:** Registra información de cada petición (método, URL, status, tiempo).

**Middlewares:**
- `requestLogger` — Loguea todas las peticiones

**Uso en index.js (global):**
```javascript
const { requestLogger } = require('./src/middlewares');

app.use(requestLogger);
```

**Salida en consola:**
```
🟢 [2025-11-10T20:48:38.885Z] GET /api/productos - Status: 200 - 45ms
🔴 [2025-11-10T20:48:40.123Z] POST /api/mascotas - Status: 400 - 12ms
```

**Colores:**
- 🟢 Verde — Status 2xx (éxito)
- 🟡 Amarillo — Status 3xx (redirección)
- 🔴 Rojo — Status 4xx/5xx (error)

---

### 4. **authMiddleware.js**

**Función:** Verifica autenticación con token simulado (para futuros endpoints protegidos).

**Middlewares:**
- `verifyAdminToken` — Valida token Bearer

**Token simulado:**
```javascript
const ADMIN_TOKEN = 'admin-token-12345';
```

**Uso en rutas (ejemplo):**
```javascript
const { verifyAdminToken } = require('../middlewares');

router.delete('/:id', verifyAdminToken, controller.remove);
```

**Ejemplo de uso con token:**
```bash
curl -X DELETE http://localhost:3000/api/productos/1 \
  -H "Authorization: Bearer admin-token-12345"
```

**Sin token:**
```bash
curl -X DELETE http://localhost:3000/api/productos/1

# Respuesta:
{"success":false,"error":"Token requerido. Use header: Authorization: Bearer <token>"}
```

**Token inválido:**
```bash
curl -X DELETE http://localhost:3000/api/productos/1 \
  -H "Authorization: Bearer token-incorrecto"

# Respuesta:
{"success":false,"error":"Token inválido o expirado"}
```

---

## 🔄 Orden de Ejecución de Middlewares

En `index.js`, el orden importa. Los middlewares se ejecutan **de arriba hacia abajo**:

```javascript
// 1. Parsear JSON
app.use(express.json());

// 2. Loguear peticiones
app.use(requestLogger);

// 3. Definir rutas (pueden tener middlewares específicos)
app.use('/api/productos', productsRouter);
app.use('/api/mascotas', mascotasRouter);

// 4. Manejador 404 (antes del error handler)
app.use(notFoundHandler);

// 5. Manejador de errores (SIEMPRE al final)
app.use(errorHandler);
```

**Nota:** El `errorHandler` debe ser el **ÚLTIMO** middleware.

---

## 💡 Cómo Agregar un Nuevo Middleware

1. Crear archivo en `src/middlewares/tuMiddleware.js`:
```javascript
function tuMiddleware(req, res, next) {
  // Hacer algo
  next(); // Continuar al siguiente middleware
}

module.exports = { tuMiddleware };
```

2. Exportarlo en `src/middlewares/index.js`:
```javascript
const { tuMiddleware } = require('./tuMiddleware');

module.exports = {
  // ... otros middlewares
  tuMiddleware,
};
```

3. Usarlo en una ruta o globalmente:
```javascript
// Global (en index.js)
app.use(tuMiddleware);

// En una ruta específica
router.post('/', tuMiddleware, controller.create);
```

---

## 🧪 Ejemplos de Flujo de Peticiones

### ✅ Crear Producto (Éxito)
```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"name":"Collar","price":9.99,"stock":10}'

# Flujo:
# 1. express.json() parsea el body
# 2. requestLogger loguea la petición
# 3. validateProduct valida los datos ✅
# 4. productsController.create crea el producto
# 5. errorHandler no se ejecuta (sin error)
# 6. Respuesta 201
```

### ❌ Crear Producto (Validación fallida)
```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"price":9.99}'

# Flujo:
# 1. express.json() parsea el body
# 2. requestLogger loguea la petición
# 3. validateProduct FALLA (sin name) ❌
# 4. Devuelve error 400
# 5. errorHandler NO se ejecuta (validateProduct devuelve respuesta)
# 6. Respuesta 400
```

### ⚠️ Ruta no encontrada
```bash
curl http://localhost:3000/api/algo-inexistente

# Flujo:
# 1. express.json() ejecuta (sin body)
# 2. requestLogger loguea la petición
# 3. Ninguna ruta coincide
# 4. notFoundHandler captura ✅
# 5. Respuesta 404
```

---

## 🔐 Próximas Mejoras (Roadmap)

- [ ] Implementar JWT real en lugar de token simulado
- [ ] Añadir middleware de rate limiting (limitar peticiones)
- [ ] Middleware CORS mejorado
- [ ] Middleware de compresión de respuestas (gzip)
- [ ] Integración con sentry para error tracking
- [ ] Middleware de caché

---

**¿Necesitas más middlewares o personalizaciones?** Contacta o revisa la estructura en `src/middlewares/`.
