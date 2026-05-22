// Smooth scroll animation observer
class ScrollAnimator {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.createObserver();
        this.observeElements();
        this.addEventListeners();
        this.animateNumbers();
    }
    
    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    
                    // Add stagger effect for cards
                    if (entry.target.classList.contains('card')) {
                        this.staggerCards(entry.target);
                    }
                }
            });
        }, this.observerOptions);
    }
    
    observeElements() {
        // Elements to animate on scroll
        const elementsToAnimate = [
            '.card',
            '.feature-card',
            '.about-text',
            '.about-image',
            '.testimonial-card',
            '.contact-info',
            '.contact-form'
        ];
        
        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => this.observer.observe(el));
        });
    }
    
    staggerCards(card) {
        const cards = document.querySelectorAll('.card');
        const cardIndex = Array.from(cards).indexOf(card);
        
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, cardIndex * 100);
    }
    
    addEventListeners() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Header background on scroll
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Button animations
        this.addButtonAnimations();
        
        // Form submission
        this.handleFormSubmission();
    }
    
    handleScroll() {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(123, 44, 191, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(123, 44, 191, 0.1)';
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPercent = scrolled / window.innerHeight;
            hero.style.transform = `translateY(${scrollPercent * 50}px)`;
        }
    }
    
    addButtonAnimations() {
        // CTA Button pulse effect
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('mouseenter', () => {
                ctaButton.style.animation = 'pulse 0.6s ease-in-out';
            });
            
            ctaButton.addEventListener('animationend', () => {
                ctaButton.style.animation = '';
            });
        }
        
        // Card buttons hover effect
        const cardButtons = document.querySelectorAll('.card-button');
        cardButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    handleFormSubmission() {
        const form = document.querySelector('.contact-form form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const submitButton = form.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                
                // Simulate form submission
                submitButton.textContent = 'Enviando...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    submitButton.textContent = '¡Mensaje Enviado!';
                    submitButton.style.background = '#28a745';
                    
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        submitButton.style.background = '';
                        form.reset();
                    }, 2000);
                }, 1500);
            });
        }
    }
    
    animateNumbers() {
        const stats = document.querySelectorAll('.stat-number');
        
        const animateNumber = (element, target) => {
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (target >= 1000) {
                    element.textContent = Math.floor(current).toLocaleString() + '+';
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 20);
        };
        
        // Observe stats section
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const text = statNumber.textContent;
                    const number = parseInt(text.replace(/[^\d]/g, ''));
                    
                    animateNumber(statNumber, number);
                    statsObserver.unobserve(statNumber);
                }
            });
        });
        
        stats.forEach(stat => statsObserver.observe(stat));
    }
}

// Particle animation for hero section
class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
        this.handleResize();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
        }
    }
    
    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    resize() {
        const hero = document.querySelector('.hero');
        if (hero) {
            this.canvas.width = hero.offsetWidth;
            this.canvas.height = hero.offsetHeight;
        }
    }
    
    handleResize() {
        window.addEventListener('resize', () => this.resize());
    }
}

// Card hover effects
class CardEffects {
    constructor() {
        this.init();
    }
    
    init() {
        const cards = document.querySelectorAll('.card, .feature-card, .testimonial-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        });
    }
    
    handleMouseEnter(e) {
        const card = e.currentTarget;
        card.style.transition = 'all 0.3s ease';
    }
    
    handleMouseLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }
    
    handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    }
}

// Loading animation
class LoadingAnimation {
    constructor() {
        this.init();
    }
    
    init() {
        // Add loading class to body
        document.body.classList.add('loading');
        
        // Remove loading class when page is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
                this.animateElements();
            }, 500);
        });
    }
    
    animateElements() {
        // Animate hero elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const ctaButton = document.querySelector('.cta-button');
        
        if (heroTitle) {
            heroTitle.style.animation = 'slideInLeft 1s ease-out';
        }
        
        if (heroSubtitle) {
            setTimeout(() => {
                heroSubtitle.style.animation = 'slideInLeft 1s ease-out';
            }, 200);
        }
        
        if (ctaButton) {
            setTimeout(() => {
                ctaButton.style.animation = 'slideInLeft 1s ease-out';
            }, 400);
        }
    }
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .loading * {
        animation-play-state: paused !important;
    }
`;
document.head.appendChild(style);

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoadingAnimation();
    new ScrollAnimator();
    new ParticleSystem();
    new CardEffects();
});

// Add some extra interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            // Mobile menu logic can be added here
        }
    };
    
    // Scroll to top functionality
    const createScrollToTop = () => {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.className = 'scroll-to-top';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-purple);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(123, 44, 191, 0.3);
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
        
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        scrollButton.addEventListener('mouseenter', () => {
            scrollButton.style.transform = 'translateY(-3px)';
            scrollButton.style.boxShadow = '0 8px 20px rgba(123, 44, 191, 0.4)';
        });
        
        scrollButton.addEventListener('mouseleave', () => {
            scrollButton.style.transform = 'translateY(0)';
            scrollButton.style.boxShadow = '0 5px 15px rgba(123, 44, 191, 0.3)';
        });
    };
    
    createMobileMenu();
    createScrollToTop();
});
