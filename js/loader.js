/* ============================================
   6040 VISTA - PREMIUM SVG LOGO LOADER
   Progressive fill with elegant animations
   ============================================ */

class SiteLoader {
    constructor() {
        this.loader = null;
        this.logoContainer = null;
        this.svgPaths = [];
        this.clipRect = null;
        this.svgEl = null;
        this.svgWidth = 0;
        this.init();
    }

    init() {
        this.createSVGLoader();
        this.trackPageLoad();
    }

    createSVGLoader() {
        const loaderHTML = `
            <div id="siteLoader" class="site-loader">
                <div class="loader-content">
                    <div class="svg-logo-container">
                        <div id="inlineLogoContainer" class="inline-logo"></div>
                    </div>
                    <div class="loader-text">
                        <p>Loading your investment opportunity...</p>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
        this.loader = document.getElementById('siteLoader');
        this.logoContainer = document.getElementById('inlineLogoContainer');
        this.loadInlineSVG('images/6040V.svg');
    }

    async loadInlineSVG(svgPath) {
        try {
            const response = await fetch(svgPath);
            const svgText = await response.text();
            this.logoContainer.innerHTML = svgText;

            this.svgEl = this.logoContainer.querySelector('svg');
            if (!this.svgEl) {
                throw new Error('SVG element not found');
            }

            // Setup SVG for animation
            this.svgEl.classList.add('logo-svg');
            this.svgEl.style.width = '100%';
            this.svgEl.style.height = 'auto';

            // Get SVG dimensions for fill animation
            const viewBox = this.svgEl.viewBox.baseVal;
            this.svgWidth = viewBox ? viewBox.width : 1000;

            // Create dual-layer animation system
            this.setupDualLayerAnimation();

        } catch (err) {
            console.error('SVG loading error:', err);
            // Graceful fallback
            this.logoContainer.innerHTML = `
                <div style="width: 200px; height: 60px; background: var(--bronze); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-family: var(--font-heading); font-weight: 700;">6040 Vista</div>
            `;
            this.svgPaths = []; // Prevent animation errors
        }
    }

    setupDualLayerAnimation() {
        // Group existing content for stroke animation
        const strokeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        strokeGroup.setAttribute('id', 'strokeGroup');
        
        while (this.svgEl.firstChild) {
            strokeGroup.appendChild(this.svgEl.firstChild);
        }
        this.svgEl.appendChild(strokeGroup);

        // Clone for fill animation
        const fillGroup = strokeGroup.cloneNode(true);
        fillGroup.setAttribute('id', 'fillGroup');

        // Create progressive fill clip path
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
        clipPath.setAttribute('id', 'logoFillClip');
        
        this.clipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.clipRect.setAttribute('x', '0');
        this.clipRect.setAttribute('y', '0');
        this.clipRect.setAttribute('width', '0');
        this.clipRect.setAttribute('height', '100%');
        
        clipPath.appendChild(this.clipRect);
        defs.appendChild(clipPath);
        this.svgEl.insertBefore(defs, strokeGroup);

        // Configure stroke layer (outline animation)
        this.svgPaths = strokeGroup.querySelectorAll('path, rect, circle, polygon, polyline');
        this.svgPaths.forEach(path => {
            const length = path.getTotalLength ? path.getTotalLength() : 1000;
            path.style.fill = 'transparent';
            path.style.stroke = 'var(--bronze)';
            path.style.strokeWidth = '2';
            path.style.strokeLinecap = 'round';
            path.style.strokeLinejoin = 'round';
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.transition = 'stroke-dashoffset 0.4s ease-out';
        });

        // Configure fill layer (progressive fill)
        fillGroup.querySelectorAll('*').forEach(element => {
            element.removeAttribute('stroke');
            element.setAttribute('fill', 'var(--gold)');
        });
        fillGroup.setAttribute('clip-path', 'url(#logoFillClip)');
        this.svgEl.appendChild(fillGroup);
    }

    trackPageLoad() {
        let progress = 0;
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;

        // Smooth initial progress
        const initialProgress = setInterval(() => {
            progress += Math.random() * 12;
            if (progress > 70) {
                progress = 70;
                clearInterval(initialProgress);
            }
            this.updateProgress(progress);
        }, 120);

        // Track actual image loading
        if (totalImages > 0) {
            images.forEach(img => {
                const handleLoad = () => {
                    loadedImages++;
                    this.checkCompletion(loadedImages, totalImages);
                };
                
                if (img.complete) {
                    handleLoad();
                } else {
                    img.addEventListener('load', handleLoad, { once: true });
                    img.addEventListener('error', handleLoad, { once: true });
                }
            });
        } else {
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
        const clamped = Math.min(Math.max(progress, 0), 100);

        // 1. Stroke drawing animation
        this.svgPaths.forEach(path => {
            const length = path.getTotalLength ? path.getTotalLength() : 1000;
            path.style.strokeDashoffset = length * (1 - clamped / 100);
        });

        // 2. Progressive fill animation
        if (this.clipRect && this.svgWidth) {
            const fillWidth = (clamped / 100) * this.svgWidth;
            this.clipRect.setAttribute('width', fillWidth.toString());
        }
    }

    completeLoading() {
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
            const duration = 500;
            const fps = 60;
            const totalFrames = (duration / 1000) * fps;
            const increment = (targetProgress - currentProgress) / totalFrames;
            
            let frame = 0;
            const animation = setInterval(() => {
                frame++;
                currentProgress += increment;
                this.updateProgress(currentProgress);
                
                if (frame >= totalFrames) {
                    clearInterval(animation);
                    this.updateProgress(100);
                    resolve();
                }
            }, 1000 / fps);
        });
    }
}

// Initialize loader
document.body.style.overflow = 'hidden';

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
