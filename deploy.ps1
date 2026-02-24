# Script de despliegue automatizado para GitHub Pages
Write-Host "🚀 Iniciando despliegue a GitHub Pages..." -ForegroundColor Cyan

# 1. Build de producción
Write-Host "`n📦 Compilando proyecto..." -ForegroundColor Yellow
npm run build:github

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en el build. Abortando deploy." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completado exitosamente" -ForegroundColor Green

# 2. Ir a la carpeta de distribución
$distPath = "dist\vc-maquinados-pag\browser"

if (-not (Test-Path $distPath)) {
    Write-Host "❌ No se encontró la carpeta de distribución: $distPath" -ForegroundColor Red
    exit 1
}

Write-Host "`n📂 Navegando a carpeta de distribución..." -ForegroundColor Yellow
Push-Location $distPath

# 3. Inicializar git y hacer commit
Write-Host "`n📝 Preparando archivos para deploy..." -ForegroundColor Yellow
git init
git add .
$commitMessage = "Deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git commit -m $commitMessage

# 4. Configurar y empujar a gh-pages
Write-Host "`n🌐 Subiendo a GitHub Pages..." -ForegroundColor Yellow
git branch -M gh-pages
git remote add origin https://github.com/VCmaquinados/VcMaquinadosPag.git 2>$null
git push -u origin gh-pages --force

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al empujar a GitHub. Verifica tu conexión y permisos." -ForegroundColor Red
    Pop-Location
    exit 1
}

# 5. Volver a la raíz del proyecto
Pop-Location

# 6. Limpiar carpeta temporal (opcional)
Write-Host "`n🧹 ¿Deseas limpiar la carpeta dist? (S/N)" -ForegroundColor Yellow
$clean = Read-Host
if ($clean -eq "S" -or $clean -eq "s") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✅ Carpeta dist limpiada" -ForegroundColor Green
}

Write-Host "`n✨ ¡Deploy completado exitosamente! ✨" -ForegroundColor Green
Write-Host "`n🌐 Tu sitio estará disponible en:" -ForegroundColor Cyan
Write-Host "   https://vcmaquinados.github.io/VcMaquinadosPag/" -ForegroundColor White
Write-Host "`n⏱️  Espera 1-2 minutos para que GitHub Pages actualice el sitio.`n" -ForegroundColor Yellow
