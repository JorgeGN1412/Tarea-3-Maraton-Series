# Ejecutar en una terminal con acceso a Internet. No modifica credenciales ni instala servicios.
$ErrorActionPreference = 'Stop'
$taskProjectRoot = Split-Path -Parent $PSScriptRoot
$taskProjects = @('.', 'maraton-series/cliente', 'maraton-series/servidor',
 'proyectos-base/conceptos-react', 'proyectos-base/series-js', 'proyectos-base/solicitudes/parte2-react')
foreach ($taskProject in $taskProjects) {
 Push-Location (Join-Path $taskProjectRoot $taskProject)
 try {
  & npm.cmd install
  if ($LASTEXITCODE -ne 0) { throw "Fallo npm install en $taskProject" }
 } finally { Pop-Location }
}
Push-Location $taskProjectRoot
try {
 & npm.cmd run check
 if ($LASTEXITCODE -ne 0) { throw 'Fallo la comprobación estática' }
 & npm.cmd test
 if ($LASTEXITCODE -ne 0) { throw 'Fallaron las pruebas' }
 foreach ($taskProject in @('maraton-series/cliente','proyectos-base/conceptos-react','proyectos-base/solicitudes/parte2-react')) {
  Push-Location $taskProject
  try { & npm.cmd run build; if ($LASTEXITCODE -ne 0) { throw "Fallo build en $taskProject" } }
  finally { Pop-Location }
 }
} finally { Pop-Location }
Write-Host 'Dependencias, comprobaciones y builds terminados. Falta configurar las bases y probar los recorridos completos.'
