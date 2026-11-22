import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
// Servidor estático mínimo para módulos ES; restringe las rutas a esta carpeta.
const raiz = resolve(import.meta.dirname);
const tipos = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
createServer(async (req, res) => {
    try {
        const nombre = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        const archivo = resolve(raiz, '.' + (nombre === '/' ? '/index.html' : nombre));
        if (!archivo.startsWith(raiz + sep)) {
            res.writeHead(403).end();
            return;
        }
        const datos = await readFile(archivo);
        res.writeHead(200, { 'Content-Type': tipos[extname(archivo)] || 'application/octet-stream' }).end(datos);
    }
    catch {
        res.writeHead(404).end('No encontrado');
    }
}).listen(5500, '127.0.0.1', () => console.log('Series JS: http://localhost:5500'));
