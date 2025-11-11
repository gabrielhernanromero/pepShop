// Script simple para probar los endpoints CRUD

const http = require('http');

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: responseData,
        });
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Iniciando pruebas...\n');

  try {
    // 1. GET /api/productos (listar vacío)
    console.log('1️⃣ GET /api/productos (listar)');
    let res = await makeRequest('GET', '/api/productos');
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${res.body}\n`);

    // 2. POST /api/productos (crear)
    console.log('2️⃣ POST /api/productos (crear producto)');
    res = await makeRequest('POST', '/api/productos', {
      name: 'Collar para perro',
      price: 15.99,
      stock: 20,
      description: 'Collar ajustable',
    });
    console.log(`Status: ${res.status}`);
    const createdProduct = JSON.parse(res.body);
    console.log(`Response: ${res.body}\n`);

    // 3. GET /api/productos/:id (obtener por ID)
    if (createdProduct.data && createdProduct.data.id) {
      console.log(`3️⃣ GET /api/productos/${createdProduct.data.id} (obtener por ID)`);
      res = await makeRequest('GET', `/api/productos/${createdProduct.data.id}`);
      console.log(`Status: ${res.status}`);
      console.log(`Response: ${res.body}\n`);

      // 4. PUT /api/productos/:id (actualizar)
      console.log(`4️⃣ PUT /api/productos/${createdProduct.data.id} (actualizar)`);
      res = await makeRequest('PUT', `/api/productos/${createdProduct.data.id}`, {
        price: 19.99,
        stock: 15,
      });
      console.log(`Status: ${res.status}`);
      console.log(`Response: ${res.body}\n`);

      // 5. GET /api/productos (listar con producto)
      console.log('5️⃣ GET /api/productos (listar con producto)');
      res = await makeRequest('GET', '/api/productos');
      console.log(`Status: ${res.status}`);
      console.log(`Response: ${res.body}\n`);

      // 6. DELETE /api/productos/:id (borrar)
      console.log(`6️⃣ DELETE /api/productos/${createdProduct.data.id} (borrar)`);
      res = await makeRequest('DELETE', `/api/productos/${createdProduct.data.id}`);
      console.log(`Status: ${res.status}`);
      console.log(`Response: ${res.body}\n`);
    }

    console.log('✅ Pruebas completadas');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error en pruebas:', err);
    process.exit(1);
  }
}

// Esperar 1 segundo antes de empezar las pruebas
setTimeout(runTests, 1000);
