/* ============================================
   6040 VISTA - 3D FLIP CAROUSEL
   Multi-card carousel with horizontal flip animation
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
        
        // Configuration
        this.config = {
            autoplayDelay: 5000, // 5 seconds
            transitionDuration: 800, // 0.8 seconds for 3D flip
            visibleSlides: window.innerWidth > 1024 ? 3 : (window.innerWidth > 768 ? 2 : 1),
            gap: 20
        };
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.updateSlidePositions();
        this.attachEventListeners();
        this.startAutoplay();
        
        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(this.slides.length / this.config.visibleSlides);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to slide group ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                this.goToSlide(i * this.config.visibleSlides);
            });
            
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateSlidePositions() {
        this.slides.forEach((slide, index) => {
            // Reset transform
            slide.style.transform = '';
            slide.style.transition = '';
            
            // Calculate position
            const offset = index - this.currentIndex;
            const translateX = offset * (100 / this.config.visibleSlides);
            
            // Apply 3D flip based on position
            if (Math.abs(offset) <= this.config.visibleSlides) {
                slide.style.opacity = '1';
                slide.style.transform = `translateX(${translateX}%) rotateY(0deg)`;
                slide.style.zIndex = '10';
            } else {
                slide.style.opacity = '0';
                slide.style.transform = `translateX(${translateX}%) rotateY(90deg)`;
                slide.style.zIndex = '1';
            }
        });
        
        this.updateDots();
        this.updateButtons();
    }
    
    goToSlide(index, direction = 'next') {
        if (this.isAnimating) return;
        
        // Boundary checks
        if (index < 0) index = 0;
        if (index >= this.slides.length) index = this.slides.length - this.config.visibleSlides;
        if (index === this.currentIndex) return;
        
        this.isAnimating = true;
        const oldIndex = this.currentIndex;
        this.currentIndex = index;
        
        // Animate slides with 3D flip
        this.slides.forEach((slide, i) => {
            slide.style.transition = `all ${this.config.transitionDuration}ms cubic-bezier(0.645, 0.045, 0.355, 1)`;
            
            const offset = i - this.currentIndex;
            const translateX = offset * (100 / this.config.visibleSlides);
            
            // Determine flip direction
            const flipDirection = direction === 'next' ? -90 : 90;
            
            if (Math.abs(offset) <= this.config.visibleSlides) {
                // Visible slides - flip in from side
                if (i >= oldIndex && i < oldIndex + this.config.visibleSlides) {
                    // Slides leaving - flip out
                    slide.style.transform = `translateX(${translateX}%) rotateY(${flipDirection}deg)`;
                    slide.style.opacity = '0';
                    
                    setTimeout(() => {
                        slide.style.transform = `translateX(${translateX}%) rotateY(0deg)`;
                        slide.style.opacity = '1';
                        slide.style.zIndex = '10';
                    }, this.config.transitionDuration / 2);
                } else {
                    // Slides entering - flip in
                    slide.style.transform = `translateX(${translateX}%) rotateY(${-flipDirection}deg)`;
                    slide.style.opacity = '0';
                    
                    setTimeout(() => {
                        slide.style.transform = `translateX(${translateX}%) rotateY(0deg)`;
                        slide.style.opacity = '1';
                        slide.style.zIndex = '10';
                    }, this.config.transitionDuration / 2);
                }
            } else {
                // Hidden slides
                slide.style.transform = `translateX(${translateX}%) rotateY(90deg)`;
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            }
        });
        
        this.updateDots();
        this.updateButtons();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, this.config.transitionDuration);
    }
    
    nextSlide() {
        const nextIndex = this.currentIndex + this.config.visibleSlides;
        if (nextIndex >= this.slides.length) {
            this.goToSlide(0, 'next'); // Loop back to start
        } else {
            this.goToSlide(nextIndex, 'next');
        }
    }
    
    prevSlide() {
        const prevIndex = this.currentIndex - this.config.visibleSlides;
        if (prevIndex < 0) {
            this.goToSlide(this.slides.length - this.config.visibleSlides, 'prev'); // Loop to end
        } else {
            this.goToSlide(prevIndex, 'prev');
        }
    }
    
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        const activeDotIndex = Math.floor(this.currentIndex / this.config.visibleSlides);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }
    
    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = false; // Always enabled for looping
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = false; // Always enabled for looping
        }
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
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoplay();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.startAutoplay();
        });
        
        // Touch swipe support
        this.addSwipeSupport();
    }
    
    addSwipeSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50; // Minimum swipe distance
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
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
        const newVisibleSlides = window.innerWidth > 1024 ? 3 : (window.innerWidth > 768 ? 2 : 1);
        
        if (newVisibleSlides !== this.config.visibleSlides) {
            this.config.visibleSlides = newVisibleSlides;
            
            // Adjust current index to stay within bounds
            if (this.currentIndex + this.config.visibleSlides > this.slides.length) {
                this.currentIndex = Math.max(0, this.slides.length - this.config.visibleSlides);
            }
            
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
    
    destroy() {
        this.stopAutoplay();
        // Clean up event listeners if needed
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const unitsCarousel = new UnitsCarousel('unitsCarousel');
    
    // Export for external access if needed
    window.unitsCarousel = unitsCarousel;
});

// Cursor change for grabbing effect
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.carousel-track');
    
    if (carouselTrack && !window.matchMedia('(max-width: 768px)').matches) {
        carouselTrack.style.cursor = 'grab';
        
        carouselTrack.addEventListener('mousedown', function() {
            this.style.cursor = 'grabbing';
        });
        
        carouselTrack.addEventListener('mouseup', function() {
            this.style.cursor = 'grab';
        });
        
        carouselTrack.addEventListener('mouseleave', function() {
            this.style.cursor = 'grab';
        });
    }
});