import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Cliente {
  imagen: string;
  nombre: string;
}

@Component({
  selector: 'app-clientes-carousel',
  imports: [CommonModule],
  templateUrl: './clientes-carousel.component.html',
  styleUrl: './clientes-carousel.component.css'
})
export class ClientesCarouselComponent {
  @Input() clientes: Cliente[] = [];
  @Input() carouselId: string = 'carouselClientes';
}
