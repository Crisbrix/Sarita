import { Component, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  currentIndex = signal(0);
  private interval: any;

  readonly images = [
    { src: 'assets/imagenes/Anchetas/2.jpeg', alt: 'Anchetas especiales', label: 'Anchetas Especiales' },
    { src: 'assets/imagenes/cheesecake/1.jpg', alt: 'Cheesecake', label: 'Cheesecakes Artesanales' },
    { src: 'assets/imagenes/cupcakes/1.jpg', alt: 'Cupcakes', label: 'Cupcakes Decorados' },
    { src: 'assets/imagenes/Bowl de Frutas/1.jpg', alt: 'Bowl de Frutas', label: 'Bowls Frescos' },
    { src: 'assets/imagenes/cajaChocolate/1.jpeg', alt: 'Cajas de Chocolate', label: 'Cajas de Chocolate' },
    { src: 'assets/imagenes/Amigurumis/1.png', alt: 'Amigurumis', label: 'Amigurumis Hechos a Mano' },
    { src: 'assets/imagenes/Anchetas/3.jpeg', alt: 'Anchetas variadas', label: 'Combina tus Postres' },
    { src: 'assets/imagenes/Anchetas/1.jpeg', alt: 'Anchetas', label: 'Regalos Especiales' },
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.interval = setInterval(() => this.next(), 4000);
    }
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  next() {
    this.currentIndex.update(i => (i + 1) % this.images.length);
  }

  prev() {
    this.currentIndex.update(i => (i - 1 + this.images.length) % this.images.length);
  }

  goTo(index: number) {
    this.currentIndex.set(index);
  }
}
