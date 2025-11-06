/**
 * Lightbox Gallery System for 6040 Vista Floor Plans
 * Features:
 * - Click-to-enlarge functionality
 * - Keyboard navigation (ESC to close)
 * - Click outside to close
 * - Zoom controls (optional)
 * - Download button (optional)
 * - Smooth animations
 */

class LightboxGallery {
    constructor() {
        this.lightboxHTML = `
            <div class="lightbox-overlay" id="lightbox-overlay" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                    
                    <div class="lightbox-zoom-controls">
                        <button class="zoom-btn zoom-in" aria-label="Zoom in">+</button>
                        <button class="zoom-btn zoom-out" aria-label="Zoom out">−</button>
                        <button class="zoom-btn zoom-reset" aria-label="Reset zoom">⟲</button>
                    </div>
                    
                    <div class="lightbox-loading"></div>
                    
                    <img class="lightbox-image" src="" alt="" id="lightbox-img">
                    
                    <div class="lightbox-caption">
                        <h3 class="lightbox-title" id="lightbox-title"></h3>
                        <p class="lightbox-description" id="lightbox-description"></p>
                    </div>
                    
                    <a class="lightbox-download" href="" download id="lightbox-download">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/>
                        </svg>
                        Download Floor Plan
                    </a>
                </div>
                
                <p class="lightbox-instructions">Press ESC to close • Click outside to close</p>
            </div>
        `;
        
        this.currentZoom = 1;
        this.minZoom = 0.5;
        this.maxZoom = 3;
        this.zoomStep = 0.25;
        
        this.init();
    }
    
    init() {
        // Inject lightbox HTML into body
        document.body.insertAdjacentHTML('beforeend', this.lightboxHTML);
        
        // Get elements
        this.overlay = document.getElementById('lightbox-overlay');
        this.image = document.getElementById('lightbox-img');
        this.title = document.getElementById('lightbox-title');
        this.description = document.getElementById('lightbox-description');
        this.closeBtn = this.overlay.querySelector('.lightbox-close');
        this.downloadBtn = document.getElementById('lightbox-download');
        this.loading = this.overlay.querySelector('.lightbox-loading');
        
        this.zoomInBtn = this.overlay.querySelector('.zoom-in');
        this.zoomOutBtn = this.overlay.querySelector('.zoom-out');
        this.zoomResetBtn = this.overlay.querySelector('.zoom-reset');
        
        // Attach event listeners
        this.attachEventListeners();
        
        // Initialize gallery triggers
        this.initializeGalleryTriggers();
    }
    
    initializeGalleryTriggers() {
        // Find all images marked for gallery
        const galleryImages = document.querySelectorAll('.floor-plan-gallery');
        
        galleryImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                const src = img.src || img.dataset.src;
                const title = img.dataset.title || img.alt;
                const description = img.dataset.description || '';
                
                this.open(src, title, description);
            });
            
            // Make keyboard accessible
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    img.click();
                }
            });
        });
    }
    
    attachEventListeners() {
        // Close button
        this.closeBtn.addEventListener('click', () => this.close());
        
        // Click outside to close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.overlay.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                this.close();
            } else if (e.key === '+' || e.key === '=') {
                this.zoomIn();
            } else if (e.key === '-' || e.key === '_') {
                this.zoomOut();
            } else if (e.key === '0') {
                this.resetZoom();
            }
        });
        
        // Zoom controls
        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        this.zoomResetBtn.addEventListener('click', () => this.resetZoom());
        
        // Image load event
        this.image.addEventListener('load', () => {
            this.loading.style.display = 'none';
            this.image.style.opacity = '1';
        });
        
        // Prevent image drag
        this.image.addEventListener('dragstart', (e) => e.preventDefault());
    }
    
    open(src, title, description) {
        // Show loading
        this.loading.style.display = 'block';
        this.image.style.opacity = '0';
        
        // Set content
        this.image.src = src;
        this.image.alt = title;
        this.title.textContent = title;
        this.description.textContent = description;
        this.downloadBtn.href = src;
        this.downloadBtn.download = title.replace(/\s+/g, '-').toLowerCase() + '.webp';
        
        // Reset zoom
        this.resetZoom();
        
        // Show overlay
        this.overlay.classList.add('active');
        document.body.classList.add('lightbox-open');
        
        // Focus management for accessibility
        this.closeBtn.focus();
        
        // Announce to screen readers
        this.announce(`Opened lightbox for ${title}`);
    }
    
    close() {
        this.overlay.classList.remove('active');
        document.body.classList.remove('lightbox-open');
        
        // Clear image after animation
        setTimeout(() => {
            this.image.src = '';
            this.title.textContent = '';
            this.description.textContent = '';
        }, 300);
        
        // Announce to screen readers
        this.announce('Closed lightbox');
    }
    
    zoomIn() {
        if (this.currentZoom < this.maxZoom) {
            this.currentZoom += this.zoomStep;
            this.applyZoom();
            this.announce(`Zoomed in to ${Math.round(this.currentZoom * 100)}%`);
        }
    }
    
    zoomOut() {
        if (this.currentZoom > this.minZoom) {
            this.currentZoom -= this.zoomStep;
            this.applyZoom();
            this.announce(`Zoomed out to ${Math.round(this.currentZoom * 100)}%`);
        }
    }
    
    resetZoom() {
        this.currentZoom = 1;
        this.applyZoom();
        this.announce('Zoom reset to 100%');
    }
    
    applyZoom() {
        this.image.style.transform = `scale(${this.currentZoom})`;
        this.image.style.transition = 'transform 0.3s ease';
        
        // Update button states
        this.zoomInBtn.disabled = this.currentZoom >= this.maxZoom;
        this.zoomOutBtn.disabled = this.currentZoom <= this.minZoom;
    }
    
    announce(message) {
        // Create or update ARIA live region
        let liveRegion = document.getElementById('lightbox-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'lightbox-live-region';
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
}

// Auto-convert floor plan images to gallery triggers
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lightbox
    const lightbox = new LightboxGallery();
    
    // Auto-detect floor plan images and make them clickable
    // Look for images with specific patterns in their src or alt text
    const floorPlanSelectors = [
        'img[src*="floor-plan"]',
        'img[src*="2bed"]',
        'img[src*="3bed"]',
        'img[alt*="Floor Plan"]',
        'img[alt*="floor plan"]',
        '.unit-floor-plan img',
        '.floor-plan img'
    ];
    
    floorPlanSelectors.forEach(selector => {
        const images = document.querySelectorAll(selector);
        images.forEach(img => {
            // Only add if not already marked
            if (!img.classList.contains('floor-plan-gallery')) {
                img.classList.add('floor-plan-gallery');
                
                // Set data attributes if not present
                if (!img.dataset.title && img.alt) {
                    img.dataset.title = img.alt;
                }
                
                // Re-initialize triggers
                lightbox.initializeGalleryTriggers();
            }
        });
    });
    
    // Make lightbox accessible globally
    window.lightboxGallery = lightbox;
});

/**
 * USAGE EXAMPLES:
 * 
 * 1. Manual class assignment:
 * <img src="images/2bed-a.webp" 
 *      alt="2BR Layout A Floor Plan" 
 *      class="floor-plan-gallery"
 *      data-title="2 Bedroom Apartment - Layout A"
 *      data-description="101m² • 2 Bedrooms • 2 Bathrooms">
 * 
 * 2. Programmatic opening:
 * window.lightboxGallery.open(
 *     'images/3bed.webp',
 *     '3 Bedroom Apartment',
 *     '135m² luxury living space'
 * );
 * 
 * 3. Container-based gallery:
 * <div class="unit-floor-plan">
 *     <img src="images/2bed-a.webp" alt="2BR Floor Plan">
 * </div>
 */