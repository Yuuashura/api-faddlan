import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Trik untuk mendapatkan __dirname di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let database = { }; // Default ke array kosong

try {
  // Membaca file db.json dan mengubahnya menjadi objek JavaScript
  const dbPath = path.join(__dirname, 'list.json');
  const jsonData = fs.readFileSync(dbPath, 'utf-8');
  database = JSON.parse(jsonData);
  console.log("✅ Berhasil memuat db.json");
} catch (error) {
  console.error("❌ GAGAL memuat atau mem-parsing db.json:", error);
  // Jika gagal, 'database' akan tetap berisi array kosong
  // Ini mencegah server crash total
}

// Mengekspor data agar bisa digunakan di file lain
export default database;
