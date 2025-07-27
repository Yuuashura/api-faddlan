import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Mengimpor file rute data yang sudah kita buat
import dataRoutes from './routes/data.js';

// Helper untuk mendapatkan path direktori
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inisialisasi aplikasi Express
const app = express();
const port = 3001; // Anda bisa ganti port jika diperlukan

// Middleware
app.use(cors()); // Mengizinkan permintaan dari domain lain (Penting untuk development)
app.use(express.json()); // Mem-parsing body request JSON

// Rute Utama untuk halaman selamat datang
app.get('/', (req, res) => {
  res.send(`
    <body style="background-color: #111; color: #eee; font-family: sans-serif; text-align: center; padding-top: 20%;">
      <h1>⚽ API Data Sepak Bola</h1>
      <h1>Created by YuuAshura</h1>
      <p>API sedang berjalan. Coba akses endpoint seperti /api/2010-11/en/1</p>
      <a href="/api" style="font-size : 20px; background-color: #444; padding: 10px 20px; border-radius: 5px; color: #fff; text-decoration: none;">AKSES SEKARANG</a>
    </body>
  `);
});


// Menggunakan rute data
// Semua permintaan ke /api akan ditangani oleh dataRoutes
app.use('/api', dataRoutes);

// Menjalankan server di localhost
app.listen(port, () => {
  console.log(`🚀 Server API berjalan di http://localhost:${port}`);
});
