import { Directive, ElementRef, Input, OnInit, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: 'img[appOptimizeImage]',
  standalone: true
})
export class OptimizeImageDirective implements OnInit {
  @Input() src!: string;
  @Input() alt: string = '';
  @Input() loading: 'lazy' | 'eager' = 'lazy';

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupOptimizedImage();
    }
  }

  private setupOptimizedImage(): void {
    const img = this.el.nativeElement;

    // Configurar loading
    this.renderer.setAttribute(img, 'loading', this.loading);

    // Configurar alt
    if (this.alt) {
      this.renderer.setAttribute(img, 'alt', this.alt);
    }

    // Agregar placeholder mientras carga
    this.renderer.addClass(img, 'img-loading');

    // Verificar soporte de WebP
    if (this.supportsWebP() && this.src) {
      const webpSrc = this.convertToWebP(this.src);
      
      // Crear elemento picture para fallback
      this.createPictureElement(webpSrc, this.src);
    } else {
      this.loadImage(this.src);
    }

    // Evento cuando la imagen termine de cargar
    img.addEventListener('load', () => {
      this.renderer.removeClass(img, 'img-loading');
      this.renderer.addClass(img, 'img-loaded');
    });

    img.addEventListener('error', () => {
      this.renderer.removeClass(img, 'img-loading');
      this.renderer.addClass(img, 'img-error');
      // Fallback a imagen por defecto
      if (img.src !== 'img/proximamente.png') {
        this.renderer.setAttribute(img, 'src', 'img/proximamente.png');
      }
    });
  }

  private supportsWebP(): boolean {
    // Verificar si el navegador soporta WebP
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  }

  private convertToWebP(src: string): string {
    // Si la imagen ya es webp, retornarla
    if (src.endsWith('.webp')) {
      return src;
    }
    // Intentar convertir extensión a webp
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }

  private createPictureElement(webpSrc: string, fallbackSrc: string): void {
    const img = this.el.nativeElement;
    const parent = img.parentElement;

    if (parent && !parent.classList.contains('picture-wrapper')) {
      // Crear elemento picture
      const picture = this.renderer.createElement('picture');
      this.renderer.addClass(picture, 'picture-wrapper');

      // Source WebP
      const sourceWebP = this.renderer.createElement('source');
      this.renderer.setAttribute(sourceWebP, 'srcset', webpSrc);
      this.renderer.setAttribute(sourceWebP, 'type', 'image/webp');

      // Source fallback
      const sourceFallback = this.renderer.createElement('source');
      this.renderer.setAttribute(sourceFallback, 'srcset', fallbackSrc);
      this.renderer.setAttribute(sourceFallback, 'type', this.getMimeType(fallbackSrc));

      // Insertar antes de la imagen
      parent.insertBefore(picture, img);
      picture.appendChild(sourceWebP);
      picture.appendChild(sourceFallback);
      picture.appendChild(img);
    }

    this.loadImage(fallbackSrc);
  }

  private loadImage(src: string): void {
    this.renderer.setAttribute(this.el.nativeElement, 'src', src);
  }

  private getMimeType(src: string): string {
    if (src.endsWith('.png')) return 'image/png';
    if (src.endsWith('.jpg') || src.endsWith('.jpeg')) return 'image/jpeg';
    if (src.endsWith('.webp')) return 'image/webp';
    return 'image/jpeg';
  }
}
