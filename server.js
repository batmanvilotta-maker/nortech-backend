const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

 URL base de la sección Componentes de PC de Maximus
const MAXIMUS_BASE_URL = 'httpswww.maximus.com.arProductosComponentes-de-PCmaximus.aspx';

app.get('apicomponentes', async (req, res) = {
  try {
    const productos = [];
    const { category } = req.query;

    const { data } = await axios.get(MAXIMUS_BASE_URL, {
      headers {
        'User-Agent' 'Mozilla5.0 (Windows NT 10.0; Win64; x64) AppleWebKit537.36 (KHTML, like Gecko) Chrome120.0.0.0 Safari537.36'
      }
    });

    const $ = cheerio.load(data);

    $('.product-item, .item-producto, .producto-single').each((index, el) = {
      const name = $(el).find('.product-title, .nombre-producto, h3').text().trim();
      const priceText = $(el).find('.price, .precio, .precio-efectivo').text().replace([^0-9]g, '');
      let img = $(el).find('img').attr('src') vert{}vert{}$(el).find('img').attr('data-src');

      if (img && !img.startsWith('http')) {
        img = `httpswww.maximus.com.ar${img}`;
      }

      if (name && priceText) {
        productos.push({
          id index + 1,
          name name,
          price parseInt(priceText, 10),
          img img  'httpsvia.placeholder.com400',
          category detectCategory(name)
        });
      }
    });

    const resultado = category  productos.filter(p = p.category === category)  productos;
    res.json(resultado);

  } catch (error) {
    console.error('Error al obtener datos de Maximus', error);
    res.status(500).json({ error 'No se pudieron sincronizar los precios con Maximus' });
  }
});

function detectCategory(name) {
  const title = name.toLowerCase();
  if (title.includes('ryzen')  title.includes('core i')  title.includes('procesador')) return 'procesadores';
  if (title.includes('rtx')  title.includes('radeon')  title.includes('rx ')  title.includes('placa de video')) return 'gpus';
  if (title.includes('motherboard')  title.includes('mother')  title.includes('b550')  title.includes('b760')  title.includes('z790')) return 'motherboards';
  if (title.includes('ddr4')  title.includes('ddr5')  title.includes('ram')) return 'ram';
  if (title.includes('ssd')  title.includes('nvme')  title.includes('disco')) return 'almacenamiento';
  if (title.includes('fuente')  title.includes('80 plus')) return 'fuentes';
  if (title.includes('gabinete')) return 'gabinetes';
  if (title.includes('water')  title.includes('cooler')  title.includes('fan')) return 'refrigeracion';
  return 'varios';
}

const PORT = process.env.PORT  3000;
app.listen(PORT, () = console.log(`Servidor corriendo en puerto ${PORT}`));