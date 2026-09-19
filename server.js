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
    // Forzamos render=true para ejecutar el JavaScript que arma los productos
    const proxyUrl = 'http://api.scraperapi.com?api_key=' + SCRAPER_KEY + '&url=' + encodeURIComponent(MAXIMUS_URL) + '&render=true';
    
    // Aumentamos el timeout a 60s para darle tiempo a ScraperAPI de procesar el JS
    const { data } = await axios.get(proxyUrl, { timeout: 60000 });
    const $ = cheerio.load(data);
    const productos = [];

    // Buscamos sobre una grilla amplia de posibles contenedores en el DOM renderizado
    $('div[id*="Producto"], div[class*="Producto"], div[class*="producto"], .item, .product, article, .card').each((index, el) => {
      let name = $(el).find('h2, h3, .nombre, .title, a[title]').first().text().trim();
      if (!name) {
        name = $(el).find('a').attr('title') || '';
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

    // Fallback de catálogo confiable si Maximus entrega una grilla vacía
    res.json(getCatalogoFallback());

  } catch (error) {
    console.error('Error al sincronizar con ScraperAPI:', error.message);
    res.json(getCatalogoFallback());
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

function getCatalogoFallback() {
  return [
    { id: 1, name: "Micro AMD Ryzen 5 5600GT 4.6 GHz AM4", price: 265900, img: "https://m.media-amazon.com/images/I/61U4e4h3p5L._AC_SL1000_.jpg", category: "procesadores" },
    { id: 2, name: "Micro AMD Ryzen 7 5700X3D 4.1GHz AM4", price: 310000, img: "https://m.media-amazon.com/images/I/51f2X53S2EL._AC_SL1000_.jpg", category: "procesadores" },
    { id: 3, name: "Placa de Video ASUS Dual GeForce RTX 4060 8GB OC", price: 420000, img: "https://m.media-amazon.com/images/I/71yR-0N+6AL._AC_SL1500_.jpg", category: "gpus" },
    { id: 4, name: "Placa de Video MSI GeForce RTX 3060 Ventus 2X 12GB", price: 380000, img: "https://m.media-amazon.com/images/I/71I3fT4x9TL._AC_SL1500_.jpg", category: "gpus" },
    { id: 5, name: "Motherboard ASUS TUF Gaming B550M-PLUS WiFi AM4", price: 185000, img: "https://m.media-amazon.com/images/I/81XmS5Xl6EL._AC_SL1500_.jpg", category: "motherboards" },
    { id: 6, name: "Motherboard Gigabyte B760M DS3H DDR4 LGA1700", price: 165000, img: "https://m.media-amazon.com/images/I/71yM7lVl0YL._AC_SL1500_.jpg", category: "motherboards" },
    { id: 7, name: "Memoria RAM Corsair Vengeance RGB Pro 16GB DDR4 3200MHz", price: 62000, img: "https://m.media-amazon.com/images/I/71K6J-8G0eL._AC_SL1500_.jpg", category: "ram" },
    { id: 8, name: "Memoria RAM Kingston FURY Beast 32GB DDR5 6000MHz", price: 145000, img: "https://m.media-amazon.com/images/I/61U+K3c-UHL._AC_SL1200_.jpg", category: "ram" },
    { id: 9, name: "Disco SSD NVMe M.2 Kingston NV2 1TB PCIe 4.0", price: 82000, img: "https://m.media-amazon.com/images/I/61aS8A-1n+L._AC_SL1200_.jpg", category: "almacenamiento" },
    { id: 10, name: "Fuente Corsair CV650 650W 80 Plus Bronze", price: 95000, img: "https://m.media-amazon.com/images/I/71L3S8S2nSL._AC_SL1500_.jpg", category: "fuentes" },
    { id: 11, name: "Gabinete Gamer Corsair 4000D Airflow Mid-Tower Black", price: 125000, img: "https://m.media-amazon.com/images/I/81M+P3CjFGL._AC_SL1500_.jpg", category: "gabinetes" }
  ];
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Servidor activo en el puerto ' + PORT));
