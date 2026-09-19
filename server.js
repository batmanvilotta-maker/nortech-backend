const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/componentes', async (req, res) => {
  try {
    // Intentamos consumir la sección de ofertas / lista de Maximus
    const { data } = await axios.get('https://www.maximus.com.ar/Productos/Componentes-de-PC/maximus.aspx', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-AR,es;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 12000
    });

    const $ = cheerio.load(data);
    const productos = [];

    $('.producto, div[class*="producto"], .item, article').each((index, el) => {
      const name = $(el).find('h2, h3, .nombre, .title, a[title]').first().text().trim() || $(el).find('a').attr('title') || '';
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

    // Si devolvió productos reales de Maximus los mostramos
    if (productos.length > 0) {
      return res.json(productos);
    }

    // Si el servidor fue bloqueado por Cloudflare, lanzamos respuesta clara
    res.status(503).json({ 
      error: 'Maximus bloqueó la conexión automática de Render.',
      status: 'blocked' 
    });

  } catch (error) {
    console.error('Error al intentar conectar:', error.message);
    res.status(500).json({ error: 'Error de red o bloqueo de Cloudflare', detalles: error.message });
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
