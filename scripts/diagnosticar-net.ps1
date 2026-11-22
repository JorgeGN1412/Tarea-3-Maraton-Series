# Ejecutar desde una terminal normal de VS Code. No cambia el firewall ni certificados.
$ErrorActionPreference='Stop'
$taskRoot=Split-Path -Parent $PSScriptRoot
$taskParent=Split-Path -Parent $taskRoot
$taskSdkRoot=Join-Path $taskParent 'work/dotnet10'
$taskDotnet=Join-Path $taskSdkRoot 'dotnet.exe'
if (!(Test-Path -LiteralPath $taskDotnet)) { throw 'No se encontró el SDK 10 preparado en work/dotnet10.' }
$taskServer=Join-Path $taskRoot 'maraton-series/servidor-net'
$taskDll=Join-Path $taskServer 'bin/Debug/net10.0/MaratonApi.dll'
if (!(Test-Path -LiteralPath $taskDll)) { throw 'Falta compilar el servidor .NET.' }
$taskLogs=Join-Path $taskParent 'work/net-diagnostico'
New-Item -ItemType Directory -Path $taskLogs -Force | Out-Null
$env:DOTNET_ROOT=$taskSdkRoot
$env:ConnectionStrings__Maraton='Server=localhost;Database=Maraton_Tarea3_Jorge;Trusted_Connection=True;TrustServerCertificate=True;Connect Timeout=5'
$taskPort=5090
if (Get-NetTCPConnection -LocalPort $taskPort -State Listen -ErrorAction SilentlyContinue) { throw 'El puerto 5090 está ocupado. No se cerró ningún proceso existente.' }
$taskProcess=Start-Process -FilePath $taskDotnet -ArgumentList @(('"'+$taskDll+'"'),'--urls',"http://127.0.0.1:$taskPort") -WorkingDirectory $taskServer -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $taskLogs 'salida.log') -RedirectStandardError (Join-Path $taskLogs 'errores.log')
$taskResultados=[ordered]@{pid=$taskProcess.Id;puerto=$taskPort;raiz=$null;miembros=$null;series=$null}
try {
 for ($taskIntento=0;$taskIntento -lt 15;$taskIntento++) {
  if ($taskProcess.HasExited) { throw 'El servidor terminó durante el arranque; revisar errores.log.' }
  if (Get-NetTCPConnection -LocalPort $taskPort -State Listen -ErrorAction SilentlyContinue) { break }
  Start-Sleep -Milliseconds 500
 }
 foreach ($taskRuta in @(@('raiz','/'),@('miembros','/api/miembros'),@('series','/api/series'))) {
  try {
   $taskRespuesta=Invoke-WebRequest -UseBasicParsing -Uri ("http://127.0.0.1:$taskPort"+$taskRuta[1]) -TimeoutSec 8
   $taskResultados[$taskRuta[0]]=@{estado=[int]$taskRespuesta.StatusCode;cuerpo=$taskRespuesta.Content}
  } catch { $taskResultados[$taskRuta[0]]=@{error=$_.Exception.Message} }
 }
} finally {
 $taskFile=Join-Path $taskRoot 'docs/diagnostico-net.json'
 $taskResultados | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $taskFile -Encoding utf8
 Write-Host "Diagnóstico guardado en $taskFile"
 Write-Host "Proceso de prueba: $($taskProcess.Id). Logs: $taskLogs"
 $taskResultados | ConvertTo-Json -Depth 6
}
