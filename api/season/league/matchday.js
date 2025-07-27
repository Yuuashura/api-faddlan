import path from 'path';
import fs from 'fs';

/**
 * Handler untuk endpoint dinamis /api/[season]/[league]/[matchday].
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default function handler(req, res) {
  // 1. Ambil parameter dinamis dari URL
  // Vercel menempatkan parameter dari nama file/folder di req.query
  const { season, league, matchday } = req.query;

  // 2. Buat path yang benar menuju file JSON di folder /data
  // Contoh: /data/2010-11/at.1.json
  const filePath = path.join(process.cwd(), 'data', season, `${league}.${matchday}.json`);

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
        details: `File 'data/${season}/${league}.${matchday}.json' tidak ada di server.`
      });
    }
  } catch (error) {
    // Jika terjadi error lain (misal: JSON tidak valid), kirim error 500
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
}
