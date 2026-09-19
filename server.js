const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Catálogo com os 121 produtos reais extraídos do Maximus
const productosReales = [
  {
    "id": 1,
    "name": "AHORRA $7.011",
    "price": 7011,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/CENTAURI_600.jpg",
    "category": "varios"
  },
  {
    "id": 2,
    "name": "AHORRA $44.296",
    "price": 44296,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376722287_600.jpg",
    "category": "varios"
  },
  {
    "id": 3,
    "name": "AHORRA $24.018",
    "price": 24018,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/NFO-2154_600.jpg",
    "category": "varios"
  },
  {
    "id": 4,
    "name": "Motherboard Msi A520m a Pro Am4",
    "price": 81540,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/911-7C96-065_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 5,
    "name": "Disco Solido Ssd 1tb Kingston Nv3 m.2 Nvme Pcie X4 4.0 (Similar 960gb)",
    "price": 289440,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/SNV3S-1000G_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 6,
    "name": "Micro Amd Ryzen 5 5500 4.2 Ghz Am4",
    "price": 155970,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/100-100000457BOX_600.jpg",
    "category": "procesadores"
  },
  {
    "id": 7,
    "name": "Fuente 600w Sentey Epp600-Gt 80 Plus Bronze - Atx 2.31v",
    "price": 63450,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/EPP600-GT_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 8,
    "name": "AHORRA $5.217",
    "price": 5217,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/Lovingcool-K3-5V-controller-Black_600.jpg",
    "category": "varios"
  },
  {
    "id": 9,
    "name": "Micro Amd Ryzen 5 5600gt 4.6 Ghz Am4 (Mejor Que 5600g)",
    "price": 300420,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/100-100001488BOX_600.jpg",
    "category": "procesadores"
  },
  {
    "id": 10,
    "name": "Disco Solido Ssd 1tb Western Digital Sn350 Green m.2 Nvme Pcie X4 3.0",
    "price": 269910,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/WDS100T2G0C_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 11,
    "name": "Memoria Ram Aimerican Telepathy 16gb 6000mhz Ddr5",
    "price": 452790,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/AIU16GD560XMP_600.jpg",
    "category": "ram"
  },
  {
    "id": 12,
    "name": "Disco Solido Ssd 500gb Kingston Nv3 m.2 Nvme Pcie X4 4.0 (Similar 480gb 512gb)",
    "price": 182250,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/SNV3S-500G_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 13,
    "name": "AHORRA $14.100",
    "price": 14100,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/EN48845_600.jpg",
    "category": "varios"
  },
  {
    "id": 14,
    "name": "AHORRA $8.208",
    "price": 8208,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/MATE-500W_600.jpg",
    "category": "varios"
  },
  {
    "id": 15,
    "name": "Cpu Cooler Msi Mag Corefrozr Aa13 - Black",
    "price": 40500,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/306-7ZWHA11-L80_600.jpg",
    "category": "varios"
  },
  {
    "id": 16,
    "name": "AHORRA $23.618",
    "price": 23618,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/22257Q_600.jpg",
    "category": "varios"
  },
  {
    "id": 17,
    "name": "Motherboard Gigabyte A520m-K V2 Am4",
    "price": 93240,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/9MA52MK2-00-G11_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 18,
    "name": "AHORRA $24.798",
    "price": 24798,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/EN47190_600.jpg",
    "category": "varios"
  },
  {
    "id": 19,
    "name": "AHORRA $13.580",
    "price": 13580,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/NFO-2153_600.jpg",
    "category": "varios"
  },
  {
    "id": 20,
    "name": "Fuente 500w Sentey Epp500-Gt 80 Plus Bronze - Atx 2.31v",
    "price": 57780,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/EPP500-GT_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 21,
    "name": "Mouse Logitech G203 Lightsync Black",
    "price": 31140,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/910-005793_600.jpg",
    "category": "varios"
  },
  {
    "id": 22,
    "name": "AHORRA $89.765",
    "price": 89765,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/ARK25210FI8_600.jpg",
    "category": "varios"
  },
  {
    "id": 23,
    "name": "AHORRA $31.080",
    "price": 31080,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/AISSD256NVM3_600.jpg",
    "category": "varios"
  },
  {
    "id": 24,
    "name": "Motherboard Asus A520m-K Prime Am4",
    "price": 88740,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90MB1500-M0EAY0_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 25,
    "name": "Cpu Cooler Raptor Cryo Rgb - 3p",
    "price": 16560,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/RAP-COOLER-RGB-CPC002-1_600.jpg",
    "category": "varios"
  },
  {
    "id": 26,
    "name": "Motherboard Msi B550m a Pro Am4",
    "price": 131760,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/911-7C96-060_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 27,
    "name": "Fuente 650w Msi Mag A650bn 80 Plus Bronze",
    "price": 86400,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/306-7ZP2B23-CE0_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 28,
    "name": "Disco Solido Ssd 512gb Hiksemi Wave m.2 Nvme Pcie X4 3.0",
    "price": 162540,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/HS-SSD-WAVE-512G-WW_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 29,
    "name": "Micro Amd Ryzen 7 5700g 4.6 Ghz Am4 ( Mejor Que Ryzen 5 5600gt )",
    "price": 349110,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/100-100000263BOX_600.jpg",
    "category": "procesadores"
  },
  {
    "id": 30,
    "name": "AHORRA $27.002",
    "price": 27002,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376710079_600.jpg",
    "category": "varios"
  },
  {
    "id": 31,
    "name": "AHORRA $20.020",
    "price": 20020,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376778932_600.jpg",
    "category": "varios"
  },
  {
    "id": 32,
    "name": "Disco Solido Ssd 240gb Aimerican Immortality Sata Iii Bulk",
    "price": 72270,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/AISSD240S25_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 33,
    "name": "Disco Solido Ssd 512gb Memox Nvme Pcie Gen3 X4 - Bulk",
    "price": 160920,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/MMSN3-512G_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 34,
    "name": "Micro Amd Ryzen 7 5700x 4.6 Ghz Am4",
    "price": 381960,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/100-100000926WOF_600.jpg",
    "category": "procesadores"
  },
  {
    "id": 35,
    "name": "AHORRA $115.505",
    "price": 115505,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/ARK27220_600.jpg",
    "category": "varios"
  },
  {
    "id": 36,
    "name": "Memoria Ram Hiksemi Sword Rgb 16gb 3200mhz Ddr4",
    "price": 257400,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/324102196_600.jpg",
    "category": "ram"
  },
  {
    "id": 37,
    "name": "Monitor Led Ips 25\" Cx 100hz Fhd Cx236k Hdmi / Vga",
    "price": 144090,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/CX236K_600.jpg",
    "category": "varios"
  },
  {
    "id": 38,
    "name": "Disco Solido Ssd 1tb Patriot P300 m.2 Nvme Pcie X4 3.0",
    "price": 278910,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/P300P1TBM28US_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 39,
    "name": "Motherboard Msi B650m Gaming Wifi Am5",
    "price": 221670,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/911-7E30-009_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 40,
    "name": "Fan Cooler 120mm Lovingcool Dzpkk-120-Logo - Black",
    "price": 6300,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/Lovingcool-DZPKK-120-LOGO-Black_600.jpg",
    "category": "varios"
  },
  {
    "id": 41,
    "name": "Micro Amd Ryzen 3 3200g 4.0 Ghz + Rx Vega 8 Am4",
    "price": 112680,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/YD3200C5FHBOX_600.jpg",
    "category": "procesadores"
  },
  {
    "id": 42,
    "name": "Auricular C Mic Redragon Zeus X H510 Rgb",
    "price": 99900,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376705914_600.jpg",
    "category": "varios"
  },
  {
    "id": 43,
    "name": "AHORRA $10.773",
    "price": 10773,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376704979_600.jpg",
    "category": "varios"
  },
  {
    "id": 44,
    "name": "Fuente 700w Sentey Epp700-Gt 80 Plus Bronze - Atx 2.31v",
    "price": 70020,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/EPP700-GT_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 45,
    "name": "Mouse Logitech G203 Lightsync White",
    "price": 31770,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/910-005794_600.jpg",
    "category": "varios"
  },
  {
    "id": 46,
    "name": "Micro Amd Ryzen 7 5700 4.6 Ghz Am4",
    "price": 258390,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/100-100000743Sbx_600.jpg",
    "category": "procesadores"
  },
  {
    "id": 47,
    "name": "Fuente 650w Gigabyte P650ss 80 Plus Silver",
    "price": 88650,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/GP-P650SS_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 48,
    "name": "Monitor Gamer Ips 24.5\" Gigabyte Gs25f2 Fhd 200hz 1ms Freesync Premium",
    "price": 230490,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/GS25F2_600.jpg",
    "category": "varios"
  },
  {
    "id": 49,
    "name": "Micro Amd Ryzen 5 3400g 4.2 Ghz Tray Sin Cooler Am4",
    "price": 131670,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/YD3400C5M4MFH_600.jpg",
    "category": "procesadores"
  },
  {
    "id": 50,
    "name": "Disco Ssd 512gb Aimerican Agility m.2 Pcie Nvme Gen3 X4",
    "price": 143460,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/AISSD512NVM3_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 51,
    "name": "AHORRA $204.991",
    "price": 204991,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/PC-ML5-ARMADA-GAMER_600.jpg",
    "category": "varios"
  },
  {
    "id": 52,
    "name": "Gabinete Gamer Zer01 Gaming Pollux Pro 6 Fan Argb Oem Box",
    "price": 55800,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/POLLUX-PRO_600.jpg",
    "category": "gabinetes"
  },
  {
    "id": 53,
    "name": "Micro Amd Ryzen 7 5700x 4.6 Ghz Am4 Tray Sin Cooler",
    "price": 327150,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/100-000000926_600.jpg",
    "category": "procesadores"
  },
  {
    "id": 54,
    "name": "Monitor Led 24\" Performance Pf236u Vga Hdmi",
    "price": 104760,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/PF236U_600.jpg",
    "category": "varios"
  },
  {
    "id": 55,
    "name": "Fuente 650w Msi Mag A650gn Ii 80 Plus Gold",
    "price": 94500,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/306-7ZPBZ23-CE0_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 56,
    "name": "Memoria Ram Patriot Signature Line 16gb 3200 Mhz Ddr4",
    "price": 213390,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/PSD416G32002_600.jpg",
    "category": "ram"
  },
  {
    "id": 57,
    "name": "Placa de Video Msi Nvidia Geforce Rtx 3050 Ventus 2x 6gb Oc Gddr6",
    "price": 502740,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/912-V812-060_600.jpg",
    "category": "gpus"
  },
  {
    "id": 58,
    "name": "AHORRA $7.728",
    "price": 7728,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/CT-9010015-WW_600.jpg",
    "category": "varios"
  },
  {
    "id": 59,
    "name": "AHORRA $4.699",
    "price": 4699,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/Lovingcool-DZMJ-120-Black_600.jpg",
    "category": "varios"
  },
  {
    "id": 60,
    "name": "Teclado Redragon K552 Kumara Mecanico Rgb Esp Switch Red",
    "price": 55170,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376778925_600.jpg",
    "category": "varios"
  },
  {
    "id": 61,
    "name": "Filtro Antipolvo Xigmatek Magnetico 140x432mm",
    "price": 13140,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/ENA011_600.jpg",
    "category": "varios"
  },
  {
    "id": 62,
    "name": "Micro Amd Ryzen 5 7600 5.1 Ghz Am5",
    "price": 369810,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/100-100001015BOX_600.jpg",
    "category": "procesadores"
  },
  {
    "id": 63,
    "name": "Micro Amd Ryzen 5 8600g 5.0 Ghz Am5",
    "price": 325530,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/100-100001237BOX_600.jpg",
    "category": "procesadores"
  },
  {
    "id": 64,
    "name": "Micro Amd Ryzen 5 9600x 5.4 Ghz Am5",
    "price": 453600,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/100-100001405WOF_600.jpg",
    "category": "procesadores"
  },
  {
    "id": 65,
    "name": "Disco Solido Ssd 128gb Hiksemi Wave m.2 Nvme Pcie X4 3.0",
    "price": 58770,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/311508528_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 66,
    "name": "Motherboard Asus Prime B550m-K Argb Am4",
    "price": 144000,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90MB1GC0-M0EAY0_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 67,
    "name": "Memoria Ram Kingston Fury Beast 16gb 5600 Mhz Ddr5 Black Amd Expo",
    "price": 605700,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/KF556C36BBE-16_600.jpg",
    "category": "ram"
  },
  {
    "id": 68,
    "name": "Disco Solido Ssd 120gb Hiksemi Wave Sata Iii",
    "price": 52740,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/311508513_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 69,
    "name": "Adaptador Usb Bluetooth 5.0 Tp-Link Ub500 Plus Nano Largo Alcance",
    "price": 12510,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/UB500-PLUS_600.jpg",
    "category": "varios"
  },
  {
    "id": 70,
    "name": "AHORRA $23.520",
    "price": 23520,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376714381_600.jpg",
    "category": "varios"
  },
  {
    "id": 71,
    "name": "AHORRA $24.310",
    "price": 24310,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376721914_600.jpg",
    "category": "varios"
  },
  {
    "id": 72,
    "name": "Disco Solido Ssd 480gb Hiksemi Wave Sata Iii (Similar 500gb 512gb)",
    "price": 134370,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/HS-SSD-WAVE-480G_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 73,
    "name": "Memoria Ram Corsair Vengeance Rgb Black 16gb 5600 Mhz Ddr5",
    "price": 513000,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/CMH16GX5M1B5600C40_600.jpg",
    "category": "ram"
  },
  {
    "id": 74,
    "name": "Fuente 550w Lnz Xt550-Ss - Atx",
    "price": 20790,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/XT550-SS_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 75,
    "name": "Memoria Ram Amog 8gb 3200mhz Ddr4 White",
    "price": 119610,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/GMPC202608G3200_600.jpg",
    "category": "ram"
  },
  {
    "id": 76,
    "name": "Teclado Logitech K120 Usb",
    "price": 13680,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/920-004422_600.jpg",
    "category": "varios"
  },
  {
    "id": 77,
    "name": "Gabinete Msi Mag Forge M100a - 4 Fan Fixed Rgb (Rainbow)",
    "price": 78390,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/306-7G20A21-809_600.jpg",
    "category": "gabinetes"
  },
  {
    "id": 78,
    "name": "Mouse Redragon K1ng Pro M916 4k Black",
    "price": 72810,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376722119_600.jpg",
    "category": "varios"
  },
  {
    "id": 79,
    "name": "Disco Solido Ssd Aimerican Immortality 256gb 3d Nand Sata Iii",
    "price": 78660,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/AISSD256S25_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 80,
    "name": "AHORRA $25.256",
    "price": 25256,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376736789_600.jpg",
    "category": "varios"
  },
  {
    "id": 81,
    "name": "Monitor Led Ips 27\" Arkham Gaming Qhd 210hz 1ms - Hdmi/dp",
    "price": 367290,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/ARK27210QI8_600.jpg",
    "category": "varios"
  },
  {
    "id": 82,
    "name": "Disco Solido Ssd Amog 512gb Sata Iii",
    "price": 126090,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/GMSSD512260700466_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 83,
    "name": "Mouse Logitech G305 Lightspeed Inalambrico Negro",
    "price": 44820,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/910-005281_600.jpg",
    "category": "varios"
  },
  {
    "id": 84,
    "name": "Monitor Gamer Led 23.8\" Cooler Master Ga241 Fhd 100hz 1ms Adaptive Sync",
    "price": 166140,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/CMI-GA241-AR_600.jpg",
    "category": "varios"
  },
  {
    "id": 85,
    "name": "Auricular C/mic Gamer Redragon Cronus H211 Rgb - Black",
    "price": 30870,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376718815_600.jpg",
    "category": "varios"
  },
  {
    "id": 86,
    "name": "Fuente 650w Gigabyte P650ss 80 Plus Silver Ice White",
    "price": 88290,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/28200-P65SW-1USR_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 87,
    "name": "AHORRA $126.620",
    "price": 126620,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/ARK25320FI8_600.jpg",
    "category": "varios"
  },
  {
    "id": 88,
    "name": "AHORRA $12.635",
    "price": 12635,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376731500_600.jpg",
    "category": "varios"
  },
  {
    "id": 89,
    "name": "AHORRA $3.472",
    "price": 3472,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/Lovingcool-X-Pro-120-CD-White_600.jpg",
    "category": "varios"
  },
  {
    "id": 90,
    "name": "Fuente 750w Sentey Mbp750-Vm 80 Plus Bronze Full Modular - Atx 3.1 & Pcie 5.1",
    "price": 100620,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/MBP750-VM_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 91,
    "name": "Memoria Ram Memox 8gb 5600mhz Ddr5 - Bulk",
    "price": 256500,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/MMD58G56U_600.jpg",
    "category": "ram"
  },
  {
    "id": 92,
    "name": "Motherboard Msi B650m-B Pro Am5",
    "price": 150480,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/911-7E28-020_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 93,
    "name": "Combo Teclado y Mouse Logitech Mk120",
    "price": 20880,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/920-004428_600.jpg",
    "category": "varios"
  },
  {
    "id": 94,
    "name": "Fuente 550w Msi Mag A550bn 80 Plus Bronze",
    "price": 73530,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/306-7ZP2A23-CE0_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 95,
    "name": "Motherboard Gigabyte B550m K Am4",
    "price": 132930,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/B550M-K_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 96,
    "name": "Micro Amd Ryzen 7 8700g 5.1 Ghz Am5",
    "price": 455040,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/100-100001236SBX_600.jpg",
    "category": "procesadores"
  },
  {
    "id": 97,
    "name": "Fuente 550w Gigabyte P550ss 80 Plus Silver Atx 3.0",
    "price": 71640,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/GP-P550SS_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 98,
    "name": "Fan Cooler 120mm Lovingcool Yq-120-Cd Pwm Argb - White",
    "price": 7290,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/Lovingcool-YQ-120-CD-white_600.jpg",
    "category": "varios"
  },
  {
    "id": 99,
    "name": "Fuente 750w Sentey Mbp750-Cm 80 Plus Bronze Semi Modular - Atx 3.1 & Pcie 5.1",
    "price": 95580,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/MBP750-CM_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 100,
    "name": "Kit de Teclado y Mouse Redragon - Bs-7092",
    "price": 15390,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376732620_600.jpg",
    "category": "varios"
  },
  {
    "id": 101,
    "name": "AHORRA $2.793",
    "price": 2793,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376729163_600.jpg",
    "category": "varios"
  },
  {
    "id": 102,
    "name": "Fuente Cooler Master Elite Gold 750w Full Modular 80 Plus",
    "price": 147870,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/MPX-7505-AFAG-BWO_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 103,
    "name": "Adaptador Usb Wifi Tp-Link Tl-Wn725n Nano 2.4 Ghz 150mbps",
    "price": 11700,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/TL-WN725N_600.jpg",
    "category": "varios"
  },
  {
    "id": 104,
    "name": "Disco Solido Ssd 480gb Kingston A400 Sata Iii (Similar 500gb 512gb)",
    "price": 173070,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/SA400S37-480G_600.jpg",
    "category": "almacenamiento"
  },
  {
    "id": 105,
    "name": "Teclado Redragon Mitra Mecanico Rgb Esp",
    "price": 65790,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376705587_600.jpg",
    "category": "varios"
  },
  {
    "id": 106,
    "name": "Memoria Ram Corsair Vengeance Rgb Rs 8gb 3200 Mhz Ddr4",
    "price": 168210,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/CMG8GX4M1E3200C16_600.jpg",
    "category": "ram"
  },
  {
    "id": 107,
    "name": "Cpu Cooler Gamemax Gamma 500 Rainbow - Argb",
    "price": 30420,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/GAMMA-500-RAINBOW_600.jpg",
    "category": "varios"
  },
  {
    "id": 108,
    "name": "AHORRA $73.169",
    "price": 73169,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/KF560C36BBE-8_600.jpg",
    "category": "varios"
  },
  {
    "id": 109,
    "name": "Motherboard Gigabyte B650m Gaming Plus Wifi Ddr5 Am5",
    "price": 227430,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/9MB65MGPW-00-G12_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 110,
    "name": "Pc Armada Amd Ryzen 5 5600gt 16gb 512gb",
    "price": 828000,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/PC-ML2-ARMADA-GAMER_600.jpg",
    "category": "procesadores"
  },
  {
    "id": 111,
    "name": "Mouse Redragon King M724 Black",
    "price": 21780,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6950376721983_600.jpg",
    "category": "varios"
  },
  {
    "id": 112,
    "name": "Fuente 850w Sentey Mbp850-Gm 80 Plus Bronze - Pcie 5.1 - Atx 3.1",
    "price": 105390,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/MBP850-GM_600.jpg",
    "category": "fuentes"
  },
  {
    "id": 113,
    "name": "Motherboard Asus Prime B550m-K Am4",
    "price": 151740,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90MB14V0-M0EAY0_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 114,
    "name": "Motherboard Asus B550m-a Ac Prime Am4",
    "price": 151740,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90MB14V0-M0EAY0_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 115,
    "name": "Motherboard Gigabyte A620m-H Am5",
    "price": 151740,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90MB14V0-M0EAY0_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 116,
    "name": "Motherboard Asus Prime B650m-a Ii Am5",
    "price": 151740,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90MB14V0-M0EAY0_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 117,
    "name": "Motherboard Asrock A620m Hdv m.2 Am5",
    "price": 151740,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90MB14V0-M0EAY0_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 118,
    "name": "Motherboard Asus Prime H610m-K Ddr5 S1700",
    "price": 151740,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90MB14V0-M0EAY0_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 119,
    "name": "Motherboard Biostar B450mhp M-Atx Ddr4 Am4",
    "price": 151740,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90MB14V0-M0EAY0_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 120,
    "name": "Motherboard Asus Prime A620m-K Ddr5 Am5",
    "price": 151740,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90MB14V0-M0EAY0_600.jpg",
    "category": "motherboards"
  },
  {
    "id": 121,
    "name": "Motherboard Msi Pro B760m-P Ddr5 S1700",
    "price": 151740,
    "img": "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90MB14V0-M0EAY0_600.jpg",
    "category": "motherboards"
  }
];

app.get('/', (req, res) => {
  res.send('Servidor NORTECH Backend activo.');
});

app.get('/api/componentes', (req, res) => {
  res.json(productosReales);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Servidor activo en el puerto ' + PORT));
