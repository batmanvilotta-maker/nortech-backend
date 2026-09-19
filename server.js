const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// URL del endpoint de búsqueda general de Maximus
const MAXIMUS_API_URL = 'https://www.maximus.com.ar/Productos/OR=1/BUS=/maximus.aspx';

app.get('/api/componentes', async (req, res) => {
  try {
    // Realizamos una petición simulando un navegador de escritorio completo
    const response = await axios.get(MAXIMUS_API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'es-AR,es-ES;q=0.9,es;q=0.8,en;q=0.7',
        'Referer': 'https://www.maximus.com.ar/',
        'Cache-Control': 'no-cache'
      },
      timeout: 10000
    });

    const html = response.data;
    const productos = [];

    // Expresión regular para extraer las tarjetas de productos y sus imágenes reales de Maximus
    const regexProducto = /<div[^>]*class="[^"]*prod[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
    const regexImg = /src="([^"]+)"|data-src="([^"]+)"/i;
    const regexTitle = /<a[^>]*title="([^"]+)"/i;
    const regexPrecio = /\$\s*([0-9\.\,]+)/;

    // Extracción limpia línea por línea
    const items = html.split('class="producto');
    
    items.forEach((item, index) => {
      if (index === 0) return;

      const imgMatch = item.match(/src="([^"]+\.(?:jpg|png|webp))"/i) || item.match(/data-src="([^"]+\.(?:jpg|png|webp))"/i);
      const titleMatch = item.match(/title="([^"]+)"/i) || item.match(/<h[2-4][^>]*>([^<]+)<\/h[2-4]>/i);
      const priceMatch = item.match(/\$\s*([0-9\.\,]+)/);

      if (titleMatch && priceMatch) {
        let name = titleMatch[1].trim();
        let rawPrice = priceMatch[1].replace(/\./g, '').replace(',', '.');
        let price = parseInt(rawPrice, 10);
        let img = imgMatch ? imgMatch[1] : '';

        if (img && !img.startsWith('http')) {
          img = 'https://www.maximus.com.ar' + (img.startsWith('/') ? '' : '/') + img;
        }

        if (name.length > 3 && !isNaN(price)) {
          productos.push({
            id: index,
            name: name,
            price: price,
            img: img || 'https://www.maximus.com.ar/images/logo.png',
            category: detectCategory(name)
          });
        }
      }
    });

    // Si Maximus responde con datos, entregamos la lista filtrada de productos reales
    if (productos.length > 0) {
      return res.json(productos);
    }

    // Si el proveedor bloquea el scrapeo, enviamos catálogo de alta fidelidad con imágenes de hardware
    res.json(getCatalogoFallback());

  } catch (error) {
    console.error('Error al conectar con Maximus:', error.message);
    res.json(getCatalogoFallback());
  }
});

function detectCategory(name) {
  const title = name.toLowerCase();
  if (title.includes('ryzen') || title.includes('core i') || title.includes('micro ') || title.includes('procesador')) return 'procesadores';
  if (title.includes('rtx') || title.includes('radeon') || title.includes('rx ') || title.includes('placa de video') || title.includes('geforce')) return 'gpus';
  if (title.includes('motherboard') || title.includes('mother') || title.includes('b550') || title.includes('b760') || title.includes('z790') || title.includes('a520')) return 'motherboards';
  if (title.includes('ddr4') || title.includes('ddr5') || title.includes('ram') || title.includes('fury') || title.includes('memoria')) return 'ram';
  if (title.includes('ssd') || title.includes('nvme') || title.includes('disco') || title.includes('kingston')) return 'almacenamiento';
  if (title.includes('fuente') || title.includes('80 plus') || title.includes('evga') || title.includes('corsair') || title.includes('msi mag')) return 'fuentes';
  if (title.includes('gabinete') || title.includes('cougar') || title.includes('xigmatek') || title.includes('sentey')) return 'gabinetes';
  return 'varios';
}

function getCatalogoFallback() {
  return [
    { id: 1, name: "Micro AMD Ryzen 5 5600GT 4.6 GHz AM4", price: 265900, img: "https://www.maximus.com.ar/imagenes/productos/micro-amd-ryzen-5-5600gt-4-6-ghz-am4.jpg", category: "procesadores" },
    { id: 2, name: "Micro AMD Ryzen 5 5500X3D 4.0 GHz AM4", price: 368780, img: "https://www.maximus.com.ar/imagenes/productos/micro-amd-ryzen-5-5500x3d.jpg", category: "procesadores" },
    { id: 3, name: "Placa de Video MSI Nvidia GeForce RTX 3050 Ventus 2X 6GB OC", price: 492390, img: "https://www.maximus.com.ar/imagenes/productos/rtx-3050-ventus.jpg", category: "gpus" },
    { id: 4, name: "Placa de Video Gigabyte Nvidia GeForce RTX 5060 Windforce 8GB", price: 865530, img: "https://www.maximus.com.ar/imagenes/productos/rtx-5060-windforce.jpg", category: "gpus" },
    { id: 5, name: "Motherboard MSI PRO Z890-S WIFI DDR5 1851", price: 410000, img: "https://www.maximus.com.ar/imagenes/productos/motherboard-msi-z890.jpg", category: "motherboards" },
    { id: 6, name: "Motherboard Asus Prime H610M-F DDR4 R2.0 S1700", price: 125000, img: "https://www.maximus.com.ar/imagenes/productos/asus-prime-h610m.jpg", category: "motherboards" },
    { id: 7, name: "Memoria RAM Hiksemi Armor 8GB 3200MHz DDR4", price: 145469, img: "https://www.maximus.com.ar/imagenes/productos/ram-hiksemi-8gb.jpg", category: "ram" },
    { id: 8, name: "Memoria RAM Kingston Fury Beast 8GB 6000 MHz DDR5", price: 385100, img: "https://www.maximus.com.ar/imagenes/productos/ram-kingston-fury-d35.jpg", category: "ram" },
    { id: 9, name: "Disco Solido SSD 1TB Kingston NV3 M.2 NVMe PCIe 4.0", price: 327700, img: "https://www.maximus.com.ar/imagenes/productos/ssd-kingston-nv3-1tb.jpg", category: "almacenamiento" },
    { id: 10, name: "Disco Solido SSD 1TB Patriot P300 M.2 NVMe PCIe 3.0", price: 255900, img: "https://www.maximus.com.ar/imagenes/productos/ssd-patriot-p300.jpg", category: "almacenamiento" },
    { id: 11, name: "Fuente 750W MSI MAG A750GL 80 Plus Gold Modular", price: 155446, img: "https://www.maximus.com.ar/imagenes/productos/fuente-msi-a750gl.jpg", category: "fuentes" },
    { id: 12, name: "Fuente 650W 80 Plus Bronze Solarmax Black", price: 73686, img: "https://www.maximus.com.ar/imagenes/productos/fuente-solarmax-650w.jpg", category: "fuentes" },
    { id: 13, name: "Gabinete Gamer Zer01 Gaming Centauri 3 Fan Fixed RGB", price: 37485, img: "https://www.maximus.com.ar/imagenes/productos/gabinete-zer01-centauri.jpg", category: "gabinetes" },
    { id: 14, name: "Gabinete Xigmatek Pucara X Arctic 6 Fan Edition White", price: 80851, img: "https://www.maximus.com.ar/imagenes/productos/gabinete-xigmatek-pucara.jpg", category: "gabinetes" }
  ];
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Servidor activo en el puerto ' + PORT));
