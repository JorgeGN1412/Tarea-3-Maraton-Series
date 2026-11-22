import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
// Sirve únicamente proyectos-base; no publica el repositorio ni credenciales.
const raiz = resolve(import.meta.dirname, '../proyectos-base');
const tipos = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};
createServer(async (req, res) => {
  try {
    const ruta = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
    const archivo = resolve(raiz, '.' + ruta + (ruta.endsWith('/') ? 'index.html' : ''));
    if (!archivo.startsWith(raiz + sep) || ruta.split('/').some((p) => p.startsWith('.'))) {
      res.writeHead(403).end();
      return;
    }
    const datos = await readFile(archivo);
    res
      .writeHead(200, { 'Content-Type': tipos[extname(archivo)] || 'application/octet-stream' })
      .end(datos);
  } catch {
    res.writeHead(404).end('No encontrado');
  }
}).listen(5501, '127.0.0.1', () =>
  console.log('HTML: http://127.0.0.1:5501/pura-vida-tours/parte1-html/'),
);
