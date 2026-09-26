const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

// El catálogo lo arma Rocky (el asistente de Franco) una vez por día con los productos CON STOCK de
// Maximus y su precio + 15%: queda en productos.json de este mismo repo. El servidor lo relee de GitHub
// cada 10 minutos, así los cambios aparecen en la web sin tener que redeployar.
const URL_CATALOGO = 'https://raw.githubusercontent.com/batmanvilotta-maker/nortech-backend/main/productos.json';
const CADA = 10 * 60 * 1000;

let catalogo = require('./productos.json'); // el que vino con el deploy (por si GitHub no responde)
let leidoEn = 0;

async function refrescar() {
  if (Date.now() - leidoEn < CADA) return;
  leidoEn = Date.now();
  try {
    const r = await axios.get(URL_CATALOGO, { timeout: 10000 });
    if (Array.isArray(r.data) && r.data.length > 100) catalogo = r.data;
  } catch (e) {
    console.log('No pude leer el catálogo nuevo, sigo con el anterior:', e.message);
  }
}

app.get('/', (req, res) => {
  res.send('Servidor NORTECH Backend activo.');
});

app.get('/api/componentes', async (req, res) => {
  await refrescar();
  res.json(catalogo);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log('Servidor activo en el puerto ' + PORT);
  refrescar();
});
