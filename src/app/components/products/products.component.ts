import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  price: string;
}

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private cartService = inject(CartService);
  activeCategory = 'todos';

  readonly categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'tortas', label: 'Tortas' },
    { id: 'cheesecake', label: 'Cheesecakes' },
    { id: 'cupcakes', label: 'Cupcakes' },
    { id: 'bowl', label: 'Bowls' },
    { id: 'cajas', label: 'Cajas' },
    { id: 'amigurumis', label: 'Amigurumis' },
    { id: 'anchetas', label: 'Anchetas' },
  ];

  readonly allProducts: Product[] = [
    {
      id: 'torta',
      name: 'Torta Artesanal',
      category: 'tortas',
      description: 'Esponjosa torta con relleno de frutas y decoración especial. 8-12 porciones.',
      image: 'assets/imagenes/torta/1.jpg',
      price: '$64.900',
      features: ['Vainilla con frutas', 'Chocolate', 'Naranja y Amapola', 'Red Velvet', 'Tres Leches']
    },
    {
      id: 'cheesecake',
      name: 'Cheesecake',
      category: 'cheesecake',
      description: 'Delicioso cheesecake cremoso con variedad de sabores. 30 porciones.',
      image: 'assets/imagenes/cheesecake/1.jpg',
      price: '$77.900',
      features: ['Frutos rojos', 'Maracuyá', 'Limón', 'Oreo', 'Café', 'Lulo', 'Mango']
    },
    {
      id: 'cupcakes',
      name: 'Cupcakes',
      category: 'cupcakes',
      description: 'Tiernos cupcakes decorados perfectos para celebraciones. 12 unidades.',
      image: 'assets/imagenes/cupcakes/1.jpg',
      price: '$58.200 x12',
      features: ['Vainilla', 'Chocolate', 'Naranja', 'Red Velvet', 'Tres Leches']
    },
    {
      id: 'bowl',
      name: 'Bowl de Frutas',
      category: 'bowl',
      description: 'Fresco bowl con yogurt griego, frutas frescas y explosiones de sabores.',
      image: 'assets/imagenes/Bowl de Frutas/1.jpg',
      price: '$22.900',
      features: ['Yogurt griego', 'Frutas variadas', 'Explosiones de sabores', 'Granola crujiente']
    },
    {
      id: 'cajas',
      name: 'Caja de Fresas con Chocolate',
      category: 'cajas',
      description: 'Fresas bañadas en chocolate premium. 9 unidades.',
      image: 'assets/imagenes/cajaChocolate/1.jpeg',
      price: '$38.900 x9',
      features: ['Fresas frescas', 'Chocolate premium', 'Presentación elegante', 'Ideal para regalos']
    },
    {
      id: 'amigurumis',
      name: 'Amigurumis',
      category: 'amigurumis',
      description: 'Tu peluche favorito hecho a mano, desde pollitos hasta personajes.',
      image: 'assets/imagenes/Amigurumis/1.png',
      price: '',
      features: ['Animales variados', 'Personajes de películas', 'Hecho a mano', 'Combinable con postres']
    },
    {
      id: 'anchetas',
      name: 'Anchetas Especiales',
      category: 'anchetas',
      description: 'Combinaciones perfectas de postres, amigurumis y flores.',
      image: 'assets/imagenes/Anchetas/1.jpeg',
      price: 'Precio variable',
      features: ['Bowl + Amigurumi', 'Cupcakes + Amigurumi', 'Frutas + Flores', 'Cheesecake + Amigurumi']
    }
  ];

  setFilter(categoryId: string) {
    this.activeCategory = categoryId;
  }

  filteredProducts(): Product[] {
    if (this.activeCategory === 'todos') return this.allProducts;
    return this.allProducts.filter(p => p.category === this.activeCategory);
  }

  addToCart(name: string, image: string) {
    this.cartService.addItem(name, image);
  }

  openWhatsApp(name: string) {
    const message = `Hola, quiero consultar sobre: ${name}`;
    window.open(`https://wa.me/573243076563?text=${encodeURIComponent(message)}`, '_blank');
  }
}
