import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TrabajosModalComponent, MediaItem } from '../../components/trabajos-modal/trabajos-modal.component';

interface CategoriaTrabajos {
  id: string;
  titulo: string;
  descripcion: string;
  icono?: string;
  color?: string;
  imagen: string;
  items: MediaItem[];
}

interface MaquinaInfo {
  imagen: string;
  nombre: string;
}

@Component({
  selector: 'app-equipo-trabajos',
  standalone: true,
  imports: [CommonModule, TrabajosModalComponent],
  templateUrl: './equipo-trabajos.component.html',
  styleUrl: './equipo-trabajos.component.css'
})
export class EquipoTrabajosComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Dar tiempo a que los modales se rendericen
      setTimeout(() => {
        this.setupGlobalModalListeners();
      }, 200);

      // Manejar scroll a fragmento (sección específica)
      this.route.fragment.subscribe(fragment => {
        if (fragment) {
          setTimeout(() => {
            this.scrollToSection(fragment);
          }, 100);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Pausar todos los videos al salir del componente
      this.pauseAllGlobalVideos();
    }
  }

  private setupGlobalModalListeners(): void {
    // Configurar listeners globales para todos los modales de la página
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
      // Pausar videos globalmente cuando se cierra cualquier modal
      modal.addEventListener('hidden.bs.modal', () => {
        this.pauseAllGlobalVideos();
      });
    });
  }

  private pauseAllGlobalVideos(): void {
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
      const videoElement = video as HTMLVideoElement;
      videoElement.pause();
      videoElement.currentTime = 0;
    });
  }

  private scrollToSection(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      // Offset para compensar el navbar fixed
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
  
  // Lista de equipos
  equipoLista = [
    '2 Centros de maquinado HASS VF-2',
    'Fresadoras verticales (MACLANE No.2, MILL PORT No.2)',
    'Fresadora vertical KRV2000',
    'Tornos IMOR y VDF',
    'Marcadora láser',
    'Máquina de soldar LINCOLN',
    '2 Sierras cinta, capacidad de corte 7"'
  ];

  // Imágenes de maquinaria para el carrusel
  maquinas: MaquinaInfo[] = [
    { imagen: 'img/maquinas/hass-vf2.jpg', nombre: 'Centro de Maquinado HASS VF-2' },
    { imagen: 'img/maquinas/fresadora.png', nombre: 'Fresadora de tres ejes' },
    { imagen: 'img/maquinas/fresadora_v.png', nombre: 'Fresadora vertical KRV2000' },
    { imagen: 'img/maquinas/torno_VDF.png', nombre: 'Torno VDF' },
    { imagen: 'img/maquinas/torno-imor.png', nombre: 'Torno IMOR' },
    { imagen: 'img/maquinas/laser.jpg', nombre: 'Marcadora láser' },
    { imagen: 'img/maquinas/soldadora.png', nombre: 'Máquina de soldar LINCOLN' },
    { imagen: 'img/maquinas/sierra_cinta.png', nombre: 'Sierra Cinta, capacidad de corte de 7"' },
    { imagen: 'img/maquinas/marcadora_laser.png', nombre: 'Marcadora láser de alta precisión' }
  ];

  // Trabajos realizados
  trabajos: CategoriaTrabajos[] = [
    {
      id: 'piezas-grandes',
      titulo: 'Maquinado de piezas grandes',
      descripcion: 'Piezas de gran tamaño y alta precisión.',
      icono: '🔩',
      color: 'primary',
      imagen: 'img/piezas/grandes/pc1.jpg',
      items: [
        { tipo: 'imagen', src: 'img/piezas/grandes/pc1.jpg', alt: 'Pieza grande 1' },
        { tipo: 'imagen', src: 'img/piezas/grandes/pc2.jpg', alt: 'Pieza grande 2' }
      ]
    },
    {
      id: 'pavonado',
      titulo: 'Piezas con tratamiento y grabado',
      descripcion: 'Piezas con pavonado y grabado láser.',
      icono: '✨',
      color: 'warning',
      imagen: 'img/piezas/pavonado/p1.jpg',
      items: [
        { tipo: 'imagen', src: 'img/piezas/pavonado/p1.jpg', alt: 'Pavonado 1' },
        { tipo: 'imagen', src: 'img/piezas/pavonado/p2.jpg', alt: 'Pavonado 2' }
      ]
    },
    {
      id: 'pintura',
      titulo: 'Piezas con pintura y grabado',
      descripcion: 'Aplicación de pintura de alta durabilidad.',
      icono: '🎨',
      color: 'danger',
      imagen: 'img/piezas/pintura/pc3.jpg',
      items: [
        { tipo: 'imagen', src: 'img/piezas/pintura/pc3.jpg', alt: 'Pintura 1' },
        { tipo: 'imagen', src: 'img/piezas/pintura/pc4.jpg', alt: 'Pintura 2' },
        { tipo: 'imagen', src: 'img/piezas/pintura/pc5.jpg', alt: 'Pintura 3' },
        { tipo: 'imagen', src: 'img/piezas/pintura/pc8.jpg', alt: 'Pintura 4' }
      ]
    },
    {
      id: 'lotes',
      titulo: 'Lotes de Piezas',
      descripcion: 'Realizamos la fabricación en serie y lotes de piezas, según los requerimientos de nuestros clientes.',
      icono: '📦',
      color: 'success',
      imagen: 'img/piezas/lotes/pc6.jpg',
      items: [
        { tipo: 'imagen', src: 'img/piezas/lotes/pc6.jpg', alt: 'Lote de piezas 1' },
        { tipo: 'imagen', src: 'img/piezas/lotes/pc7.jpg', alt: 'Lote de piezas 2' }
      ]
    },
    {
      id: 'dispositivos',
      titulo: 'Dispositivos',
      descripcion: 'Fabricamos dispositivos especializados según los requerimientos de nuestros clientes.',
      icono: '⚙️',
      color: 'info',
      imagen: 'img/proximamente.png',
      items: [
        { tipo: 'imagen', src: 'img/proximamente.png', alt: 'Dispositivo 1 (Próximamente)' },
        { tipo: 'imagen', src: 'img/proximamente.png', alt: 'Dispositivo 2 (Próximamente)' }
      ]
    }
  ];

  // Mantenimiento
  mantenimiento: CategoriaTrabajos[] = [
    {
      id: 'mantenimiento',
      titulo: 'Mantenimiento',
      descripcion: 'Ofrecemos mantenimiento preventivo y correctivo en moldes, troqueles, matrices, punzones y cilindros neumáticos.',
      icono: '🔧',
      color: 'success',
      imagen: 'img/piezas/mantenimiento/img.jpeg',
      items: [
        { tipo: 'imagen', src: 'img/piezas/mantenimiento/img.jpeg', alt: 'Mantenimiento de maquinaria 1' },
        { tipo: 'imagen', src: 'img/piezas/mantenimiento/img2.jpeg', alt: 'Mantenimiento de maquinaria 2' },
        { tipo: 'imagen', src: 'img/piezas/mantenimiento/img3.jpeg', alt: 'Mantenimiento de maquinaria 3' }
      ]
    }
  ];

  // Diseño y programación
  disenoProgra: CategoriaTrabajos[] = [
    {
      id: 'mastercam',
      titulo: 'Diseño y programación',
      descripcion: 'Diseño 3D, simulación de mecanizado y resultado final de la pieza.',
      icono: '💻',
      color: 'info',
      imagen: 'img/diseno/d1.jpg',
      items: [
        { tipo: 'imagen', src: 'img/diseno/d3.jpg', alt: 'Diseño 1' },
        { tipo: 'imagen', src: 'img/diseno/s2.jpg', alt: 'Diseño 2' },
        { tipo: 'imagen', src: 'img/diseno/d1.jpg', alt: 'Diseño 3' }
      ]
    }
  ];
}