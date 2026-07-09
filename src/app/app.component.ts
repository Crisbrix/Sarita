import { Component, AfterViewInit, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutComponent } from './components/about/about.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { AnimationService } from './services/animation.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent, HeroComponent, FeaturesComponent, ProductsComponent,
    AboutComponent, TestimonialsComponent, ContactComponent, FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  cartService = inject(CartService);
  cartOpen = false;

  constructor(private animationService: AnimationService) {}

  ngAfterViewInit() {
    this.animationService.initAnimations();
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  closeCart() {
    this.cartOpen = false;
  }
}
