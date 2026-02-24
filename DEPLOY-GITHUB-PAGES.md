# 🚀 Despliegue en GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages.

## 📋 URL del Sitio

**URL de producción:** https://vcmaquinados.github.io/VcMaquinadosPag/

## 🛠️ Pasos para Desplegar

### 1. Hacer Build de Producción

```bash
npm run build:github
```

Este comando generará los archivos optimizados en la carpeta `dist/vc-maquinados-pag/browser/`

### 2. Preparar Branch gh-pages

#### Primera vez (Crear el branch):

```bash
# 1. Ir a la carpeta de distribución
cd dist/vc-maquinados-pag/browser

# 2. Inicializar repositorio git
git init
git add .
git commit -m "Deploy to GitHub Pages"

# 3. Crear y empujar al branch gh-pages
git branch -M gh-pages
git remote add origin https://github.com/VCmaquinados/VcMaquinadosPag.git
git push -u origin gh-pages --force
```

#### Actualizaciones posteriores:

```bash
# 1. Hacer el build
npm run build:github

# 2. Ir a la carpeta de distribución
cd dist/vc-maquinados-pag/browser

# 3. Actualizar gh-pages
git init
git add .
git commit -m "Update $(date)"
git branch -M gh-pages
git remote add origin https://github.com/VCmaquinados/VcMaquinadosPag.git
git push -u origin gh-pages --force

# 4. Volver a la raíz
cd ../../..
```

### 3. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub: https://github.com/VCmaquinados/VcMaquinadosPag
2. Ve a **Settings** > **Pages**
3. En **Source**, selecciona el branch **gh-pages**
4. En **Folder**, selecciona **/ (root)**
5. Click en **Save**

Espera 1-2 minutos y tu sitio estará disponible en: https://vcmaquinados.github.io/VcMaquinadosPag/

## ✅ Archivos Configurados para GitHub Pages

- ✅ **404.html** - Maneja las rutas SPA
- ✅ **.nojekyll** - Evita procesamiento Jekyll
- ✅ **robots.txt** - URL actualizada
- ✅ **sitemap.xml** - URL actualizada
- ✅ **index.html** - Meta tags con URL correcta
- ✅ **package.json** - Script `build:github` con base-href

## 🔧 Qué Hace Cada Archivo

### 404.html
Cuando alguien accede directamente a `https://vcmaquinados.github.io/VcMaquinadosPag/equipo-trabajos`, GitHub Pages devolvería un 404 porque esa ruta no existe físicamente. El archivo `404.html` captura este error y redirige al `index.html`, permitiendo que Angular maneje la navegación.

### .nojekyll
GitHub Pages usa Jekyll por defecto, que ignora carpetas que empiezan con `_`. Angular genera archivos con `_`, así que este archivo desactiva Jekyll.

### Script en index.html
Restaura la URL correcta después de la redirección desde `404.html`, manteniendo la ruta que el usuario quería visitar.

## 📊 Optimizaciones que Funcionan en GitHub Pages

✅ **SEO** - Todos los meta tags funcionan
✅ **Lazy Loading** - Rutas con carga diferida
✅ **Image Optimization** - Directiva de imágenes optimizadas
✅ **Loading Spinner** - Indicador de carga
✅ **robots.txt y sitemap.xml** - URLs actualizadas
✅ **Responsive Design** - Compatible con todos los dispositivos

## ⚠️ Limitaciones de GitHub Pages

❌ **No SSR (Server-Side Rendering)** - Solo archivos estáticos
❌ **No Backend** - No puedes tener APIs o bases de datos
❌ **No .htaccess** - No puedes usar configuraciones de Apache

Pero para un sitio web de presentación como el tuyo, ¡GitHub Pages es perfecto! 🎉

## 🔄 Script Rápido de Deploy

Crea un archivo `deploy.ps1` para automatizar:

```powershell
# Build
npm run build:github

# Deploy
cd dist/vc-maquinados-pag/browser
git init
git add .
git commit -m "Deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git branch -M gh-pages
git remote add origin https://github.com/VCmaquinados/VcMaquinadosPag.git
git push -u origin gh-pages --force
cd ../../..

Write-Host "✅ Deploy completado! Visita: https://vcmaquinados.github.io/VcMaquinadosPag/" -ForegroundColor Green
```

Luego solo ejecuta: `.\deploy.ps1`

## 🌐 Dominio Personalizado (Opcional)

Si más adelante quieres usar tu propio dominio (`moldesmaquinadosvc.com`):

1. Compra el dominio en un registrador (GoDaddy, Namecheap, etc.)
2. Crea un archivo `CNAME` en `public/` con tu dominio:
   ```
   moldesmaquinadosvc.com
   ```
3. Configura los DNS en tu registrador:
   ```
   A    185.199.108.153
   A    185.199.109.153
   A    185.199.110.153
   A    185.199.111.153
   CNAME www moldesmaquinadosvc.com
   ```
4. Actualiza las URLs en `sitemap.xml`, `robots.txt` e `index.html`

¡Y listo! 🚀
