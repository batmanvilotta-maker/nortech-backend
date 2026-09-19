const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

const SCRAPER_KEY = 'ec96a0585fdfd72d4410143ca167404c'; 
const MAXIMUS_URL = 'https://www.maximus.com.ar/Productos/Componentes-de-PC/maximus.aspx';

app.get('/', (req, res) => {
  res.send('Servidor NORTECH Backend activo.');
});

app.get('/api/componentes', async (req, res) => {
  try {
    const proxyUrl = 'http://api.scraperapi.com?api_key=' + SCRAPER_KEY + '&url=' + encodeURIComponent(MAXIMUS_URL) + '&render=true';
    
    const { data } = await axios.get(proxyUrl, { timeout: 45000 });
    const $ = cheerio.load(data);
    const productos = [];

    $('.producto, div[class*="Producto"], .item, article').each((index, el) => {
      let name = $(el).find('h2, h3, .nombre, .title, a[title]').first().text().trim();
      if (!name) {
        name = $(el).find('a').attr('title');
      }
      if (!name) {
        name = '';
      }

      const priceText = $(el).find('.precio, .price, span[id*="Precio"]').text().replace(/[^0-9]/g, '');

      let img = $(el).find('img').attr('data-original');
      if (!img) img = $(el).find('img').attr('data-src');
      if (!img) img = $(el).find('img').attr('src');
      if (!img) img = '';

      if (img && !img.startsWith('http')) {
        let prefix = '/';
        if (img.startsWith('/')) prefix = '';
        img = 'https://www.maximus.com.ar' + prefix + img;
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
  if (title.indexOf('ryzen') !== -1 || title.indexOf('core i') !== -1 || title.indexOf('procesador') !== -1) return 'procesadores';
  if (title.indexOf('rtx') !== -1 || title.indexOf('radeon') !== -1 || title.indexOf('rx ') !== -1 || title.indexOf('geforce') !== -1) return 'gpus';
  if (title.indexOf('motherboard') !== -1 || title.indexOf('mother') !== -1 || title.indexOf('b550') !== -1 || title.indexOf('b760') !== -1) return 'motherboards';
  if (title.indexOf('ddr4') !== -1 || title.indexOf('ddr5') !== -1 || title.indexOf('ram') !== -1) return 'ram';
  if (title.indexOf('ssd') !== -1 || title.indexOf('nvme') !== -1 || title.indexOf('disco') !== -1) return 'almacenamiento';
  if (title.indexOf('fuente') !== -1 || title.indexOf('80 plus') !== -1) return 'fuentes';
  if (title.indexOf('gabinete') !== -1) return 'gabinetes';
  return 'varios';
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Servidor activo en el puerto ' + PORT));
