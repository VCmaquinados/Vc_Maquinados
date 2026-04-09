import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CarouselHeaderComponent } from '../../components/carousel-header/carousel-header.component';
import { ClientesCarouselComponent } from '../../components/clientes-carousel/clientes-carousel.component';
import { TrabajosModalComponent, MediaItem } from '../../components/trabajos-modal/trabajos-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselHeaderComponent, RouterLink, ClientesCarouselComponent, TrabajosModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

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

  getMediaCount(items: any[]): string {
    if (!items || items.length === 0) return '0';
    
    const videoCount = items.filter(item => item.tipo === 'video').length;
    const imageCount = items.filter(item => item.tipo === 'imagen').length;
    
    let result = '';
    if (videoCount > 0) {
      result += `${videoCount} video${videoCount !== 1 ? 's' : ''}`;
    }
    if (imageCount > 0) {
      if (result) result += ' / ';
      result += `${imageCount} foto${imageCount !== 1 ? 's' : ''}`;
    }
    
    return result || items.length.toString();
  }

  servicios = [
    { 
      icon: '⚙️', 
      title: 'Maquinados CNC', 
      desc: 'Fabricación de piezas de precisión mediante fresadora, torno CNC, rectificado y servicios especializados. Garantizamos tolerancias ajustadas, acabados de calidad superior y máxima precisión en cada componente.',
      link: '/equipo-trabajos',
      fragment: 'trabajos',
      color: 'primary'
    },
    { 
      icon: '🔧', 
      title: 'Fabricación de Moldes y Mantenimiento', 
      desc: 'Ofrecemos mantenimiento preventivo y correctivo especializado en moldes, troqueles, matrices, punzones y cilindros neumáticos. Extendemos la vida útil de sus equipos y optimizamos su rendimiento operativo.',
      link: '/equipo-trabajos',
      fragment: 'mantenimiento',
      color: 'success'
    },
    { 
      icon: '💻', 
      title: 'Diseño y Programación', 
      desc: 'Diseño CAD/CAM y programación CNC especializada utilizando softwares líderes en la industria. Convertimos sus conceptos en programas optimizados listos para manufacturación.',
      link: '/equipo-trabajos',
      fragment: 'mastercam',
      color: 'info'
    }
  ];

  clientes = [
    { imagen: 'img/clientes/arce.png', nombre: 'Arce Tools' },
    { imagen: 'img/clientes/FFT.jpeg', nombre: 'FFT' },
    { imagen: 'img/clientes/avirex.png', nombre: 'Avirex' },
    { imagen: 'img/clientes/fori.png', nombre: 'Fori Automation' },
    { imagen: 'img/clientes/glm.png', nombre: 'GLM Components' }
  ];

  clientesLista = [
    'Arce Tools',
    'FFT',
    'Avirex',
    'Fori Automation',
    'GLM Components'
  ];

  objetivoEmpresarial = {
    titulo: 'Objetivos Empresariales',
    descripcion: 'Brindar soluciones integrales en manufactura y servicios industriales, superando las expectativas de nuestros clientes.'
  };

  mision = {
    icon: '🎯',
    titulo: 'Misión',
    descripcion: 'Ofrecer servicios de maquinado, mantenimiento y manufactura con calidad, puntualidad y compromiso con nuestros clientes.',
    color: 'primary'
  };

  vision = {
    icon: '🚀',
    titulo: 'Visión',
    descripcion: 'Ser reconocidos como una empresa líder en soluciones de maquinado y manufactura en la industria, innovando y creciendo continuamente.',
    color: 'success'
  };

  valores = {
    icon: '⭐',
    titulo: 'Valores',
    color: 'info',
    lista: [
      { icon: '🤝', nombre: 'Compromiso' },
      { icon: '✨', nombre: 'Calidad' },
      { icon: '💼', nombre: 'Responsabilidad' },
      { icon: '💡', nombre: 'Innovación' },
      { icon: '👥', nombre: 'Trabajo en equipo' }
    ]
  };

  trabajosDestacados = [
    {
      id: 'videos-cnc',
      titulo: 'Maquinados CNC',
      descripcion: 'Procesos de maquinado en nuestros centros CNC',
      icono: '⚙️',
      imagen: 'img/home/cnc.jpg',
      color: 'success',
      items: [
        { tipo: 'video' as const, src: 'img/videos/cnc/botella_Maq.mp4' },
        { tipo: 'video' as const, src: 'img/videos/cnc/maquinado_R.mp4' },
        { tipo: 'video' as const, src: 'img/videos/cnc/matriz.mp4' },
        { tipo: 'video' as const, src: 'img/videos/cnc/tornillos.mp4' },
        { tipo: 'video' as const, src: 'img/videos/cnc/video2.mp4' }

      ]
    },
    {
      id: 'resultados',
      titulo: 'Resultados Finales',
      descripcion: 'Piezas terminadas con acabados de calidad',
      icono: '✨',
      imagen: 'img/piezas/grandes/pc1.jpg',
      color: 'success',
      items: [
        { tipo: 'video' as const, src: 'img/videos/resultados/botella_RF.mp4' },
        { tipo: 'video' as const, src: 'img/videos/resultados/botella_R2.mp4' },
        { tipo: 'video' as const, src: 'img/videos/resultados/clavos_R.mp4' },
        { tipo: 'video' as const, src: 'img/videos/resultados/clavos_RP.mp4' },
        { tipo: 'video' as const, src: 'img/videos/resultados/res1.mp4' },
        { tipo: 'video' as const, src: 'img/videos/resultados/res3.mp4' }
      ]
    },
    {
      id: 'programacion',
      titulo: 'Programación CNC',
      descripcion: 'Diseño y programación CAD/CAM',
      icono: '💻',
      imagen: 'img/diseno/d1.jpg',
      color: 'success',
      items: [
        { tipo: 'video' as const, src: 'img/videos/programacion/botella_D.mp4' },
        { tipo: 'video' as const, src: 'img/videos/programacion/prog1.mp4' },
        { tipo: 'video' as const, src: 'img/videos/programacion/prog2.mp4' }
        
      ]
    }
  ];
}