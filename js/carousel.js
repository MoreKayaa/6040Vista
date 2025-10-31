/* ============================================
   6040 VISTA - MOBILE-OPTIMIZED CAROUSEL
   Single-card swipe on mobile, 3D effects on desktop
   ============================================ */

class UnitsCarousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.track = this.container.querySelector('.carousel-track');
        this.slides = Array.from(this.track.querySelectorAll('.carousel-slide'));
        this.nextBtn = this.container.querySelector('.carousel-next');
        this.prevBtn = this.container.querySelector('.carousel-prev');
        this.dotsContainer = this.container.querySelector('.carousel-dots');
        
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.isAnimating = false;
        this.isMobile = window.innerWidth <= 768;
        
        this.config = {
            autoplayDelay: 6000,
            transitionDuration: this.isMobile ? 400 : 700,
            visibleSlides: this.getVisibleSlides()
        };
        
        this.init();
    }
    
    getVisibleSlides() {
        if (window.innerWidth <= 768) return 1;      // Mobile: 1 card
        if (window.innerWidth <= 1024) return 2;     // Tablet: 2 cards  
        return 3;                                     // Desktop: 3 cards
    }
    
    init() {
        this.setupLayout();
        this.createDots();
        this.updateSlidePositions();
        this.attachEventListeners();
        this.startAutoplay();
        
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }
    
    setupLayout() {
        if (this.isMobile) {
            // Mobile: Ensure proper flex layout
            this.track.style.display = 'flex';
            this.track.style.overflow = 'hidden';
            this.slides.forEach((slide, index) => {
                slide.style.flex = '0 0 100%';
                slide.style.transform = 'none';
                slide.style.transition = 'transform 0.4s ease';
            });
        }
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        const totalDots = this.isMobile ? this.slides.length : Math.ceil(this.slides.length / this.config.visibleSlides);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                const targetIndex = this.isMobile ? i : i * this.config.visibleSlides;
                this.goToSlide(targetIndex);
            });
            
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateSlidePositions() {
        if (this.isMobile) {
            // Mobile: Simple translateX positioning
            this.slides.forEach((slide, index) => {
                const offset = (index - this.currentIndex) * 100;
                slide.style.transform = `translateX(${offset}%)`;
                slide.style.opacity = '1';
                slide.style.zIndex = index === this.currentIndex ? '10' : '1';
            });
        } else {
            // Desktop: 3D flip effects
            this.slides.forEach((slide, index) => {
                const offset = index - this.currentIndex;
                const translateX = offset * (100 / this.config.visibleSlides);
                
                if (Math.abs(offset) < this.config.visibleSlides) {
                    slide.style.opacity = '1';
                    slide.style.transform = `translateX(${translateX}%) rotateY(0deg)`;
                    slide.style.zIndex = '10';
                } else {
                    slide.style.opacity = '0';
                    slide.style.transform = `translateX(${translateX}%) rotateY(90deg)`;
                    slide.style.zIndex = '1';
                }
            });
        }
        
        this.updateDots();
    }
    
    goToSlide(index, direction = 'next') {
        if (this.isAnimating) return;
        
        // Handle looping
        let targetIndex = index;
        if (this.isMobile) {
            if (targetIndex < 0) targetIndex = this.slides.length - 1;
            if (targetIndex >= this.slides.length) targetIndex = 0;
        } else {
            if (targetIndex < 0) targetIndex = this.slides.length - this.config.visibleSlides;
            if (targetIndex >= this.slides.length) targetIndex = 0;
        }
        
        if (targetIndex === this.currentIndex) return;
        
        this.isAnimating = true;
        this.currentIndex = targetIndex;
        
        this.updateSlidePositions();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, this.config.transitionDuration);
    }
    
    nextSlide() {
        const nextIndex = this.isMobile ? 
            this.currentIndex + 1 : 
            this.currentIndex + this.config.visibleSlides;
        this.goToSlide(nextIndex, 'next');
    }
    
    prevSlide() {
        const prevIndex = this.isMobile ? 
            this.currentIndex - 1 : 
            this.currentIndex - this.config.visibleSlides;
        this.goToSlide(prevIndex, 'prev');
    }
    
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        const activeDotIndex = this.isMobile ? 
            this.currentIndex : 
            Math.floor(this.currentIndex / this.config.visibleSlides);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }
    
    attachEventListeners() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoplay();
            });
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoplay();
            });
        }
        
        // Pause on hover (desktop only)
        if (!this.isMobile) {
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());
        }
        
        // Touch swipe support
        this.addSwipeSupport();
    }
    
    addSwipeSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;
            this.handleSwipe(touchStartX, touchEndX, touchStartY, touchEndY);
        }, { passive: true });
    }
    
    handleSwipe(startX, endX, startY, endY) {
        const horizontalDiff = startX - endX;
        const verticalDiff = Math.abs(startY - endY);
        const threshold = 50;
        
        // Only trigger if horizontal swipe is greater than vertical
        if (Math.abs(horizontalDiff) > threshold && Math.abs(horizontalDiff) > verticalDiff) {
            if (horizontalDiff > 0) {
                this.nextSlide(); // Swipe left
            } else {
                this.prevSlide(); // Swipe right
            }
            this.resetAutoplay();
        }
    }
    
    startAutoplay() {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, this.config.autoplayDelay);
        }
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
    
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        const newVisibleSlides = this.getVisibleSlides();
        
        if (wasMobile !== this.isMobile || newVisibleSlides !== this.config.visibleSlides) {
            this.config.visibleSlides = newVisibleSlides;
            this.config.transitionDuration = this.isMobile ? 400 : 700;
            this.currentIndex = 0; // Reset to start on layout change
            this.setupLayout();
            this.createDots();
            this.updateSlidePositions();
        }
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const unitsCarousel = new UnitsCarousel('unitsCarousel');
    window.unitsCarousel = unitsCarousel;
});
