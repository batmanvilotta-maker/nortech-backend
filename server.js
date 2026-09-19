const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

// URL oficial de la tienda Maximus
const MAXIMUS_URL = 'https://www.maximus.com.ar/Productos/Componentes-de-PC/maximus.aspx';

app.get('/api/componentes', async (req, res) => {
  try {
    // Intentamos extraer el HTML real con headers de navegador humano completo
    const { data } = await axios.get(MAXIMUS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'es-AR,es;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'max-age=0',
        'Referer': 'https://www.google.com/',
        'Sec-Ch-Ua': '"Not-A.Brand";v="99", "Chromium";v="124", "Google Chrome";v="124"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 15000
    });

    const $ = cheerio.load(data);
    const productos = [];

    // Selectores específicos de la estructura del DOM de Maximus
    $('.producto, div[class*="Producto"], .item-producto, article').each((index, el) => {
      const name = $(el).find('.nombre, h2, h3, .title, a[title]').first().text().trim() || $(el).find('a').attr('title') || '';
      const priceText = $(el).find('.precio, .price, span[id*="Precio"]').text().replace(/[^0-9]/g, '');
      let img = $(el).find('img').attr('data-original') || $(el).find('img').attr('data-src') || $(el).find('img').attr('src') || '';

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

    // Si logró traspasar el filtro de Cloudflare, responde con los datos en vivo
    if (productos.length > 0) {
      return res.json(productos);
    }

    // Si Cloudflare devolvió un HTML de verificación/desafío CAPTCHA
    res.status(503).json({
      error: "Cloudflare bloqueó la IP de Render.",
      sugerencia: "Se requiere integración de Puppeteer Stealth o un servicio de Proxy como ScraperAPI."
    });

  } catch (error) {
    res.status(500).json({ error: "Error al intentar consultar a Maximus", detalle: error.message });
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
app.listen(PORT, () => console.log('Servidor en escucha en puerto ' + PORT));
