import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private carousel: any;

  carouselItems = [
    {
      image: 'assets/img/home/fondo.jpg',
      title: 'MOLDES Y MAQUINADOS VC',
      subtitle: '"Tools for Industry"',
      description: 'Soluciones en manufactura, maquinados y servicios integrales.'
    },
    {
      image: 'assets/img/home/cnc.jpg',
      title: 'Maquinados CNC',
      subtitle: 'Precisión y calidad en cada pieza.',
      description: ''
    }
  ];

  servicios = [
    { icon: '⚙️', title: 'Maquinados CNC', desc: 'Precisión en cada pieza.' },
    { icon: '🔧', title: 'Diseño y Fabricación de Moldes', desc: 'Soluciones a medida.' },
    { icon: '🎨', title: 'Pavonado y Pintura', desc: 'Acabados de alta calidad.' },
    { icon: '🛠️', title: 'Mantenimiento Industrial', desc: 'Reparación de equipos.' }
  ];

  clientes = [
    'assets/img/clientes/cliente1.jpg',
    'assets/img/clientes/cliente2.jpg',
    'assets/img/clientes/cliente3.jpg'
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const carouselElement = document.getElementById('carouselHeader');
      if (carouselElement && (window as any).bootstrap) {
        this.carousel = new (window as any).bootstrap.Carousel(carouselElement, {
          interval: 5000,
          ride: 'carousel'
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.carousel) {
      this.carousel.dispose();
    }
  }
}