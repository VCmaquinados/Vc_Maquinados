# Script para convertir todas las imágenes a WebP
# Requiere tener instalado cwebp: https://developers.google.com/speed/webp/download

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Conversor de Imágenes a WebP" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si cwebp está instalado
try {
    $null = Get-Command cwebp -ErrorAction Stop
    Write-Host "✓ cwebp encontrado" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: cwebp no está instalado" -ForegroundColor Red
    Write-Host "  Instala desde: https://developers.google.com/speed/webp/download" -ForegroundColor Yellow
    Write-Host "  O con Chocolatey: choco install webp" -ForegroundColor Yellow
    exit 1
}

# Calidad de conversión (ajustable)
$quality = 80

# Carpetas a procesar
$folders = @(
    "public/img/home",
    "public/img/maquinas", 
    "public/img/piezas",
    "public/img/clientes",
    "public/img/diseno"
)

$totalConverted = 0
$totalSkipped = 0

foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Write-Host ""
        Write-Host "📁 Procesando: $folder" -ForegroundColor Cyan
        Write-Host "----------------------------------------" -ForegroundColor Gray
        
        # Convertir JPG
        $jpgFiles = Get-ChildItem -Path $folder -Filter *.jpg -Recurse
        foreach ($file in $jpgFiles) {
            $webpPath = $file.FullName -replace '\.jpg$', '.webp'
            if (-not (Test-Path $webpPath)) {
                Write-Host "  🔄 $($file.Name) → $($file.BaseName).webp" -ForegroundColor Yellow
                & cwebp $file.FullName -o $webpPath -q $quality -quiet
                
                # Mostrar ahorro de espacio
                $originalSize = [math]::Round((Get-Item $file.FullName).Length / 1KB, 2)
                $webpSize = [math]::Round((Get-Item $webpPath).Length / 1KB, 2)
                $savings = [math]::Round((($originalSize - $webpSize) / $originalSize) * 100, 1)
                Write-Host "     Tamaño: $originalSize KB → $webpSize KB (ahorro: $savings%)" -ForegroundColor Green
                $totalConverted++
            } else {
                Write-Host "  ⏭  $($file.Name) (ya existe WebP)" -ForegroundColor DarkGray
                $totalSkipped++
            }
        }
        
        # Convertir JPEG
        $jpegFiles = Get-ChildItem -Path $folder -Filter *.jpeg -Recurse
        foreach ($file in $jpegFiles) {
            $webpPath = $file.FullName -replace '\.jpeg$', '.webp'
            if (-not (Test-Path $webpPath)) {
                Write-Host "  🔄 $($file.Name) → $($file.BaseName).webp" -ForegroundColor Yellow
                & cwebp $file.FullName -o $webpPath -q $quality -quiet
                
                $originalSize = [math]::Round((Get-Item $file.FullName).Length / 1KB, 2)
                $webpSize = [math]::Round((Get-Item $webpPath).Length / 1KB, 2)
                $savings = [math]::Round((($originalSize - $webpSize) / $originalSize) * 100, 1)
                Write-Host "     Tamaño: $originalSize KB → $webpSize KB (ahorro: $savings%)" -ForegroundColor Green
                $totalConverted++
            } else {
                Write-Host "  ⏭  $($file.Name) (ya existe WebP)" -ForegroundColor DarkGray
                $totalSkipped++
            }
        }
        
        # Convertir PNG
        $pngFiles = Get-ChildItem -Path $folder -Filter *.png -Recurse
        foreach ($file in $pngFiles) {
            $webpPath = $file.FullName -replace '\.png$', '.webp'
            if (-not (Test-Path $webpPath)) {
                Write-Host "  🔄 $($file.Name) → $($file.BaseName).webp" -ForegroundColor Yellow
                & cwebp $file.FullName -o $webpPath -q $quality -quiet
                
                $originalSize = [math]::Round((Get-Item $file.FullName).Length / 1KB, 2)
                $webpSize = [math]::Round((Get-Item $webpPath).Length / 1KB, 2)
                $savings = [math]::Round((($originalSize - $webpSize) / $originalSize) * 100, 1)
                Write-Host "     Tamaño: $originalSize KB → $webpSize KB (ahorro: $savings%)" -ForegroundColor Green
                $totalConverted++
            } else {
                Write-Host "  ⏭  $($file.Name) (ya existe WebP)" -ForegroundColor DarkGray
                $totalSkipped++
            }
        }
    } else {
        Write-Host "  ⚠  Carpeta no encontrada: $folder" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Resumen" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ Imágenes convertidas: $totalConverted" -ForegroundColor Green
Write-Host "⏭ Imágenes omitidas: $totalSkipped" -ForegroundColor Gray
Write-Host ""
Write-Host "¡Conversión completada! 🎉" -ForegroundColor Green
Write-Host "Nota: Las imágenes originales se mantienen como fallback" -ForegroundColor Yellow
Write-Host ""
