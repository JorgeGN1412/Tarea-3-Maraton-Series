import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
const require = createRequire(import.meta.url);
// TypeScript se usa como analizador sintáctico de JSX, no para convertir el proyecto a TS.
const ts = require(process.argv[2] || 'typescript');
const raiz = path.resolve(import.meta.dirname, '..');
const archivos = [];
function recorrer(carpeta) {
    for (const entrada of fs.readdirSync(carpeta, { withFileTypes: true })) {
        if (['node_modules', '.git', 'bin', 'obj', 'dist'].includes(entrada.name))
            continue;
        const ruta = path.join(carpeta, entrada.name);
        if (entrada.isDirectory())
            recorrer(ruta);
        else
            archivos.push(ruta);
    }
}
recorrer(raiz);
let fallos = 0, js = 0, jsx = 0, json = 0, imports = 0;
for (const archivo of archivos) {
    const extension = path.extname(archivo);
    const texto = fs.readFileSync(archivo, 'utf8');
    if (extension === '.json') {
        json++;
        try {
            JSON.parse(texto);
        }
        catch (e) {
            console.error(archivo, e.message);
            fallos++;
        }
    }
    if (['.js', '.mjs'].includes(extension)) {
        js++;
        const r = spawnSync(process.execPath, ['--check', archivo], { encoding: 'utf8' });
        if (r.status !== 0) {
            console.error(r.stderr);
            fallos++;
        }
    }
    if (extension === '.jsx') {
        jsx++;
        const r = ts.transpileModule(texto, { fileName: archivo, reportDiagnostics: true,
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
        for (const d of r.diagnostics || [])
            if (d.category === ts.DiagnosticCategory.Error) {
                console.error(archivo, ts.flattenDiagnosticMessageText(d.messageText, ' '));
                fallos++;
            }
    }
    if (['.js', '.mjs', '.jsx'].includes(extension)) {
        const arbol = ts.createSourceFile(archivo, texto, ts.ScriptTarget.Latest, true, extension === '.jsx' ? ts.ScriptKind.JSX : ts.ScriptKind.JS);
        for (const nodo of arbol.statements) {
            if (!ts.isImportDeclaration(nodo) || !nodo.moduleSpecifier.text.startsWith('.'))
                continue;
            imports++;
            const destino = path.resolve(path.dirname(archivo), nodo.moduleSpecifier.text);
            if (!fs.existsSync(destino)) {
                console.error('Import no encontrado:', archivo, destino);
                fallos++;
            }
        }
    }
}
const resumen = { js, jsx, json, importsLocales: imports, errores: fallos,
    alcance: 'Sintaxis y existencia de imports. No sustituye build, lint ni prueba funcional.' };
console.log(JSON.stringify(resumen, null, 2));
process.exitCode = fallos ? 1 : 0;
