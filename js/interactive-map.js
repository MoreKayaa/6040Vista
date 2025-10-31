/* ============================================
   6040 VISTA - INTERACTIVE SVG MAP
   Real coordinates with comprehensive features
   ============================================ */

class InteractiveMap {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.options = {
            isPreview: options.isPreview || false,
            showLegend: options.showLegend !== false,
            enableModal: options.enableModal !== false,
            width: 900,
            height: options.isPreview ? 400 : 500,
            ...options
        };
        
        // Real approximate coordinates for Gitere/Northern Bypass area
        this.landmarks = [
            {
                id: '6040-vista',
                name: '6040 Vista',
                lat: -1.2159,
                lng: 36.8389,
                type: 'development',
                distance: '0M',
                time: 'You are here',
                description: 'Premium residential development with world-class amenities.',
                details: 'Your strategic investment opportunity featuring modern 2 & 3 bedroom units with exceptional ROI potential.',
                icon: '🏢',
                color: '#C9A869',
                isPrimary: true
            },
            {
                id: 'northern-bypass',
                name: 'Northern Bypass',
                lat: -1.2165,
                lng: 36.8417,
                type: 'highway',
                distance: '100M',
                time: '1 min walk',
                description: 'Major arterial highway connecting Nairobi regions.',
                details: 'Critical transport infrastructure providing seamless access to all major business districts and residential areas throughout Nairobi.',
                icon: '🛣️',
                color: '#A37F4E'
            },
            {
                id: 'windsor-golf',
                name: 'Windsor Golf Club',
                lat: -1.2185,
                lng: 36.8391,
                type: 'recreation',
                distance: '150M',
                time: '2 min walk',
                description: 'Prestigious golf and country club.',
                details: 'Exclusive recreational facility offering championship golf course, fine dining, and premium social amenities for discerning residents.',
                icon: '⛳',
                color: '#8B6F3D'
            },
            {
                id: 'two-rivers',
                name: 'Two Rivers Mall',
                lat: -1.2028,
                lng: 36.7939,
                type: 'shopping',
                distance: '3.2KM',
                time: '8 min drive',
                description: "East Africa's largest shopping destination.",
                details: 'Comprehensive retail, dining, and entertainment complex featuring international brands, cinemas, restaurants, and lifestyle amenities.',
                icon: '🛍️',
                color: '#C9A869'
            },
            {
                id: 'karura-forest',
                name: 'Karura Forest',
                lat: -1.2523,
                lng: 36.8236,
                type: 'nature',
                distance: '4.1KM',
                time: '12 min drive',
                description: 'Urban forest and nature reserve.',
                details: 'Pristine 1,041-hectare indigenous forest perfect for recreation, jogging trails, cycling, and family activities in natural surroundings.',
                icon: '🌳',
                color: '#3CB371'
            },
            {
                id: 'village-market',
                name: 'Village Market',
                lat: -1.2359,
                lng: 36.8075,
                type: 'shopping',
                distance: '4.8KM',
                time: '12 min drive',
                description: 'Premium shopping and dining complex.',
                details: 'Upmarket retail center featuring restaurants, specialty shops, professional services, and the popular Nakumatt supermarket.',
                icon: '🏪',
                color: '#A37F4E'
            },
            {
                id: 'westlands-gcm',
                name: 'GCM & Westlands',
                lat: -1.2644,
                lng: 36.8123,
                type: 'business',
                distance: '6.5KM',
                time: '15 min drive',
                description: 'Major business and commercial districts.',
                details: 'Primary employment hubs with corporate offices, international banks, restaurants, hotels, and comprehensive professional services.',
                icon: '🏙️',
                color: '#C9A869'
            }
        ];
        
        this.tooltip = null;
        this.modal = null;
        this.init();
    }
    
    init() {
        this.createMapSVG();
        this.createLandmarks();
        if (this.options.showLegend && !this.options.isPreview) {
            this.createLegend();
        }
        this.setupEventListeners();
    }
    
    // Haversine distance calculation in meters
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371000; // Earth's radius in meters
        const toRad = (deg) => (deg * Math.PI) / 180;
        
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a = Math.sin(dLat / 2) ** 2 +
                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return R * c;
    }
    
    formatDistance(meters) {
        if (meters < 1000) return `${Math.round(meters)}M`;
        return `${(meters / 1000).toFixed(1)}KM`;
    }
    
    // Convert lat/lng to SVG coordinates
    projectCoordinates() {
        const lats = this.landmarks.map(l => l.lat);
        const lngs = this.landmarks.map(l => l.lng);
        
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);
        
        const padding = 60;
        const width = this.options.width - padding * 2;
        const height = this.options.height - padding * 2;
        
        return (lat, lng) => {
            const x = ((lng - minLng) / (maxLng - minLng)) * width + padding;
            const y = ((maxLat - lat) / (maxLat - minLat)) * height + padding;
            return { x, y };
        };
    }
    
    createMapSVG() {
        const project = this.projectCoordinates();
        
        const mapHTML = `
            <div class="map-container">
                <svg viewBox="0 0 ${this.options.width} ${this.options.height}" style="width: 100%; height: 100%;">
                    <defs>
                        <radialGradient id="mapBg" cx="50%" cy="50%" r="60%">
                            <stop offset="0%" style="stop-color:var(--cream);stop-opacity:1" />
                            <stop offset="100%" style="stop-color:var(--beige);stop-opacity:1" />
                        </radialGradient>
                        <filter id="shadow">
                            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
                        </filter>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    
                    <!-- Background -->
                    <rect width="100%" height="100%" fill="url(#mapBg)" rx="8"/>
                    
                    <!-- Road network (stylized) -->
                    ${this.createRoadNetwork(project)}
                    
                    <!-- Landmarks container -->
                    <g id="landmarks"></g>
                </svg>
            </div>
        `;
        
        this.container.innerHTML = mapHTML;
        this.svg = this.container.querySelector('svg');
        this.landmarksGroup = this.svg.querySelector('#landmarks');
    }
    
    createRoadNetwork(project) {
        // Create stylized road connections
        const vista = project(-1.2159, 36.8389);
        const bypass = project(-1.2165, 36.8417);
        const westlands = project(-1.2644, 36.8123);
        const twoRivers = project(-1.2028, 36.7939);
        
        return `
            <!-- Northern Bypass (main highway) -->
            <path d="M ${bypass.x - 100} ${bypass.y} L ${bypass.x + 100} ${bypass.y}" 
                  stroke="var(--bronze)" stroke-width="4" opacity="0.6" stroke-linecap="round"/>
            
            <!-- Connection roads -->
            <path d="M ${vista.x} ${vista.y} L ${bypass.x} ${bypass.y}" 
                  stroke="var(--warm-gray)" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
            <path d="M ${vista.x} ${vista.y} Q ${westlands.x + 50} ${westlands.y + 30} ${westlands.x} ${westlands.y}" 
                  stroke="var(--warm-gray)" stroke-width="2" opacity="0.4" stroke-linecap="round" fill="none"/>
            <path d="M ${vista.x} ${vista.y} Q ${twoRivers.x - 30} ${twoRivers.y + 20} ${twoRivers.x} ${twoRivers.y}" 
                  stroke="var(--warm-gray)" stroke-width="2" opacity="0.4" stroke-linecap="round" fill="none"/>
        `;
    }
    
    createLandmarks() {
        const project = this.projectCoordinates();
        const vistaCoords = this.landmarks.find(l => l.id === '6040-vista');
        
        this.landmarks.forEach(landmark => {
            // Calculate real distance
            if (landmark.id !== '6040-vista') {
                const distance = this.calculateDistance(
                    vistaCoords.lat, vistaCoords.lng,
                    landmark.lat, landmark.lng
                );
                landmark.calculatedDistance = this.formatDistance(distance);
            }
            
            const coords = project(landmark.lat, landmark.lng);
            const element = this.createLandmarkElement(landmark, coords);
            this.landmarksGroup.appendChild(element);
        });
    }
    
    createLandmarkElement(landmark, coords) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('landmark');
        g.setAttribute('data-id', landmark.id);
        g.style.cursor = 'pointer';
        
        // Pulse animation for primary location
        if (landmark.isPrimary) {
            const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pulse.setAttribute('cx', coords.x);
            pulse.setAttribute('cy', coords.y);
            pulse.setAttribute('r', '15');
            pulse.setAttribute('fill', 'none');
            pulse.setAttribute('stroke', landmark.color);
            pulse.setAttribute('stroke-width', '2');
            pulse.setAttribute('opacity', '0.6');
            
            // Add animation
            const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animate.setAttribute('attributeName', 'r');
            animate.setAttribute('values', '15;25;15');
            animate.setAttribute('dur', '3s');
            animate.setAttribute('repeatCount', 'indefinite');
            
            const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animateOpacity.setAttribute('attributeName', 'opacity');
            animateOpacity.setAttribute('values', '0.6;0;0.6');
            animateOpacity.setAttribute('dur', '3s');
            animateOpacity.setAttribute('repeatCount', 'indefinite');
            
            pulse.appendChild(animate);
            pulse.appendChild(animateOpacity);
            g.appendChild(pulse);
        }
        
        // Main marker
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', coords.x);
        circle.setAttribute('cy', coords.y);
        circle.setAttribute('r', landmark.isPrimary ? '12' : '8');
        circle.setAttribute('fill', landmark.color);
        circle.setAttribute('stroke', 'white');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('filter', 'url(#shadow)');
        circle.classList.add('marker');
        
        // Icon
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', coords.x);
        text.setAttribute('y', coords.y + 2);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('font-size', landmark.isPrimary ? '14' : '10');
        text.textContent = landmark.icon;
        
        // Label (for full mode only)
        if (!this.options.isPreview) {
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', coords.x + 15);
            label.setAttribute('y', coords.y - 10);
            label.setAttribute('font-family', 'Lato, sans-serif');
            label.setAttribute('font-size', '12');
            label.setAttribute('font-weight', '600');
            label.setAttribute('fill', 'var(--charcoal)');
            label.textContent = landmark.name;
            g.appendChild(label);
        }
        
        g.appendChild(circle);
        g.appendChild(text);
        
        // Event handlers
        this.addLandmarkEvents(g, landmark);
        
        return g;
    }
    
    addLandmarkEvents(element, landmark) {
        // Hover effects
        element.addEventListener('mouseenter', (e) => {
            const marker = element.querySelector('.marker');
            marker.setAttribute('filter', 'url(#glow)');
            marker.style.transform = 'scale(1.2)';
            marker.style.transformOrigin = 'center';
            this.showTooltip(e, landmark);
        });
        
        element.addEventListener('mouseleave', () => {
            const marker = element.querySelector('.marker');
            marker.setAttribute('filter', 'url(#shadow)');
            marker.style.transform = 'scale(1)';
            this.hideTooltip();
        });
        
        element.addEventListener('mousemove', (e) => {
            if (this.tooltip) {
                this.updateTooltipPosition(e);
            }
        });
        
        // Click handler
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.options.enableModal && !this.options.isPreview) {
                this.showModal(landmark);
            } else {
                this.openDirections(landmark);
            }
        });
    }
    
    showTooltip(event, landmark) {
        this.hideTooltip();
        
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'map-tooltip';
        
        const distance = landmark.calculatedDistance || landmark.distance;
        
        this.tooltip.innerHTML = `
            <h4>${landmark.icon} ${landmark.name}</h4>
            <p><strong>Distance:</strong> ${distance}</p>
            <p><strong>Travel Time:</strong> ${landmark.time}</p>
            ${!this.options.isPreview ? `<p>${landmark.description}</p>` : ''}
        `;
        
        document.body.appendChild(this.tooltip);
        this.updateTooltipPosition(event);
    }
    
    updateTooltipPosition(event) {
        if (!this.tooltip) return;
        
        const rect = this.container.getBoundingClientRect();
        let x = event.clientX + 10;
        let y = event.clientY - 10;
        
        // Keep tooltip in viewport
        const tooltipRect = this.tooltip.getBoundingClientRect();
        if (x + tooltipRect.width > window.innerWidth) {
            x = event.clientX - tooltipRect.width - 10;
        }
        if (y < 0) {
            y = event.clientY + 20;
        }
        
        this.tooltip.style.left = x + 'px';
        this.tooltip.style.top = y + 'px';
    }
    
    hideTooltip() {
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
        }
    }
    
    showModal(landmark) {
        const distance = landmark.calculatedDistance || landmark.distance;
        
        this.modal = document.createElement('div');
        this.modal.className = 'landmark-info-modal';
        this.modal.innerHTML = `
            <div class="landmark-info-content">
                <button class="close-info" aria-label="Close">×</button>
                <h2>${landmark.icon} ${landmark.name}</h2>
                <div class="landmark-distance">${distance} • ${landmark.time}</div>
                <p>${landmark.details}</p>
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <a href="${this.getDirectionsUrl(landmark)}" target="_blank" class="btn-primary" style="flex: 1; text-align: center;">
                        Get Directions
                    </a>
                    <button class="btn-secondary" style="flex: 1;" onclick="this.closest('.landmark-info-modal').remove()">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.modal);
        
        // Event handlers
        this.modal.querySelector('.close-info').addEventListener('click', () => {
            this.modal.remove();
        });
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.remove();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal) {
                this.modal.remove();
            }
        });
    }
    
    openDirections(landmark) {
        window.open(this.getDirectionsUrl(landmark), '_blank');
    }
    
    getDirectionsUrl(landmark) {
        const origin = '6040 Vista, Gitere, Northern Bypass, Nairobi';
        const destination = `${landmark.name}, Nairobi, Kenya`;
        return `https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`;
    }
    
    createLegend() {
        const legend = document.createElement('div');
        legend.className = 'map-legend';
        legend.innerHTML = `
            <h4>Key Locations</h4>
            <div class="legend-items">
                ${this.landmarks.slice(0, 5).map(l => `
                    <div class="legend-item">
                        <span class="legend-icon">${l.icon}</span>
                        <span>${l.name}</span>
                    </div>
                `).join('')}
            </div>
        `;
        this.container.appendChild(legend);
    }
    
    setupEventListeners() {
        // Handle resize
        window.addEventListener('resize', () => {
            this.hideTooltip();
            // Optionally redraw map for better responsive behavior
        });
        
        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            this.hideTooltip();
            if (this.modal) this.modal.remove();
        });
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Full interactive map (location.html)
    if (document.getElementById('locationInteractiveMap')) {
        window.locationMap = new InteractiveMap('locationInteractiveMap', {
            isPreview: false,
            showLegend: true,
            enableModal: true
        });
    }
    
    // Preview map (homepage)
    if (document.getElementById('homeMapPreview')) {
        window.homeMap = new InteractiveMap('homeMapPreview', {
            isPreview: true,
            showLegend: false,
            enableModal: false,
            height: 400
        });
    }
});
