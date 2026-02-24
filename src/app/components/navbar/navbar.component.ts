import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private elementRef: ElementRef) {}

  // Cerrar el menú al hacer clic en un enlace
  cerrarMenu() {
    const navbarCollapse = this.elementRef.nativeElement.querySelector('#navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }

  // Cerrar el menú al hacer clic fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.navbar');
    const navbarCollapse = this.elementRef.nativeElement.querySelector('#navbarNav');
    
    // Si el clic fue fuera del navbar y el menú está abierto, cerrarlo
    if (!clickedInside && navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }
}