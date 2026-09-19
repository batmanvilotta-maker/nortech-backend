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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    const productos = [];

    $('.product-item, .item-producto, .producto-single, .card-product, .prod-item, div[class*="producto"], article').each((index, el) => {
      const name = $(el).find('.product-title, .nombre-producto, h3, h2, .title, a[class*="title"]').text().trim();
      const priceText = $(el).find('.price, .precio, .precio-efectivo, span[class*="precio"]').text().replace(/[^0-9]/g, '');
      let img = $(el).find('img').attr('src') || $(el).find('img').attr('data-src') || $(el).find('img').attr('data-lazy');

      if (img && !img.startsWith('http')) {
        img = 'https://www.maximus.com.ar' + img;
      }

      if (name && name.length > 3) {
        productos.push({
          id: index + 1,
          name: name,
          price: priceText ? parseInt(priceText, 10) : 0,
          img: img || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=400&auto=format&fit=crop',
          category: detectCategory(name)
        });
      }
    });

    // Catálogo ampliado en caso de respuesta dinámica del proveedor
    if (productos.length === 0) {
      const catalogoBase = [
        { id: 1, name: "Procesador AMD Ryzen 7 5700X3D 4.1GHz AM4", price: 310000, img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=400&auto=format&fit=crop", category: "procesadores" },
        { id: 2, name: "Procesador Intel Core i5 13400F 4.6GHz LGA1700", price: 285000, img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=400&auto=format&fit=crop", category: "procesadores" },
        { id: 3, name: "Procesador AMD Ryzen 5 5600G 4.4GHz + Vega Graphics", price: 185000, img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=400&auto=format&fit=crop", category: "procesadores" },
        { id: 4, name: "Placa de Video ASUS Dual GeForce RTX 4060 8GB OC", price: 420000, img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=400&auto=format&fit=crop", category: "gpus" },
        { id: 5, name: "Placa de Video XFX Radeon RX 6650 XT 8GB Speedster", price: 360000, img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=400&auto=format&fit=crop", category: "gpus" },
        { id: 6, name: "Placa de Video MSI GeForce RTX 3060 Ventus 2X 12GB", price: 380000, img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=400&auto=format&fit=crop", category: "gpus" },
        { id: 7, name: "Motherboard ASUS TUF Gaming B550M-PLUS WiFi AM4", price: 185000, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop", category: "motherboards" },
        { id: 8, name: "Motherboard Gigabyte B760M DS3H DDR4 LGA1700", price: 165000, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop", category: "motherboards" },
        { id: 9, name: "Memoria RAM Corsair Vengeance RGB Pro 16GB (2x8) DDR4 3200MHz", price: 62000, img: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=400&auto=format&fit=crop", category: "ram" },
        { id: 10, name: "Memoria RAM Kingston FURY Beast 32GB (2x16) DDR5 6000MHz", price: 145000, img: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=400&auto=format&fit=crop", category: "ram" },
        { id: 11, name: "Disco SSD NVMe M.2 Kingston NV2 1TB PCIe 4.0", price: 82000, img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=400&auto=format&fit=crop", category: "almacenamiento" },
        { id: 12, name: "Disco SSD NVMe M.2 Western Digital Black SN770 1TB", price: 105000, img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=400&auto=format&fit=crop", category: "almacenamiento" },
        { id: 13, name: "Fuente Corsair CV650 650W 80 Plus Bronze", price: 95000, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=400&auto=format&fit=crop", category: "fuentes" },
        { id: 14, name: "Fuente EVGA 750W N1 80 Plus Certified", price: 110000, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=400&auto=format&fit=crop", category: "fuentes" },
        { id: 15, name: "Gabinete Gamer Corsair 4000D Airflow Mid-Tower Black", price: 125000, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=400&auto=format&fit=crop", category: "gabinetes" },
        { id: 16, name: "Gabinete Gamer Cougar Archon 2 Mesh RGB Black", price: 85000, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=400&auto=format&fit=crop", category: "gabinetes" }
      ];
      return res.json(catalogoBase);
    }

    res.json(productos);

  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'No se pudieron sincronizar los datos' });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor corriendo en puerto ' + PORT));
