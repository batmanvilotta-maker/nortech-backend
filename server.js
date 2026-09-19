const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

// Tu API Key de ScraperAPI integrada
const SCRAPER_KEY = 'ec96a0585fdfd72d4410143ca167404c'; 
const MAXIMUS_URL = 'https://www.maximus.com.ar/Productos/Componentes-de-PC/maximus.aspx';

app.get('/', (req, res) => {
  res.send('Servidor NORTECH Backend activo.');
});

app.get('/api/componentes', async (req, res) => {
  try {
    // Solicitud a través de ScraperAPI con renderizado dinámico activado
    const proxyUrl = `http://api.scraperapi.com?api_key=${SCRAPER_KEY}&url=${encodeURIComponent(MAXIMUS_URL)}&render=true`;
    
    const { data } = await axios.get(proxyUrl, { timeout: 45000 });
    const $ = cheerio.load(data);
    const productos = [];

    // Mapeo sobre los elementos del DOM de Maximus
    $('.producto, div[class*="Producto"], .item, article').each((index, el) => {
      const name = $(el).find('h2, h3, .nombre, .title, a[title]').first().text().trim() \vert{}\vert{}$(el).find('a').attr('title') || '';
      const priceText = $(el).find('.precio, .price, span[id*="Precio"]').text().replace(/[^0-9]/g, '');
      let img = $(el).find('img').attr('data-original') || $(el).find('img').attr('data-src') \vert{}\vert{}$(el).find('img').attr('src') || '';

      if (img && !img.startsWith('http')) {
        img = 'https://www.maximus.com.ar' + (img.startsWith('/') ? '' : '/') + img;
      }

      if (name && name.length > 3 && priceText) {
        productos.push({
          id: index + 1,
          name: name,
          price: parseInt(priceText, 10),
          img: img,
          category: detectCategory(name)
        });
      }
    });

    if (productos.length > 0) {
      return res.json(productos);
    }

    res.status(404).json({ error: "No se encontraron elementos en el HTML de Maximus." });

  } catch (error) {
    console.error('Error con ScraperAPI:', error.message);
    res.status(500).json({ error: "Falla de conexión con el proxy", detalle: error.message });
  }
});

function detectCategory(name) {
  const title = name.toLowerCase();
  if (title.includes('ryzen') || title.includes('core i') || title.includes('procesador')) return 'procesadores';
  if (title.includes('rtx') || title.includes('radeon') || title.includes('rx ') || title.includes('geforce')) return 'gpus';
  if (title.includes('motherboard') || title.includes('mother') || title.includes('b550') || title.includes('b760')) return 'motherboards';
  if (title.includes('ddr4') || title.includes('ddr5') || title.includes('ram')) return 'ram';
  if (title.includes('ssd') || title.includes('nvme') || title.includes('disco')) return 'almacenamiento';
  if (title.includes('fuente') || title.includes('80 plus')) return 'fuentes';
  if (title.includes('gabinete')) return 'gabinetes';
  return 'varios';
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Servidor activo en el puerto ' + PORT));
