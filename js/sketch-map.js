/**
 * Sketch-Style Interactive Map for 6040 Vista
 * Features:
 * - Hand-drawn aesthetic with animated connection lines
 * - Interactive hover states
 * - Time/distance indicators
 * - Responsive positioning
 */

class SketchMap {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container #${containerId} not found`);
            return;
        }
        
        // Location data with accurate positions and distances
        this.locations = [
            {
                id: 'northern-bypass',
                name: 'Northern Bypass',
                icon: '🛣️',
                distance: '100M',
                time: '2 min walk',
                direction: 'N',
                position: { top: '25%', left: '50%' }
            },
            {
                id: 'westlands',
                name: 'Westlands',
                icon: '🏙️',
                distance: '6.5 km',
                time: '15 min drive',
                direction: 'SW',
                position: { top: '35%', left: '20%' }
            },
            {
                id: 'gcm',
                name: 'Garden City Mall',
                icon: '🛍️',
                distance: '5.8 km',
                time: '12 min drive',
                direction: 'NW',
                position: { top: '30%', left: '25%' }
            },
            {
                id: 'windsor-golf',
                name: 'Windsor Golf Club',
                icon: '⛳',
                distance: '200M',
                time: '2 min walk',
                direction: 'E',
                position: { top: '55%', left: '65%' }
            },
            {
                id: 'karura-forest',
                name: 'Karura Forest',
                icon: '🌲',
                distance: '4.2 km',
                time: '10 min drive',
                direction: 'W',
                position: { top: '40%', left: '35%' }
            },
            {
                id: 'two-rivers',
                name: 'Two Rivers Mall',
                icon: '🏬',
                distance: '3.5 km',
                time: '8 min drive',
                direction: 'SE',
                position: { top: '65%', left: '75%' }
            }
        ];
        
        this.init();
    }
    
    init() {
        this.buildMap();
        this.attachEventListeners();
        this.drawConnectionLines();
    }
    
    buildMap() {
        const mapHTML = `
            <div class="sketch-map-header">
                <h2>Prime Location</h2>
                <p>Everything you need is just minutes away</p>
            </div>
            
            <div class="sketch-map-canvas">
                <!-- SVG for connection lines -->
                <svg class="sketch-map-svg" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="sketch-filter">
                            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                        </filter>
                    </defs>
                    ${this.locations.map(loc => `
                        <path id="line-${loc.id}" class="connection-line" d="" />
                    `).join('')}
                </svg>
                
                <!-- Center marker - 6040 Vista -->
                <div class="map-center">
                    <div class="center-marker">
                        <div class="center-marker-inner">
                            <div class="center-marker-logo">6040</div>
                            <div class="center-marker-label">Vista</div>
                        </div>
                    </div>
                </div>
                
                <!-- Location markers -->
                ${this.locations.map(loc => `
                    <div class="location-marker marker-${loc.id}" 
                         data-location="${loc.id}"
                         style="top: ${loc.position.top}; left: ${loc.position.left}; transform: translate(-50%, -50%);">
                        <div class="marker-pin">
                            <span class="marker-icon">${loc.icon}</span>
                        </div>
                        <div class="location-label">
                            <div class="location-name">${loc.name}</div>
                            <div class="location-distance">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                ${loc.distance} • ${loc.time}
                            </div>
                        </div>
                    </div>
                `).join('')}
                
                <!-- Compass Rose -->
                <svg class="compass-rose" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="#C9A869" stroke-width="2"/>
                    <text x="50" y="20" text-anchor="middle" font-size="14" fill="#2C2420" font-weight="bold">N</text>
                    <text x="80" y="55" text-anchor="middle" font-size="14" fill="#6B5D52">E</text>
                    <text x="50" y="85" text-anchor="middle" font-size="14" fill="#6B5D52">S</text>
                    <text x="20" y="55" text-anchor="middle" font-size="14" fill="#6B5D52">W</text>
                    <line x1="50" y1="10" x2="50" y2="90" stroke="#C9A869" stroke-width="2"/>
                    <line x1="10" y1="50" x2="90" y2="50" stroke="#C9A869" stroke-width="2"/>
                    <polygon points="50,10 45,25 50,20 55,25" fill="#A37F4E"/>
                </svg>
                
                <!-- Legend -->
                <div class="map-legend">
                    <div class="legend-title">Legend</div>
                    <div class="legend-items">
                        <div class="legend-item">
                            <span class="legend-icon center"></span>
                            <span>6040 Vista</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-icon location"></span>
                            <span>Key Locations</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.container.innerHTML = mapHTML;
    }
    
    drawConnectionLines() {
        const canvas = this.container.querySelector('.sketch-map-canvas');
        const centerElement = this.container.querySelector('.map-center');
        
        // Get center position
        const centerRect = centerElement.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        
        const centerX = centerRect.left - canvasRect.left + centerRect.width / 2;
        const centerY = centerRect.top - canvasRect.top + centerRect.height / 2;
        
        // Draw line to each location
        this.locations.forEach(loc => {
            const marker = this.container.querySelector(`.marker-${loc.id}`);
            if (!marker) return;
            
            const markerRect = marker.getBoundingClientRect();
            const markerX = markerRect.left - canvasRect.left + markerRect.width / 2;
            const markerY = markerRect.top - canvasRect.top + markerRect.height / 2;
            
            // Create curved path (Bezier curve for hand-drawn look)
            const controlX = (centerX + markerX) / 2 + (Math.random() - 0.5) * 50;
            const controlY = (centerY + markerY) / 2 + (Math.random() - 0.5) * 50;
            
            const path = `M ${centerX} ${centerY} Q ${controlX} ${controlY} ${markerX} ${markerY}`;
            
            const lineElement = this.container.querySelector(`#line-${loc.id}`);
            if (lineElement) {
                lineElement.setAttribute('d', path);
            }
        });
    }
    
    attachEventListeners() {
        // Marker hover interactions
        const markers = this.container.querySelectorAll('.location-marker');
        
        markers.forEach(marker => {
            const locationId = marker.dataset.location;
            const line = this.container.querySelector(`#line-${locationId}`);
            
            marker.addEventListener('mouseenter', () => {
                marker.classList.add('active');
                if (line) line.classList.add('active');
            });
            
            marker.addEventListener('mouseleave', () => {
                marker.classList.remove('active');
                if (line) line.classList.remove('active');
            });
            
            // Click to highlight
            marker.addEventListener('click', () => {
                // Remove active from all others
                markers.forEach(m => {
                    m.classList.remove('active');
                    const l = this.container.querySelector(`#line-${m.dataset.location}`);
                    if (l) l.classList.remove('active');
                });
                
                // Add active to clicked
                marker.classList.add('active');
                if (line) line.classList.add('active');
            });
        });
        
        // Redraw lines on window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.drawConnectionLines();
            }, 250);
        });
    }
}

// Initialize map when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('sketch-map-container');
    
    if (mapContainer) {
        const map = new SketchMap('sketch-map-container');
        
        // Make map accessible globally
        window.sketchMap = map;
    }
});

/**
 * USAGE IN HTML:
 * 
 * <section class="sketch-map-section">
 *     <div id="sketch-map-container"></div>
 * </section>
 * 
 * REQUIRED FILES:
 * - css/sketch-map.css
 * - js/sketch-map.js
 * 
 * The JavaScript will automatically build the entire map structure.
 */