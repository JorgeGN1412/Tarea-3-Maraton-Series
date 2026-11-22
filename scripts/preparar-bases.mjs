import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';

// Ejecuta el npm de la instalación de Node con argumentos separados, sin shell.
const npm = resolve(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js');
const raiz = resolve(import.meta.dirname, '..');
const resultados = [];
await ejecutar('.', ['install', '--no-audit', '--no-fund']);
async function ejecutar(carpeta, args) {
  await new Promise((ok, fallo) => {
    const proceso = spawn(process.execPath, [npm, ...args], {
      cwd: resolve(raiz, carpeta),
      stdio: 'inherit',
    });
    proceso.once('error', fallo);
    proceso.once('exit', (codigo) =>
      codigo === 0
        ? ok()
        : fallo(new Error(carpeta + ': npm ' + args.join(' ') + ' salió con ' + codigo)),
    );
  });
  resultados.push({ carpeta, comando: 'npm ' + args.join(' '), aprobada: true });
}
for (const carpeta of [
  'proyectos-base/conceptos-react',
  'proyectos-base/solicitudes/parte2-react',
  'proyectos-base/series-js',
  'proyectos-base/pura-vida-tours/parte2-react',
]) {
  await ejecutar(carpeta, ['install', '--no-audit', '--no-fund']);
  if (!carpeta.endsWith('series-js')) await ejecutar(carpeta, ['run', 'build']);
  if (carpeta.endsWith('conceptos-react')) await ejecutar(carpeta, ['run', 'lint']);
}
await writeFile(
  resolve(raiz, 'docs/pruebas-bases.json'),
  JSON.stringify({ fecha: new Date().toISOString(), resultados }, null, 2),
);
console.log('BASES VERIFICADAS: dependencias, dos builds y linter.');
