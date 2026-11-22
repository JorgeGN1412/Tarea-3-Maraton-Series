$ErrorActionPreference='Stop'
$taskRoot=Split-Path -Parent $PSScriptRoot
$taskSeries=Invoke-RestMethod -Uri 'http://127.0.0.1:5090/api/series' -TimeoutSec 25
$taskMiembros=Invoke-RestMethod -Uri 'http://127.0.0.1:5090/api/miembros' -TimeoutSec 25
if (@($taskSeries).Count -ne 5 -or @($taskMiembros).Count -ne 4) { throw 'Cantidades inesperadas en las rutas .NET' }
foreach ($taskSerie in $taskSeries) {
 if ($taskSerie._id -isnot [string] -or $taskSerie.miembroId -isnot [string]) { throw 'Los identificadores deben ser texto' }
 foreach ($taskCampo in @('_id','titulo','genero','temporadas','estado','miembroId','miembro')) {
  if ($taskCampo -notin $taskSerie.PSObject.Properties.Name) { throw "Falta el campo $taskCampo" }
 }
}
@{series=$taskSeries;miembros=$taskMiembros;verificado=Get-Date -Format o} | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath (Join-Path $taskRoot 'docs/pruebas-net.json') -Encoding utf8
& sqlcmd -S localhost -E -C -d Maraton_Tarea3_Jorge -i (Join-Path $taskRoot 'maraton-series/servidor-net/consultas.sql') -o (Join-Path $taskRoot 'docs/resultados-sql.txt') -b
if ($LASTEXITCODE -ne 0) { throw 'Fallaron las consultas SQL' }
Write-Host 'NET VERIFICADO: 5 series, 4 miembros, ids de texto, contrato y consultas SQL correctos.'
