/**
 * Netflix-Style Carousel for 6040 Vista Unit Types
 * Features:
 * - Auto-play with configurable interval
 * - Manual navigation (arrows + indicators)
 * - Touch/swipe support for mobile
 * - Pause on hover
 * - Smooth transitions
 */

class NetflixCarousel {
    constructor(container, options = {}) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.slides = Array.from(container.querySelectorAll('.carousel-slide'));
        this.prevButton = container.querySelector('.carousel-arrow.prev');
        this.nextButton = container.querySelector('.carousel-arrow.next');
        this.indicatorsContainer = container.querySelector('.carousel-indicators');
        this.progressBar = container.querySelector('.progress-bar');
        
        // Configuration
        this.currentIndex = 0;
        this.autoPlayInterval = options.autoPlayInterval || 5000;
        this.autoPlayTimer = null;
        this.isAutoPlaying = options.autoPlay !== false;
        this.isPaused = false;
        
        // Touch support
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        this.createIndicators();
        this.attachEventListeners();
        this.updateCarousel();
        
        if (this.isAutoPlaying) {
            this.startAutoPlay();
        }
    }
    
    createIndicators() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('indicator-dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
            
            this.indicatorsContainer.appendChild(dot);
        });
        
        this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.indicator-dot'));
    }
    
    attachEventListeners() {
        // Arrow navigation
        this.prevButton.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoPlay();
        });
        
        this.nextButton.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoPlay();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetAutoPlay();
            }
        });
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => {
            this.pauseAutoPlay();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.resumeAutoPlay();
        });
        
        // Touch support for mobile
        this.track.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
            this.resetAutoPlay();
        }, { passive: true });
        
        // Pause when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else {
                this.resumeAutoPlay();
            }
        });
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    updateCarousel() {
        // Update slide positions
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === this.currentIndex) {
                slide.classList.add('active');
            }
        });
        
        // Update track position
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            }
        });
        
        // Update arrow states
        this.prevButton.disabled = this.currentIndex === 0;
        this.nextButton.disabled = this.currentIndex === this.slides.length - 1;
        
        // Announce to screen readers
        const announcement = `Showing unit ${this.currentIndex + 1} of ${this.slides.length}`;
        this.announce(announcement);
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }
    
    nextSlide() {
        if (this.currentIndex < this.slides.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop back to start
        }
        this.updateCarousel();
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.slides.length - 1; // Loop to end
        }
        this.updateCarousel();
    }
    
    startAutoPlay() {
        if (!this.isAutoPlaying) return;
        
        this.autoPlayTimer = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, this.autoPlayInterval);
        
        // Start progress bar animation
        if (this.progressBar) {
            this.progressBar.classList.add('active');
            this.progressBar.style.animation = `progress ${this.autoPlayInterval}ms linear infinite`;
        }
    }
    
    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        
        if (this.progressBar) {
            this.progressBar.classList.remove('active');
            this.progressBar.style.animation = 'none';
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        if (this.isAutoPlaying && !this.isPaused) {
            this.startAutoPlay();
        }
    }
    
    pauseAutoPlay() {
        this.isPaused = true;
        if (this.progressBar) {
            this.progressBar.style.animationPlayState = 'paused';
        }
    }
    
    resumeAutoPlay() {
        this.isPaused = false;
        if (this.progressBar) {
            this.progressBar.style.animationPlayState = 'running';
        }
    }
    
    announce(message) {
        // Create or update ARIA live region for screen readers
        let liveRegion = document.getElementById('carousel-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'carousel-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
        }
        liveRegion.textContent = message;
    }
    
    destroy() {
        this.stopAutoPlay();
        // Remove event listeners if needed
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        // Unit data configuration
        const units = [
            {
                id: '2br-a',
                badge: 'Premium 2 Bedroom',
                title: '2BR Apartment - Layout A',
                size: '101m²',
                bedrooms: '2',
                bathrooms: '2',
                price: 'KES 12.5M',
                description: 'Thoughtfully designed 2-bedroom apartment with an optimized layout for modern living. Features include a spacious master bedroom with ensuite, generous living area, and contemporary finishes throughout.',
                features: [
                    'Master bedroom with ensuite bathroom',
                    'Open-plan kitchen and living area',
                    'Private balcony with Northern Bypass views',
                    'High-quality fixtures and finishes',
                    'Ample storage space'
                ],
                image: 'images/2bed-a.webp',
                link: 'units.html#2br-a'
            },
            {
                id: '2br-b',
                badge: 'Premium 2 Bedroom',
                title: '2BR Apartment - Layout B',
                size: '101m²',
                bedrooms: '2',
                bathrooms: '2',
                price: 'KES 12.5M',
                description: 'Alternative 2-bedroom layout offering enhanced privacy and functionality. Perfect for small families or professionals seeking quality and comfort in a prime location.',
                features: [
                    'Alternative layout for enhanced privacy',
                    'Master bedroom with walk-in closet',
                    'Modern kitchen with premium appliances',
                    'Guest bedroom with adjacent bathroom',
                    'Elegant living and dining spaces'
                ],
                image: 'images/2bed-b.webp',
                link: 'units.html#2br-b'
            },
            {
                id: '3br',
                badge: 'Executive 3 Bedroom',
                title: '3BR Apartment',
                size: '135m²',
                bedrooms: '3',
                bathrooms: '3',
                price: 'KES 16.5M',
                description: 'Spacious 3-bedroom executive apartment designed for growing families. Features include three ensuite bedrooms, expansive living areas, and premium finishes that define luxury living.',
                features: [
                    'Three ensuite bedrooms',
                    'Expansive living and dining area',
                    'Modern kitchen with breakfast nook',
                    'Large balcony with panoramic views',
                    'Premium fixtures throughout'
                ],
                image: 'images/3bed.webp',
                link: 'units.html#3br'
            },
            {
                id: '3br-dsq',
                badge: 'Luxury 3 Bedroom + DSQ',
                title: '3BR + DSQ Apartment',
                size: '149m²',
                bedrooms: '3',
                bathrooms: '4',
                price: 'KES 18.5M',
                description: 'The pinnacle of luxury living at 6040 Vista. This prestigious apartment features three ensuite bedrooms plus a separate Domestic Staff Quarter, offering unparalleled space and comfort.',
                features: [
                    'Three ensuite bedrooms',
                    'Separate Domestic Staff Quarter (DSQ)',
                    'Spacious living and entertainment area',
                    'Gourmet kitchen with premium appliances',
                    'Multiple balconies with stunning views',
                    'Walk-in closets in all bedrooms'
                ],
                image: 'images/3bed-dsq.webp',
                link: 'units.html#3br-dsq'
            }
        ];
        
        // Build carousel HTML dynamically
        const carouselHTML = `
            <div class="carousel-header">
                <h2>Discover Your Perfect Home</h2>
                <p>Explore our range of thoughtfully designed units</p>
            </div>
            
            <div class="carousel-wrapper">
                <div class="carousel-track">
                    ${units.map(unit => `
                        <div class="carousel-slide">
                            <div class="slide-image" style="background-image: url('${unit.image}');" role="img" aria-label="${unit.title} interior"></div>
                            <div class="slide-content">
                                <span class="unit-badge">${unit.badge}</span>
                                <h3 class="unit-title">${unit.title}</h3>
                                
                                <div class="unit-specs">
                                    <div class="spec-item">
                                        <span class="spec-label">Size</span>
                                        <span class="spec-value">${unit.size}</span>
                                    </div>
                                    <div class="spec-item">
                                        <span class="spec-label">Bedrooms</span>
                                        <span class="spec-value">${unit.bedrooms}</span>
                                    </div>
                                    <div class="spec-item">
                                        <span class="spec-label">Bathrooms</span>
                                        <span class="spec-value">${unit.bathrooms}</span>
                                    </div>
                                </div>
                                
                                <p class="unit-description">${unit.description}</p>
                                
                                <ul class="unit-features">
                                    ${unit.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                                
                                <a href="${unit.link}" class="carousel-cta">View Floor Plan</a>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="carousel-nav">
                    <button class="carousel-arrow prev" aria-label="Previous unit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        </svg>
                    </button>
                    <button class="carousel-arrow next" aria-label="Next unit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                    </button>
                </div>
                
                <div class="carousel-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
            
            <div class="carousel-indicators"></div>
        `;
        
        carouselContainer.innerHTML = carouselHTML;
        
        // Initialize carousel
        const carousel = new NetflixCarousel(carouselContainer, {
            autoPlay: true,
            autoPlayInterval: 5000
        });
        
        // Make carousel accessible globally for debugging
        window.unitsCarousel = carousel;
    }
});

// Add CSS animation for progress bar
const style = document.createElement('style');
style.textContent = `
    @keyframes progress {
        from { width: 0%; }
        to { width: 100%; }
    }
`;
document.head.appendChild(style);