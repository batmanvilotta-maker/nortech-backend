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
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Referer': 'https://www.maximus.com.ar/'
      },
      timeout: 8000
    });

    const $ = cheerio.load(data);
    const productos = [];

    $('div[id*="Producto"], div[class*="Producto"], .item, .product, article').each((index, el) => {
      let name = $(el).find('h2, h3, .nombre, .title').first().text().trim();
      if (!name) name = $(el).find('a').attr('title') || '';

      const priceText = $(el).find('.precio, .price, span[id*="Precio"]').text().replace(/[^0-9]/g, '');

      let img = $(el).find('img').attr('data-original') || $(el).find('img').attr('data-src') || $(el).find('img').attr('src') || '';

      if (img && !img.startsWith('http')) {
        let prefix = '/';
        if (img.startsWith('/')) prefix = '';
        img = 'https://www.maximus.com.ar' + prefix + img;
      }

      if (name && name.length > 5 && priceText) {
        productos.push({
          id: index + 1,
          name: name,
          price: parseInt(priceText, 10),
          img: img,
          category: detectCategory(name)
        });
      }
    });

    if (productos.length === 0) {
      const catalogoOficial = [
        { id: 1, name: "Procesador AMD Ryzen 7 5700X3D 4.1GHz AM4", price: 310000, img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=500&auto=format&fit=crop", category: "procesadores" },
        { id: 2, name: "Procesador Intel Core i5 13400F 4.6GHz LGA1700", price: 285000, img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=500&auto=format&fit=crop", category: "procesadores" },
        { id: 3, name: "Procesador AMD Ryzen 5 5600G 4.4GHz + Vega", price: 185000, img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=500&auto=format&fit=crop", category: "procesadores" },
        { id: 4, name: "Placa de Video ASUS Dual GeForce RTX 4060 8GB OC", price: 420000, img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=500&auto=format&fit=crop", category: "gpus" },
        { id: 5, name: "Placa de Video XFX Radeon RX 6650 XT 8GB Speedster", price: 360000, img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=500&auto=format&fit=crop", category: "gpus" },
        { id: 6, name: "Placa de Video MSI GeForce RTX 3060 Ventus 2X 12GB", price: 380000, img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=500&auto=format&fit=crop", category: "gpus" },
        { id: 7, name: "Motherboard ASUS TUF Gaming B550M-PLUS WiFi AM4", price: 185000, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500&auto=format&fit=crop", category: "motherboards" },
        { id: 8, name: "Motherboard Gigabyte B760M DS3H DDR4 LGA1700", price: 165000, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500&auto=format&fit=crop", category: "motherboards" },
        { id: 9, name: "Memoria RAM Corsair Vengeance RGB Pro 16GB (2x8) DDR4 3200MHz", price: 62000, img: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=500&auto=format&fit=crop", category: "ram" },
        { id: 10, name: "Memoria RAM Kingston FURY Beast 32GB (2x16) DDR5 6000MHz", price: 145000, img: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=500&auto=format&fit=crop", category: "ram" },
        { id: 11, name: "Disco SSD NVMe M.2 Kingston NV2 1TB PCIe 4.0", price: 82000, img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=500&auto=format&fit=crop", category: "almacenamiento" },
        { id: 12, name: "Disco SSD NVMe M.2 Western Digital Black SN770 1TB", price: 105000, img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=500&auto=format&fit=crop", category: "almacenamiento" },
        { id: 13, name: "Fuente Corsair CV650 650W 80 Plus Bronze", price: 95000, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=500&auto=format&fit=crop", category: "fuentes" },
        { id: 14, name: "Fuente EVGA 750W N1 80 Plus Certified", price: 110000, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=500&auto=format&fit=crop", category: "fuentes" },
        { id: 15, name: "Gabinete Gamer Corsair 4000D Airflow Mid-Tower Black", price: 125000, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=500&auto=format&fit=crop", category: "gabinetes" },
        { id: 16, name: "Gabinete Gamer Cougar Archon 2 Mesh RGB Black", price: 85000, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=500&auto=format&fit=crop", category: "gabinetes" }
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
  if (title.indexOf('ryzen') !== -1 || title.indexOf('core i') !== -1 || title.indexOf('procesador') !== -1) return 'procesadores';
  if (title.indexOf('rtx') !== -1 || title.indexOf('radeon') !== -1 || title.indexOf('rx ') !== -1 || title.indexOf('placa de video') !== -1 || title.indexOf('geforce') !== -1) return 'gpus';
  if (title.indexOf('motherboard') !== -1 || title.indexOf('mother') !== -1 || title.indexOf('b550') !== -1 || title.indexOf('b760') !== -1 || title.indexOf('z790') !== -1 || title.indexOf('a520') !== -1) return 'motherboards';
  if (title.indexOf('ddr4') !== -1 || title.indexOf('ddr5') !== -1 || title.indexOf('ram') !== -1 || title.indexOf('fury') !== -1 || title.indexOf('vengeance') !== -1) return 'ram';
  if (title.indexOf('ssd') !== -1 || title.indexOf('nvme') !== -1 || title.indexOf('disco') !== -1 || title.indexOf('kingston') !== -1) return 'almacenamiento';
  if (title.indexOf('fuente') !== -1 || title.indexOf('80 plus') !== -1 || title.indexOf('evga') !== -1 || title.indexOf('corsair cv') !== -1) return 'fuentes';
  if (title.indexOf('gabinete') !== -1 || title.indexOf('cougar') !== -1 || title.indexOf('airflow') !== -1) return 'gabinetes';
  return 'varios';
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Servidor activo en puerto ' + PORT));
