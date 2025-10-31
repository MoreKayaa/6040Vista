/* ============================================
   6040 VISTA - BRANDED LOADER
   Smooth loading experience with logo animation
   ============================================ */

class SiteLoader {
    constructor() {
        this.loader = null;
        this.loadingProgress = 0;
        this.init();
    }
    
    init() {
        // Create loader HTML
        this.createLoader();
        
        // Start loading animation
        this.startLoading();
        
        // Track page load
        this.trackPageLoad();
    }
    
    createLoader() {
        // Create loader overlay
        const loaderHTML = `
            <div id="siteLoader" class="site-loader">
                <div class="loader-content">
                    <div class="loader-logo">
                        <img src="images/6040.png" alt="6040 Vista" class="loader-logo-img">
                    </div>
                    <div class="loader-text">
                        <h2>6040 Vista</h2>
                        <p>Loading your investment opportunity...</p>
                    </div>
                    <div class="loader-progress-bar">
                        <div class="loader-progress-fill" id="loaderProgressFill"></div>
                    </div>
                    <div class="loader-percentage" id="loaderPercentage">0%</div>
                </div>
            </div>
        `;
        
        // Insert at beginning of body
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
        this.loader = document.getElementById('siteLoader');
        this.progressFill = document.getElementById('loaderProgressFill');
        this.percentage = document.getElementById('loaderPercentage');
    }
    
    startLoading() {
        // Simulate progressive loading
        const loadingInterval = setInterval(() => {
            // Increase progress
            this.loadingProgress += Math.random() * 15;
            
            // Cap at 90% until actual page load
            if (this.loadingProgress > 90) {
                this.loadingProgress = 90;
            }
            
            this.updateProgress(this.loadingProgress);
            
            // If reached 90%, slow down
            if (this.loadingProgress >= 90) {
                clearInterval(loadingInterval);
            }
        }, 200);
    }
    
    trackPageLoad() {
        // Complete when everything is loaded
        window.addEventListener('load', () => {
            // Quick jump to 100%
            this.completeLoading();
        });
        
        // Fallback: Force complete after 5 seconds
        setTimeout(() => {
            if (this.loader && this.loader.classList.contains('site-loader')) {
                this.completeLoading();
            }
        }, 5000);
    }
    
    completeLoading() {
        // Animate to 100%
        this.animateToComplete().then(() => {
            // Add fade-out class
            this.loader.classList.add('loaded');
            
            // Remove from DOM after animation
            setTimeout(() => {
                if (this.loader && this.loader.parentNode) {
                    this.loader.remove();
                }
                
                // Enable scroll
                document.body.style.overflow = '';
                
                // Trigger custom event
                document.dispatchEvent(new CustomEvent('siteLoaded'));
            }, 800);
        });
    }
    
    animateToComplete() {
        return new Promise(resolve => {
            const targetProgress = 100;
            const duration = 500;
            const fps = 60;
            const totalFrames = (duration / 1000) * fps;
            const increment = (targetProgress - this.loadingProgress) / totalFrames;
            
            let currentFrame = 0;
            
            const animation = setInterval(() => {
                currentFrame++;
                this.loadingProgress += increment;
                
                this.updateProgress(this.loadingProgress);
                
                if (currentFrame >= totalFrames) {
                    clearInterval(animation);
                    this.updateProgress(100);
                    resolve();
                }
            }, 1000 / fps);
        });
    }
    
    updateProgress(progress) {
        const clampedProgress = Math.min(Math.max(progress, 0), 100);
        
        if (this.progressFill) {
            this.progressFill.style.width = clampedProgress + '%';
        }
        
        if (this.percentage) {
            this.percentage.textContent = Math.round(clampedProgress) + '%';
        }
    }
}

// Prevent scrolling while loading
document.body.style.overflow = 'hidden';

// Initialize loader
const siteLoader = new SiteLoader();

// Export for external access
window.SiteLoader = siteLoader;