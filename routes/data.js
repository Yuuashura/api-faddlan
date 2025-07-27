import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import list from '../db.js';

// Helper untuk mendapatkan path direktori saat menggunakan ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Membuat router Express
const router = express.Router();

router.get('/', (req, res) => {
    res.json(list);
})

// Mendefinisikan rute dinamis dengan 3 parameter: season, league, dan matchday
router.get('/:season/:league/:matchday', (req, res) => {
  // 1. Ambil semua parameter dari URL
  const { season, league, matchday } = req.params;

  // 2. Buat path yang benar menuju file JSON di dalam folder /data
  // Contoh: ../data/2010-11/at.1.json
  const filePath = path.join(__dirname, '..', 'data', season, `${league}.${matchday}.json`);

  try {
    // 3. Cek apakah file yang diminta ada
    if (fs.existsSync(filePath)) {
      // Jika ada, baca file tersebut
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContents);
      
      // Kirim data JSON sebagai respons
      res.status(200).json(jsonData);
    } else {
      // Jika file tidak ada, kirim error 404 (Not Found)
      res.status(404).json({ 
        error: `Data tidak ditemukan.`,
        details: `File tidak ditemukan di path: data/${season}/${league}.${matchday}.json`
      });
    }
  } catch (error) {
    // Jika terjadi error lain (misal: JSON tidak valid), kirim error 500
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
});

// Ekspor router agar bisa digunakan oleh server.js
export default router;
