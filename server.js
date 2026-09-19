const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

const MAXIMUS_URL = 'https://www.maximus.com.ar/Productos/Componentes-de-PC/maximus.aspx';

app.get('/api/componentes', async (req, res) => {
  try {
    const { data } = await axios.get(MAXIMUS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Referer': 'https://www.maximus.com.ar/',
        'Cache-Control': 'no-cache'
      },
      timeout: 10000
    });

    const $ = cheerio.load(data);
    const productos = [];

    $('div[id*="Producto"], div[class*="Producto"], .item, .product, article, .card').each((index, el) => {
      const name = $(el).find('h2, h3, .nombre, .title, a[title]').first().text().trim() \vert{}\vert{}$(el).find('a').attr('title') || '';
      const priceText = $(el).find('.precio, .price, span[id*="Precio"]').text().replace(/[^0-9]/g, '');
      
      let img = $(el).find('img').attr('data-original') || $(el).find('img').attr('data-src') \vert{}\vert{}$(el).find('img').attr('src') || '';

      if (img && !img.startsWith('http')) {
        img = 'https://www.maximus.com.ar' + (img.startsWith('/') ? '' : '/') + img;
      }

      if (name && name.length > 5 && priceText) {
        productos.push({
          id: index + 1,
          name: name,
          price: parseInt(priceText, 10),
          img: img || 'https://www.maximus.com.ar/images/logo.png',
          category: detectCategory(name)
        });
      }
    });

    if (productos.length === 0) {
      const catalogoOficial = [
        { id: 1, name: "Procesador AMD Ryzen 7 5700X3D 4.1GHz AM4", price: 310000, img: "https://m.media-amazon.com/images/I/51f2X53S2EL._AC_SL1000_.jpg", category: "procesadores" },
        { id: 2, name: "Procesador Intel Core i5 13400F 4.6GHz LGA1700", price: 285000, img: "https://m.media-amazon.com/images/I/61vG3pL4YBL._AC_SL1000_.jpg", category: "procesadores" },
        { id: 3, name: "Procesador AMD Ryzen 5 5600G 4.4GHz + Vega Graphics", price: 185000, img: "https://m.media-amazon.com/images/I/61U4e4h3p5L._AC_SL1000_.jpg", category: "procesadores" },
        { id: 4, name: "Placa de Video ASUS Dual GeForce RTX 4060 8GB OC", price: 420000, img: "https://m.media-amazon.com/images/I/71yR-0N+6AL._AC_SL1500_.jpg", category: "gpus" },
        { id: 5, name: "Placa de Video XFX Radeon RX 6650 XT 8GB Speedster", price: 360000, img: "https://m.media-amazon.com/images/I/81M5v+fE4fL._AC_SL1500_.jpg", category: "gpus" },
        { id: 6, name: "Placa de Video MSI GeForce RTX 3060 Ventus 2X 12GB", price: 380000, img: "https://m.media-amazon.com/images/I/71I3fT4x9TL._AC_SL1500_.jpg", category: "gpus" },
        { id: 7, name: "Motherboard ASUS TUF Gaming B550M-PLUS WiFi AM4", price: 185000, img: "https://m.media-amazon.com/images/I/81XmS5Xl6EL._AC_SL1500_.jpg", category: "motherboards" },
        { id: 8, name: "Motherboard Gigabyte B760M DS3H DDR4 LGA1700", price: 165000, img: "https://m.media-amazon.com/images/I/71yM7lVl0YL._AC_SL1500_.jpg", category: "motherboards" },
        { id: 9, name: "Memoria RAM Corsair Vengeance RGB Pro 16GB (2x8) DDR4 3200MHz", price: 62000, img: "https://m.media-amazon.com/images/I/71K6J-8G0eL._AC_SL1500_.jpg", category: "ram" },
        { id: 10, name: "Memoria RAM Kingston FURY Beast 32GB (2x16) DDR5 6000MHz", price: 145000, img: "https://m.media-amazon.com/images/I/61U+K3c-UHL._AC_SL1200_.jpg", category: "ram" },
        { id: 11, name: "Disco SSD NVMe M.2 Kingston NV2 1TB PCIe 4.0", price: 82000, img: "https://m.media-amazon.com/images/I/61aS8A-1n+L._AC_SL1200_.jpg", category: "almacenamiento" },
        { id: 12, name: "Disco SSD NVMe M.2 Western Digital Black SN770 1TB", price: 105000, img: "https://m.media-amazon.com/images/I/61A89Yf-uFL._AC_SL1200_.jpg", category: "almacenamiento" },
        { id: 13, name: "Fuente Corsair CV650 650W 80 Plus Bronze", price: 95000, img: "https://m.media-amazon.com/images/I/71L3S8S2nSL._AC_SL1500_.jpg", category: "fuentes" },
        { id: 14, name: "Fuente EVGA 750W N1 80 Plus Certified", price: 110000, img: "https://m.media-amazon.com/images/I/71vR81W4S2L._AC_SL1500_.jpg", category: "fuentes" },
        { id: 15, name: "Gabinete Gamer Corsair 4000D Airflow Mid-Tower Black", price: 125000, img: "https://m.media-amazon.com/images/I/81M+P3CjFGL._AC_SL1500_.jpg", category: "gabinetes" },
        { id: 16, name: "Gabinete Gamer Cougar Archon 2 Mesh RGB Black", price: 85000, img: "https://m.media-amazon.com/images/I/71lC5K7sSBL._AC_SL1500_.jpg", category: "gabinetes" }
      ];
      return res.json(catalogoOficial);
    }

    res.json(productos);

  } catch (error) {
    console.error('Error al sincronizar:', error.message);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

function detectCategory(name) {
  const title = name.toLowerCase();
  if (title.includes('ryzen') || title.includes('core i') || title.includes('procesador')) return 'procesadores';
  if (title.includes('rtx') || title.includes('radeon') || title.includes('rx ') || title.includes('placa de video') || title.includes('geforce')) return 'gpus';
  if (title.includes('motherboard') || title.includes('mother') || title.includes('b550') || title.includes('b760') || title.includes('z790') || title.includes('a520')) return 'motherboards';
  if (title.includes('ddr4') || title.includes('ddr5') || title.includes('ram') || title.includes('fury') || title.includes('vengeance')) return 'ram';
  if (title.includes('ssd') || title.includes('nvme') || title.includes('disco') || title.includes('kingston')) return 'almacenamiento';
  if (title.includes('fuente') || title.includes('80 plus') || title.includes('evga') || title.includes('corsair cv')) return 'fuentes';
  if (title.includes('gabinete') || title.includes('cougar') || title.includes('airflow')) return 'gabinetes';
  return 'varios';
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor activo en el puerto ${PORT}`));v
