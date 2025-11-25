# Cómo usar la colección de Postman

## 📥 Importar la colección

### En Postman Desktop:
1. Abre Postman
2. Clic en "Import" (esquina superior izquierda)
3. Arrastra el archivo `PepShop-API.postman_collection.json`
4. ¡Listo! Verás la carpeta "PepShop API" con todos los endpoints

### En Thunder Client (VS Code):
1. Abre Thunder Client desde la barra lateral
2. Clic en los tres puntos (...) → "Import"
3. Selecciona el archivo `PepShop-API.postman_collection.json`
4. Confirma la importación

## 🚀 Orden sugerido para probar

### 1. Primero crea un cliente
**POST** `/api/clientes`
```json
{
  "name": "Test User",
  "email": "test@ejemplo.com",
  "phone": "555-1234",
  "password": "Password123"
}
```

### 2. Haz login con ese cliente
**POST** `/api/auth/login`
```json
{
  "email": "test@ejemplo.com",
  "password": "Password123"
}
```
👉 **Guarda el token** que retorna (lo puedes usar para rutas protegidas futuras)

### 3. Crea un producto
**POST** `/api/productos`
```json
{
  "name": "Collar para perro",
  "description": "Collar ajustable",
  "price": 15.99,
  "stock": 20
}
```

### 4. Crea una mascota para ese cliente
**POST** `/api/mascotas`
```json
{
  "name": "Rex",
  "species": "Perro",
  "breed": "Labrador",
  "age": 3,
  "clienteId": 1
}
```
⚠️ Cambia `clienteId` por el ID del cliente que creaste

### 5. Lista todo para verificar
- **GET** `/api/clientes`
- **GET** `/api/productos`
- **GET** `/api/mascotas`

## 🔧 Variables de entorno

La colección usa estas variables:
- `{{baseUrl}}`: http://localhost:3000 (ya configurada)
- `{{token}}`: Para guardar el JWT del login (configurar manualmente)

### Cómo configurar el token:
1. Después del login, copia el token de la respuesta
2. En Postman: Clic en "Environments" → Editar → Pegar en variable `token`
3. En Thunder Client: Settings → Env → Agregar variable `token`

## 📋 Todos los endpoints disponibles

### Auth
- `POST /api/auth/login` - Login con email/password

### Clientes
- `GET /api/clientes` - Listar todos
- `GET /api/clientes/:id` - Obtener uno
- `POST /api/clientes` - Crear
- `PUT /api/clientes/:id` - Actualizar
- `DELETE /api/clientes/:id` - Eliminar

### Productos
- `GET /api/productos` - Listar todos
- `GET /api/productos/:id` - Obtener uno
- `POST /api/productos` - Crear
- `PUT /api/productos/:id` - Actualizar
- `DELETE /api/productos/:id` - Eliminar

### Mascotas
- `GET /api/mascotas` - Listar todas
- `GET /api/mascotas/:id` - Obtener una
- `POST /api/mascotas` - Crear
- `PUT /api/mascotas/:id` - Actualizar
- `DELETE /api/mascotas/:id` - Eliminar

### Turnos
- `GET /api/turnos` - Listar todos
- `GET /api/turnos/:id` - Obtener uno
- `POST /api/turnos` - Crear
- `PUT /api/turnos/:id` - Actualizar
- `DELETE /api/turnos/:id` - Eliminar

### Pedidos
- `GET /api/pedidos` - Listar todos
- `GET /api/pedidos/:id` - Obtener uno
- `POST /api/pedidos` - Crear
- `PUT /api/pedidos/:id` - Actualizar
- `DELETE /api/pedidos/:id` - Eliminar

## 💡 Tips

- Los endpoints POST/PUT requieren header `Content-Type: application/json` (ya incluido)
- Las contraseñas se hashean automáticamente al crear clientes
- Las respuestas nunca exponen el hash de password ni el salt
- El token JWT expira en 2 horas
- Todos los modelos tienen `createdAt` y `updatedAt` automáticos

## ⚠️ Importante

Asegúrate de que:
1. MySQL esté corriendo
2. El servidor Node esté iniciado (`npm start` o `npm run dev`)
3. La base de datos `pepShop` exista
4. Las variables de entorno estén configuradas en `.env`
