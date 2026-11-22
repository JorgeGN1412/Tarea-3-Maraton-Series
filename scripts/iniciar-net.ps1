# Inicia el servidor del laboratorio con el SDK 10 disponible en este equipo.
$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskPortable = Join-Path (Split-Path -Parent $taskRoot) 'work/dotnet10/dotnet.exe'
if (Test-Path -LiteralPath $taskPortable) {
    $taskDotnet = $taskPortable
    $env:DOTNET_ROOT = Split-Path -Parent $taskDotnet
} else {
    $taskDotnet = (Get-Command dotnet -ErrorAction Stop).Source
    if (-not (& $taskDotnet --list-sdks | Select-String '^10\.')) {
        throw 'Instale el SDK .NET 10 para compilar net10.0.'
    }
}
$taskServer = Join-Path $taskRoot 'maraton-series/servidor-net'
if (Get-NetTCPConnection -LocalPort 5090 -State Listen -ErrorAction SilentlyContinue) {
    throw 'El puerto 5090 ya está ocupado. Compruebe si el servidor del laboratorio sigue encendido.'
}
Push-Location $taskServer
try {
    # La cadena se lee de user-secrets o ConnectionStrings__Maraton.
    & $taskDotnet run --launch-profile http
    if ($LASTEXITCODE -ne 0) { throw 'El servidor .NET terminó con un error.' }
} finally { Pop-Location }
