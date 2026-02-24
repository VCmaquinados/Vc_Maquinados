import { Component, Input, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface MediaItem {
  tipo: 'imagen' | 'video';
  src: string;
  alt?: string;
}

@Component({
  selector: 'app-trabajos-modal',
  imports: [CommonModule],
  templateUrl: './trabajos-modal.component.html',
  styleUrl: './trabajos-modal.component.css'
})
export class TrabajosModalComponent implements OnInit, OnDestroy {
  @Input() modalId: string = '';
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() items: MediaItem[] = [];

  private triggerButton: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Dar tiempo al DOM para renderizarse completamente
      setTimeout(() => {
        this.setupModalEventListeners();
        this.setupCarouselEventListeners();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    // Limpiar event listeners si es necesario
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById(this.modalId);
      if (modalElement) {
        this.pauseAllVideos(modalElement);
      }
    }
  }

  private setupModalEventListeners(): void {
    const modalElement = document.getElementById(this.modalId);
    if (!modalElement) return;

    // Guardar referencia al botón que abrió el modal (para accesibilidad)
    modalElement.addEventListener('show.bs.modal', (event: any) => {
      this.triggerButton = event.relatedTarget || document.activeElement;
    });

    // Reproducir video activo cuando se abre el modal
    modalElement.addEventListener('shown.bs.modal', () => {
      const carouselElement = modalElement.querySelector('.carousel');
      if (carouselElement) {
        const activeVideo = carouselElement.querySelector('.carousel-item.active video') as HTMLVideoElement;
        if (activeVideo) {
          this.playVideo(activeVideo);
        }
      }
    });

    // Quitar foco de elementos internos al empezar a cerrar
    modalElement.addEventListener('hide.bs.modal', () => {
      const activeElement = document.activeElement as HTMLElement;
      if (modalElement.contains(activeElement)) {
        activeElement.blur();
      }
    });

    // Pausar videos y devolver foco cuando el modal está completamente cerrado
    modalElement.addEventListener('hidden.bs.modal', () => {
      this.pauseAllVideos(modalElement);
      this.pauseGlobalVideos();
      
      // Devolver el foco al botón que abrió el modal (accesibilidad)
      if (this.triggerButton && typeof this.triggerButton.focus === 'function') {
        setTimeout(() => {
          this.triggerButton.focus();
        }, 100);
      }
    });
  }

  private setupCarouselEventListeners(): void {
    const modalElement = document.getElementById(this.modalId);
    if (!modalElement) return;

    const carouselElement = modalElement.querySelector('.carousel');
    if (!carouselElement) return;

    // Pausar videos al cambiar de slide
    carouselElement.addEventListener('slide.bs.carousel', () => {
      const videos = carouselElement.querySelectorAll('video');
      videos.forEach(video => {
        const videoElement = video as HTMLVideoElement;
        videoElement.pause();
      });
    });

    // Reproducir video del slide activo después del cambio
    carouselElement.addEventListener('slid.bs.carousel', () => {
      const activeVideo = carouselElement.querySelector('.carousel-item.active video') as HTMLVideoElement;
      if (activeVideo) {
        this.playVideo(activeVideo);
      }
    });
  }

  private playVideo(video: HTMLVideoElement | null): void {
    if (video) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay bloqueado; el usuario necesitará presionar play manualmente
        });
      }
    }
  }

  private pauseAllVideos(container: HTMLElement): void {
    const videos = container.querySelectorAll('video');
    videos.forEach(video => {
      const videoElement = video as HTMLVideoElement;
      videoElement.pause();
      videoElement.currentTime = 0;
    });
  }

  private pauseGlobalVideos(): void {
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
      const videoElement = video as HTMLVideoElement;
      videoElement.pause();
      videoElement.currentTime = 0;
    });
  }

  contarImagenes(): number {
    return this.items.filter(item => item.tipo === 'imagen').length;
  }

  contarVideos(): number {
    return this.items.filter(item => item.tipo === 'video').length;
  }
}
