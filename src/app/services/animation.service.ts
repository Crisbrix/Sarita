import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private observer: IntersectionObserver | null = null;
  private particleAnimationId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  initAnimations() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.createScrollObserver();
    this.addScrollListener();
    this.addButtonAnimations();
    this.handleFormSubmission();
    this.createParticleSystem();
    this.createScrollToTop();
    this.addCardEffects();
    this.addLoadingAnimation();
  }

  private createScrollObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const selectors = ['.card', '.feature-card', '.about-text', '.about-image', '.testimonial-card', '.contact-info', '.contact-form'];
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => this.observer?.observe(el));
    });
  }

  private addScrollListener() {
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.header') as HTMLElement;
      const scrolled = window.pageYOffset;
      if (header) {
        if (scrolled > 100) {
          header.style.background = 'rgba(255, 255, 255, 0.98)';
          header.style.boxShadow = '0 2px 30px rgba(123, 44, 191, 0.15)';
        } else {
          header.style.background = 'rgba(255, 255, 255, 0.95)';
          header.style.boxShadow = '0 2px 20px rgba(123, 44, 191, 0.1)';
        }
      }
      const hero = document.querySelector('.hero') as HTMLElement;
      if (hero) {
        hero.style.transform = `translateY(${(scrolled / window.innerHeight) * 50}px)`;
      }
    });
  }

  private addButtonAnimations() {
    const ctaButton = document.querySelector('.cta-button') as HTMLElement;
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => { ctaButton.style.animation = 'pulse 0.6s ease-in-out'; });
      ctaButton.addEventListener('animationend', () => { ctaButton.style.animation = ''; });
    }
    document.querySelectorAll('.card-button').forEach(button => {
      const btn = button as HTMLElement;
      btn.addEventListener('mouseenter', () => { btn.style.transform = 'translateY(-2px) scale(1.05)'; });
      btn.addEventListener('mouseleave', () => { btn.style.transform = 'translateY(0) scale(1)'; });
    });
  }

  private handleFormSubmission() {
    const form = document.querySelector('.contact-form form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitButton = form.querySelector('.submit-button') as HTMLElement;
        const originalText = submitButton.textContent || 'Enviar Mensaje';
        const nombre = (document.getElementById('ws-nombre') as HTMLInputElement)?.value || '';
        const email = (document.getElementById('ws-email') as HTMLInputElement)?.value || '';
        const telefono = (document.getElementById('ws-telefono') as HTMLInputElement)?.value || 'No proporcionado';
        const mensaje = (document.getElementById('ws-mensaje') as HTMLTextAreaElement)?.value || '';
        const textoMensaje = `Hola, quiero hacer un pedido desde el sitio web.%0A%0A` +
          `*Nombre:* ${encodeURIComponent(nombre)}%0A` +
          `*Email:* ${encodeURIComponent(email)}%0A` +
          `*Teléfono:* ${encodeURIComponent(telefono)}%0A%0A` +
          `*Mensaje:* ${encodeURIComponent(mensaje)}`;
        submitButton.textContent = 'Abriendo WhatsApp...';
        (submitButton as HTMLButtonElement).disabled = true;
        submitButton.style.background = '#25D366';
        window.open(`https://wa.me/573243076563?text=${textoMensaje}`, '_blank');
        setTimeout(() => {
          submitButton.textContent = originalText;
          (submitButton as HTMLButtonElement).disabled = false;
          submitButton.style.background = '';
          (form as HTMLFormElement).reset();
        }, 1500);
      });
    }
  }

  private createParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    const hero = document.querySelector('.hero');
    if (!hero) return;
    hero.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => {
      canvas.width = (hero as HTMLElement).offsetWidth;
      canvas.height = (hero as HTMLElement).offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }> = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });
      this.particleAnimationId = requestAnimationFrame(animate);
    };
    animate();
  }

  private addCardEffects() {
    document.querySelectorAll('.card, .feature-card, .testimonial-card').forEach(card => {
      card.addEventListener('mouseenter', function(this: HTMLElement) { this.style.transition = 'all 0.3s ease'; });
      card.addEventListener('mouseleave', function(this: HTMLElement) { this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'; });
      card.addEventListener('mousemove', function(this: HTMLElement, e: Event) {
        const mouseEvent = e as MouseEvent;
        const rect = this.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      });
    });
  }

  private addLoadingAnimation() {
    document.body.classList.add('loading');
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.body.classList.remove('loading');
        const heroTitle = document.querySelector('.hero-title') as HTMLElement;
        const heroSubtitle = document.querySelector('.hero-subtitle') as HTMLElement;
        const ctaButton = document.querySelector('.cta-button') as HTMLElement;
        if (heroTitle) heroTitle.style.animation = 'slideInLeft 1s ease-out';
        setTimeout(() => { if (heroSubtitle) heroSubtitle.style.animation = 'slideInLeft 1s ease-out'; }, 200);
        setTimeout(() => { if (ctaButton) ctaButton.style.animation = 'slideInLeft 1s ease-out'; }, 400);
      }, 500);
    });
  }

  private createScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
      position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px;
      background: var(--primary-purple); color: white; border: none; border-radius: 50%;
      cursor: pointer; opacity: 0; visibility: hidden; transition: all 0.3s ease;
      z-index: 999; box-shadow: 0 5px 15px rgba(123, 44, 191, 0.3);
    `;
    document.body.appendChild(scrollButton);
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.visibility = 'visible';
      } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.visibility = 'hidden';
      }
    });
    scrollButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    scrollButton.addEventListener('mouseenter', () => {
      scrollButton.style.transform = 'translateY(-3px)';
      scrollButton.style.boxShadow = '0 8px 20px rgba(123, 44, 191, 0.4)';
    });
    scrollButton.addEventListener('mouseleave', () => {
      scrollButton.style.transform = 'translateY(0)';
      scrollButton.style.boxShadow = '0 5px 15px rgba(123, 44, 191, 0.3)';
    });
  }
}
