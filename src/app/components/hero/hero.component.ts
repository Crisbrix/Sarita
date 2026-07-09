import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  openWhatsApp() {
    window.open('https://wa.me/573243076563', '_blank');
  }
}
