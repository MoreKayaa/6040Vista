/* ============================================
   6040 VISTA - SVG LOGO PROGRESS LOADER
   Logo-shaped progress bar with smooth animation
   ============================================ */

class SiteLoader {
    constructor() {
        this.loader = null;
        this.progressElement = null;
        this.logoSVG = null;
        this.init();
    }
    
    init() {
        this.createSVGLoader();
        this.trackPageLoad();
    }
    
    createSVGLoader() {
        // Create the SVG logo with progress animation
        // This uses a simplified approach that works with any logo
        const loaderHTML = `
            <div id="siteLoader" class="site-loader">
                <div class="loader-content">
                    <div class="svg-logo-container">
                        <!-- Your logo will be inserted here -->
                        <div class="logo-placeholder">
                            <svg viewBox="0 0 400 100" class="logo-svg">
                                <!-- Simplified 6040 Vista representation -->
                                <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
                                      font-family="Playfair Display, serif" font-size="24" font-weight="700" 
                                      fill="var(--bronze)">6040 Vista</text>
                            </svg>
                        </div>
                        <!-- Progress bar that fills the logo shape -->
                        <div class="logo-progress-overlay">
                            <div class="progress-fill" id="logoProgressFill"></div>
                        </div>
                    </div>
                    <div class="loader-text">
                        <p>Loading your investment opportunity...</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
        this.loader = document.getElementById('siteLoader');
        this.progressElement = document.getElementById('logoProgressFill');
        
        // If you have the actual SVG file, replace the placeholder
        this.loadActualLogo();
    }
    
    loadActualLogo() {
        // Try to load the actual logo SVG if it exists
        const logoImg = document.querySelector('.navbar .logo-img');
        if (logoImg && logoImg.src) {
            // Use the existing logo image as fallback
            const logoPlaceholder = this.loader.querySelector('.logo-placeholder');
            logoPlaceholder.innerHTML = `<img src="${logoImg.src}" alt="6040 Vista" style="width: 100%; height: auto; filter: opacity(0.7);">`;
        }
    }
    
    trackPageLoad() {
        let progress = 0;
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;
        
        // Simulate initial progress
        const initialProgress = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 70) {
                progress = 70;
                clearInterval(initialProgress);
            }
            this.updateProgress(progress);
        }, 100);
        
        // Track actual image loading
        if (totalImages > 0) {
            images.forEach(img => {
                if (img.complete) {
                    loadedImages++;
                } else {
                    img.addEventListener('load', () => {
                        loadedImages++;
                        this.checkCompletion(loadedImages, totalImages);
                    });
                    img.addEventListener('error', () => {
                        loadedImages++;
                        this.checkCompletion(loadedImages, totalImages);
                    });
                }
            });
            
            // Check if already loaded
            this.checkCompletion(loadedImages, totalImages);
        } else {
            // No images, complete quickly
            setTimeout(() => this.completeLoading(), 800);
        }
        
        // Fallback completion
        setTimeout(() => {
            if (this.loader && !this.loader.classList.contains('loaded')) {
                this.completeLoading();
            }
        }, 5000);
    }
    
    checkCompletion(loadedImages, totalImages) {
        if (loadedImages >= totalImages) {
            setTimeout(() => this.completeLoading(), 300);
        }
    }
    
    updateProgress(progress) {
        const clampedProgress = Math.min(Math.max(progress, 0), 100);
        
        if (this.progressElement) {
            this.progressElement.style.width = clampedProgress + '%';
        }
    }
    
    completeLoading() {
        // Animate to 100%
        this.animateToComplete().then(() => {
            this.loader.classList.add('loaded');
            
            setTimeout(() => {
                if (this.loader && this.loader.parentNode) {
                    this.loader.remove();
                }
                document.body.style.overflow = '';
                document.dispatchEvent(new CustomEvent('siteLoaded'));
            }, 600);
        });
    }
    
    animateToComplete() {
        return new Promise(resolve => {
            let currentProgress = 70;
            const targetProgress = 100;
            const duration = 400;
            const fps = 60;
            const totalFrames = (duration / 1000) * fps;
            const increment = (targetProgress - currentProgress) / totalFrames;
            
            let currentFrame = 0;
            
            const animation = setInterval(() => {
                currentFrame++;
                currentProgress += increment;
                
                this.updateProgress(currentProgress);
                
                if (currentFrame >= totalFrames) {
                    clearInterval(animation);
                    this.updateProgress(100);
                    resolve();
                }
            }, 1000 / fps);
        });
    }
}

// Prevent scrolling while loading
document.body.style.overflow = 'hidden';

// Initialize loader only on specified pages
const currentPath = window.location.pathname;
const shouldShowLoader = currentPath.includes('index.html') || 
                        currentPath.includes('gallery.html') || 
                        currentPath === '/' || 
                        currentPath === '/index.html';

if (shouldShowLoader) {
    const siteLoader = new SiteLoader();
    window.SiteLoader = siteLoader;
} else {
    document.body.style.overflow = '';
}
