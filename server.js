const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/componentes', (req, res) => {
  const catalogoOficial = [
    { id: 1, name: "Procesador AMD Ryzen 7 5700X3D 4.1GHz AM4", price: 310000, img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=500&auto=format&fit=crop", category: "procesadores" },
    { id: 2, name: "Procesador Intel Core i5 13400F 4.6GHz LGA1700", price: 285000, img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=500&auto=format&fit=crop", category: "procesadores" },
    { id: 3, name: "Procesador AMD Ryzen 5 5600G 4.4GHz + Vega Graphics", price: 185000, img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=500&auto=format&fit=crop", category: "procesadores" },
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

  res.json(catalogoOficial);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Servidor activo en el puerto ' + PORT));
