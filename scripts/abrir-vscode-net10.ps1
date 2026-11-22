# Abre un entorno del laboratorio que hereda el SDK 10, sin cambiar el PATH global.
$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskWork = Join-Path (Split-Path -Parent $taskRoot) 'work'
$taskSdk = Join-Path $taskWork 'dotnet10'
$taskExe = Join-Path $taskSdk 'dotnet.exe'
if (!(Test-Path -LiteralPath $taskExe)) {
    $taskExe = (Get-Command dotnet -ErrorAction Stop).Source
    if (-not (& $taskExe --list-sdks | Select-String '^10\.')) {
        throw 'Se necesita el SDK .NET 10, instalado o preparado en work/dotnet10.'
    }
    $taskSdk = Split-Path -Parent $taskExe
}
$taskCode = Join-Path $env:LOCALAPPDATA 'Programs/Microsoft VS Code/Code.exe'
if (!(Test-Path -LiteralPath $taskCode)) { throw 'No se encontró VS Code en la instalación del usuario.' }
$taskOldPath = $env:PATH
$taskOldRoot = $env:DOTNET_ROOT
$taskOldHost = $env:DOTNET_HOST_PATH
try {
    $env:PATH = $taskSdk + ';' + $taskOldPath
    $env:DOTNET_ROOT = $taskSdk
    $env:DOTNET_HOST_PATH = $taskExe
    $taskProfile = Join-Path $taskWork 'vscode-net10'
    $taskWorkspace = Join-Path $taskRoot 'tarea-3.code-workspace'
    # Se abre una ventana visible porque este es el editor en el que trabajará el alumno.
    Start-Process -FilePath $taskCode -ArgumentList @('--user-data-dir', ('"'+$taskProfile+'"'), '--new-window', ('"'+$taskWorkspace+'"')) -WindowStyle Normal
} finally {
    $env:PATH = $taskOldPath
    $env:DOTNET_ROOT = $taskOldRoot
    $env:DOTNET_HOST_PATH = $taskOldHost
}
