import path from 'path';
import fs from 'fs';

/**
 * Handler untuk endpoint /api (dokumentasi).
 * Membaca dan mengembalikan daftar folder musim yang tersedia.
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default function handler(req, res) {
  const dataPath = path.join(process.cwd(), 'data');

  try {
    const allFilesAndFolders = fs.readdirSync(dataPath);

    // Saring hasilnya agar hanya mengambil folder (direktori)
    const folders = allFilesAndFolders.filter(name => {
      const itemPath = path.join(dataPath, name);
      return fs.statSync(itemPath).isDirectory();
    });

    // Kirim daftar folder sebagai respons JSON
    res.status(200).json({
      documentation: "Endpoint ini menampilkan semua musim (tahun) yang tersedia. Gunakan format /api/{season}/{league}/{matchday} untuk mengambil data.",
      available_seasons: folders
    });

  } catch (error) {
    console.error("Gagal membaca folder data:", error);
    res.status(500).json({ error: "Tidak dapat membaca direktori data." });
  }
}
