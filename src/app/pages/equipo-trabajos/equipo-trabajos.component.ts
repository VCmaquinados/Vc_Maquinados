import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-equipo-trabajos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipo-trabajos.component.html',
  styleUrl: './equipo-trabajos.component.css'
})
export class EquipoTrabajosComponent implements OnInit {
  maquinas = [
    'assets/img/maquinas/hass-vf2.jpg',
    'assets/img/maquinas/fresadora.jpg',
    'assets/img/maquinas/torno.jpg'
  ];

  trabajosGrandes = [
    'assets/img/piezas/grandes/pieza1.jpg',
    'assets/img/piezas/grandes/pieza2.jpg'
  ];

  videos = [
    { src: 'assets/videos/cnc/video1.mp4', thumb: 'assets/img/videos/cnc/thumb1.jpg' },
    { src: 'assets/videos/programacion/video2.mp4', thumb: 'assets/img/videos/programacion/thumb2.jpg' }
  ];

  currentVideo: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  openVideoModal(videoSrc: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentVideo = videoSrc;
      const modalElement = document.getElementById('videoModal');
      if (modalElement && (window as any).bootstrap) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
        
        modalElement.addEventListener('hidden.bs.modal', () => {
          this.currentVideo = '';
        });
      }
    }
  }
}