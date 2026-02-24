import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  menuAbierto = false;
  menuRedesSociales = false;

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

  toggleMenuRedes(event: Event) {
    event.stopPropagation();
    this.menuRedesSociales = !this.menuRedesSociales;
  }

  cerrarMenuRedes() {
    this.menuRedesSociales = false;
  }

  // Cerrar menús al hacer clic fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    // Verificar si el clic fue en un enlace de las opciones
    const isContactLink = target.closest('.contact-option');
    const isSocialLink = target.closest('.social-option');
    
    // Si se hizo clic en una opción, cerrar el menú correspondiente
    if (isContactLink && this.menuAbierto) {
      this.menuAbierto = false;
      return;
    }
    
    if (isSocialLink && this.menuRedesSociales) {
      this.menuRedesSociales = false;
      return;
    }
    
    // Verificar si el clic fue en los botones principales (ya tienen stopPropagation)
    const clickedContactBtn = target.closest('.contact-float-btn');
    const clickedSocialBtn = target.closest('.social-float-btn');
    
    // Si se hizo clic en un botón, no hacer nada (el toggle ya se encarga)
    if (clickedContactBtn || clickedSocialBtn) {
      return;
    }
    
    // Verificar si el clic fue dentro de los contenedores
    const clickedInsideContact = target.closest('.contact-float-container');
    const clickedInsideSocial = target.closest('.social-float-container');
    
    // Si el clic fue fuera de los contenedores, cerrar
    if (!clickedInsideContact && this.menuAbierto) {
      this.menuAbierto = false;
    }
    
    if (!clickedInsideSocial && this.menuRedesSociales) {
      this.menuRedesSociales = false;
    }
  }
}