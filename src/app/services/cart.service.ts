import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  name: string;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSignal = signal<CartItem[]>([]);
  readonly items = this.itemsSignal.asReadonly();
  readonly totalItems = computed(() => this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0));
  readonly lastAdded = signal<string | null>(null);

  addItem(name: string, image: string) {
    this.itemsSignal.update(items => {
      const existing = items.find(i => i.name === name);
      if (existing) {
        return items.map(i => i.name === name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { name, image, quantity: 1 }];
    });
    this.lastAdded.set(name);
  }

  removeItem(name: string) {
    this.itemsSignal.update(items => {
      const existing = items.find(i => i.name === name);
      if (existing && existing.quantity > 1) {
        return items.map(i => i.name === name ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return items.filter(i => i.name !== name);
    });
  }

  clear() {
    this.itemsSignal.set([]);
  }

  sendToWhatsApp() {
    const items = this.itemsSignal();
    if (items.length === 0) return;

    let message = 'Hola, quiero hacer un pedido desde el sitio web.%0A%0A*Mi Pedido:*%0A';
    items.forEach(item => {
      message += `- ${item.name} x${item.quantity}%0A`;
    });
    message += `%0ATotal de productos: ${this.totalItems()}`;

    window.open(`https://wa.me/573243076563?text=${message}`, '_blank');
    this.clear();
  }
}
