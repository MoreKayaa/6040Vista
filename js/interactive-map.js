/* ============================================
   6040 VISTA - INTERACTIVE MAP (UX OPTIMIZED)
   Premium visual design with smooth interactions
   ============================================ */

class InteractiveMap {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      isPreview: options.isPreview || false,
      showLegend: options.showLegend !== false,
      enableModal: options.enableModal !== false,
      width: 1000,
      height: options.isPreview ? 450 : 600,
      ...options,
    };

    // Location data with accurate coordinates
    this.landmarks = [
      {
        id: "6040-vista",
        name: "6040 Vista",
        lat: -1.2159,
        lng: 36.8389,
        type: "development",
        description: "Your premium investment destination",
        details:
          "Modern 2 & 3 bedroom units with world-class amenities and exceptional ROI potential.",
        icon: "🏢",
        color: "#C9A869",
        isPrimary: true,
      },
      {
        id: "northern-bypass",
        name: "Northern Bypass",
        lat: -1.2125,
        lng: 36.8389,
        type: "highway",
        description: "Major arterial highway",
        details:
          "Critical transport infrastructure providing seamless access to all major business districts.",
        icon: "🛣️",
        color: "#A37F4E",
      },
      {
        id: "golf-club",
        name: "Golf Club",
        lat: -1.2195,
        lng: 36.845,
        type: "recreation",
        description: "Prestigious golf & country club",
        details:
          "Championship golf course, fine dining, and premium social amenities.",
        icon: "⛳",
        color: "#8B6F3D",
      },
      {
        id: "international-school",
        name: "International School",
        lat: -1.214,
        lng: 36.848,
        type: "education",
        description: "World-class education facility",
        details:
          "Premium international curriculum schools nearby including ISK, Brookhouse, and Braeburn.",
        icon: "🎓",
        color: "#A37F4E",
      },
      {
        id: "two-rivers",
        name: "Two Rivers Mall",
        lat: -1.2028,
        lng: 36.79,
        type: "shopping",
        description: "East Africa's largest mall",
        details:
          "Comprehensive retail, dining, and entertainment with international brands.",
        icon: "🛍️",
        color: "#C9A869",
      },
      {
        id: "karura-forest",
        name: "Karura Forest",
        lat: -1.2523,
        lng: 36.82,
        type: "nature",
        description: "Urban forest & nature reserve",
        details:
          "1,041-hectare forest with jogging trails, cycling, and family activities.",
        icon: "🌳",
        color: "#3CB371",
      },
      {
        id: "westlands",
        name: "Westlands & GCM",
        lat: -1.2644,
        lng: 36.808,
        type: "business",
        description: "Major business districts",
        details:
          "Corporate offices, banks, restaurants, hotels, and professional services.",
        icon: "🏙️",
        color: "#C9A869",
      },
    ];

    this.tooltip = null;
    this.modal = null;
    this.activeMarker = null;
    this.init();
  }

  init() {
    this.calculateAllDistances();
    this.createMapHTML();
    this.createLandmarks();
    if (this.options.showLegend && !this.options.isPreview) {
      this.createLegend();
    }
    this.setupEventListeners();
  }

  calculateAllDistances() {
    const vista = this.landmarks.find((l) => l.id === "6040-vista");

    this.landmarks.forEach((landmark) => {
      if (landmark.id !== "6040-vista") {
        const distanceMeters = this.calculateDistance(
          vista.lat,
          vista.lng,
          landmark.lat,
          landmark.lng
        );
        landmark.calculatedDistance = this.formatDistance(distanceMeters);
        landmark.calculatedTime = this.estimateTime(distanceMeters);
      }
    });
  }

  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000; // Earth's radius in meters
    const toRad = (deg) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  formatDistance(meters) {
    if (meters < 1000) return `${Math.round(meters)}M`;
    return `${(meters / 1000).toFixed(1)}KM`;
  }

  estimateTime(meters) {
    if (meters < 500) return "2 min walk";
    if (meters < 1000) return "5 min walk";
    const minutes = Math.round((meters / 1000) * 3); // ~20 km/h avg
    return `${minutes} min drive`;
  }

  projectCoordinates() {
    const lats = this.landmarks.map((l) => l.lat);
    const lngs = this.landmarks.map((l) => l.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const padding = 80;
    const width = this.options.width - padding * 2;
    const height = this.options.height - padding * 2;

    return (lat, lng) => {
      const x = ((lng - minLng) / (maxLng - minLng)) * width + padding;
      const y = ((maxLat - lat) / (maxLat - minLat)) * height + padding;
      return { x, y };
    };
  }

  createMapHTML() {
    const project = this.projectCoordinates();

    const mapHTML = `
            <div class="interactive-map-wrapper">
                <svg viewBox="0 0 ${this.options.width} ${this.options.height}" class="map-svg">
                    <defs>
                        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#fdfcfa;stop-opacity:1" />
                            <stop offset="50%" style="stop-color:#f5f1e8;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#e8dcc4;stop-opacity:1" />
                        </linearGradient>
                        
                        <filter id="markerShadow">
                            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.25"/>
                        </filter>
                        
                        <filter id="markerGlow">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                        
                        <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(201, 168, 105, 0.08)" stroke-width="1"/>
                        </pattern>
                    </defs>
                    
                    <!-- Background with gradient -->
                    <rect width="100%" height="100%" fill="url(#mapGradient)" rx="12"/>
                    <rect width="100%" height="100%" fill="url(#gridPattern)" opacity="0.5"/>
                    
                    <!-- Decorative border -->
                    <rect width="100%" height="100%" fill="none" stroke="rgba(201, 168, 105, 0.3)" 
                          stroke-width="3" rx="12" stroke-dasharray="10,5"/>
                    
                    <!-- Connection lines -->
                    <g id="connections" opacity="0.4"></g>
                    
                    <!-- Landmarks -->
                    <g id="landmarks"></g>
                </svg>
            </div>
        `;

    this.container.innerHTML = mapHTML;
    this.svg = this.container.querySelector(".map-svg");
    this.connectionsGroup = this.svg.querySelector("#connections");
    this.landmarksGroup = this.svg.querySelector("#landmarks");

    this.drawConnections();
  }

  drawConnections() {
    const project = this.projectCoordinates();
    const vista = project(-1.2159, 36.8389);

    this.landmarks.forEach((landmark) => {
      if (landmark.id === "6040-vista") return;

      const coords = project(landmark.lat, landmark.lng);

      // Curved connection line
      const midX = (vista.x + coords.x) / 2;
      const midY = (vista.y + coords.y) / 2;
      const controlX = midX + (Math.random() - 0.5) * 30;
      const controlY = midY - 40;

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        `M ${vista.x} ${vista.y} Q ${controlX} ${controlY} ${coords.x} ${coords.y}`
      );
      path.setAttribute("stroke", landmark.color);
      path.setAttribute("stroke-width", "2");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke-dasharray", "8,4");
      path.setAttribute("class", "connection-line");
      path.setAttribute("data-landmark", landmark.id);

      this.connectionsGroup.appendChild(path);
    });
  }

  createLandmarks() {
    const project = this.projectCoordinates();

    this.landmarks.forEach((landmark) => {
      const coords = project(landmark.lat, landmark.lng);
      const element = this.createLandmarkElement(landmark, coords);
      this.landmarksGroup.appendChild(element);
    });
  }

  createLandmarkElement(landmark, coords) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.classList.add("map-landmark");
    g.setAttribute("data-id", landmark.id);

    // Pulse ring for primary location
    if (landmark.isPrimary) {
      const pulseRing = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      pulseRing.setAttribute("cx", coords.x);
      pulseRing.setAttribute("cy", coords.y);
      pulseRing.setAttribute("r", "20");
      pulseRing.setAttribute("fill", "none");
      pulseRing.setAttribute("stroke", landmark.color);
      pulseRing.setAttribute("stroke-width", "3");
      pulseRing.setAttribute("opacity", "0.5");
      pulseRing.classList.add("pulse-ring");

      // Pulse animation
      const animate1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "animate"
      );
      animate1.setAttribute("attributeName", "r");
      animate1.setAttribute("values", "20;35;20");
      animate1.setAttribute("dur", "2.5s");
      animate1.setAttribute("repeatCount", "indefinite");

      const animate2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "animate"
      );
      animate2.setAttribute("attributeName", "opacity");
      animate2.setAttribute("values", "0.5;0;0.5");
      animate2.setAttribute("dur", "2.5s");
      animate2.setAttribute("repeatCount", "indefinite");

      pulseRing.appendChild(animate1);
      pulseRing.appendChild(animate2);
      g.appendChild(pulseRing);
    }

    // Main marker circle
    const size = landmark.isPrimary ? 50 : 40;
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", coords.x);
    circle.setAttribute("cy", coords.y);
    circle.setAttribute("r", size / 2);
    circle.setAttribute("fill", "white");
    circle.setAttribute("stroke", landmark.color);
    circle.setAttribute("stroke-width", "3");
    circle.setAttribute("filter", "url(#markerShadow)");
    circle.classList.add("marker-circle");

    // Icon background
    const iconBg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    iconBg.setAttribute("cx", coords.x);
    iconBg.setAttribute("cy", coords.y);
    iconBg.setAttribute("r", size / 2 - 5);
    iconBg.setAttribute("fill", landmark.color);
    iconBg.setAttribute("opacity", "0.15");

    // Icon
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "text");
    icon.setAttribute("x", coords.x);
    icon.setAttribute("y", coords.y + 2);
    icon.setAttribute("text-anchor", "middle");
    icon.setAttribute("dominant-baseline", "middle");
    icon.setAttribute("font-size", landmark.isPrimary ? "22" : "18");
    icon.textContent = landmark.icon;
    icon.classList.add("marker-icon");

    // Label
    if (!this.options.isPreview) {
      const label = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      label.setAttribute("x", coords.x);
      label.setAttribute("y", coords.y + size + 15);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-family", "Lato, sans-serif");
      label.setAttribute("font-size", "13");
      label.setAttribute("font-weight", "600");
      label.setAttribute("fill", "#3a3530");
      label.textContent = landmark.name;
      label.classList.add("marker-label");
      g.appendChild(label);
    }

    g.appendChild(circle);
    g.appendChild(iconBg);
    g.appendChild(icon);

    this.addLandmarkEvents(g, landmark);

    return g;
  }

  addLandmarkEvents(element, landmark) {
    element.style.cursor = "pointer";

    element.addEventListener("mouseenter", (e) => {
      this.activeMarker = landmark.id;
      element.classList.add("active");

      // Highlight connection
      const connection = this.svg.querySelector(
        `[data-landmark="${landmark.id}"]`
      );
      if (connection) connection.classList.add("active");

      this.showTooltip(e, landmark);
    });

    element.addEventListener("mouseleave", () => {
      element.classList.remove("active");

      const connection = this.svg.querySelector(
        `[data-landmark="${landmark.id}"]`
      );
      if (connection) connection.classList.remove("active");

      this.hideTooltip();
    });

    element.addEventListener("mousemove", (e) => {
      if (this.tooltip) this.updateTooltipPosition(e);
    });

    element.addEventListener("click", (e) => {
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

    this.tooltip = document.createElement("div");
    this.tooltip.className = "map-tooltip-modern";

    const distance = landmark.calculatedDistance || "";
    const time = landmark.calculatedTime || "";
    const showDetails = landmark.id !== "6040-vista";

    this.tooltip.innerHTML = `
            <div class="tooltip-header">
                <span class="tooltip-icon">${landmark.icon}</span>
                <h4>${landmark.name}</h4>
            </div>
            ${
              showDetails
                ? `
                <div class="tooltip-info">
                    <div class="info-row">
                        <span class="info-label">📍 Distance:</span>
                        <span class="info-value">${distance}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">⏱️ Travel:</span>
                        <span class="info-value">${time}</span>
                    </div>
                </div>
            `
                : '<p class="tooltip-tagline">Your premium investment destination</p>'
            }
            <p class="tooltip-description">${landmark.description}</p>
            ${
              !this.options.isPreview
                ? '<p class="tooltip-cta">Click for directions →</p>'
                : ""
            }
        `;

    document.body.appendChild(this.tooltip);
    this.updateTooltipPosition(event);

    setTimeout(() => this.tooltip.classList.add("show"), 10);
  }

  updateTooltipPosition(event) {
    if (!this.tooltip) return;

    let x = event.clientX + 15;
    let y = event.clientY - 10;

    const rect = this.tooltip.getBoundingClientRect();

    if (x + rect.width > window.innerWidth - 20) {
      x = event.clientX - rect.width - 15;
    }

    if (y < 20) {
      y = event.clientY + 20;
    } else if (y + rect.height > window.innerHeight - 20) {
      y = window.innerHeight - rect.height - 20;
    }

    this.tooltip.style.left = x + "px";
    this.tooltip.style.top = y + "px";
  }

  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.classList.remove("show");
      setTimeout(() => {
        if (this.tooltip) this.tooltip.remove();
        this.tooltip = null;
      }, 200);
    }
  }

  showModal(landmark) {
    const distance = landmark.calculatedDistance || "";
    const time = landmark.calculatedTime || "";

    this.modal = document.createElement("div");
    this.modal.className = "landmark-modal";
    this.modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content-modern">
                <button class="modal-close" aria-label="Close">×</button>
                <div class="modal-header">
                    <span class="modal-icon">${landmark.icon}</span>
                    <h2>${landmark.name}</h2>
                </div>
                ${
                  landmark.id !== "6040-vista"
                    ? `
                    <div class="modal-stats">
                        <div class="stat-item">
                            <span class="stat-label">Distance</span>
                            <span class="stat-value">${distance}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Travel Time</span>
                            <span class="stat-value">${time}</span>
                        </div>
                    </div>
                `
                    : ""
                }
                <p class="modal-description">${landmark.details}</p>
                <div class="modal-actions">
                    <a href="${this.getDirectionsUrl(
                      landmark
                    )}" target="_blank" class="btn-modal-primary">
                        🗺️ Get Directions
                    </a>
                    <button class="btn-modal-secondary" onclick="this.closest('.landmark-modal').remove()">
                        Close
                    </button>
                </div>
            </div>
        `;

    document.body.appendChild(this.modal);
    setTimeout(() => this.modal.classList.add("show"), 10);

    const closeBtn = this.modal.querySelector(".modal-close");
    const overlay = this.modal.querySelector(".modal-overlay");

    closeBtn.addEventListener("click", () => this.closeModal());
    overlay.addEventListener("click", () => this.closeModal());

    document.addEventListener(
      "keydown",
      (this.handleEscape = (e) => {
        if (e.key === "Escape") this.closeModal();
      })
    );
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove("show");
      setTimeout(() => {
        if (this.modal) this.modal.remove();
        this.modal = null;
      }, 300);
      document.removeEventListener("keydown", this.handleEscape);
    }
  }

  openDirections(landmark) {
    window.open(this.getDirectionsUrl(landmark), "_blank");
  }

  getDirectionsUrl(landmark) {
    const origin = "6040 Vista, Gitere, Northern Bypass, Nairobi";
    const destination = `${landmark.name}, Nairobi, Kenya`;
    return `https://www.google.com/maps/dir/${encodeURIComponent(
      origin
    )}/${encodeURIComponent(destination)}`;
  }

  createLegend() {
    const legend = document.createElement("div");
    legend.className = "map-legend-modern";
    legend.innerHTML = `
            <h4>📍 Key Locations</h4>
            <div class="legend-grid">
                ${this.landmarks
                  .map(
                    (l) => `
                    <div class="legend-item-modern" data-landmark="${l.id}">
                        <span class="legend-icon-modern">${l.icon}</span>
                        <div class="legend-info">
                            <span class="legend-name">${l.name}</span>
                            ${
                              l.calculatedDistance
                                ? `<span class="legend-distance">${l.calculatedDistance}</span>`
                                : ""
                            }
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;

    this.container.appendChild(legend);

    // Add hover interaction
    legend.querySelectorAll(".legend-item-modern").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const landmarkId = item.dataset.landmark;
        const marker = this.svg.querySelector(`[data-id="${landmarkId}"]`);
        if (marker) marker.classList.add("active");

        const connection = this.svg.querySelector(
          `[data-landmark="${landmarkId}"]`
        );
        if (connection) connection.classList.add("active");
      });

      item.addEventListener("mouseleave", () => {
        const landmarkId = item.dataset.landmark;
        const marker = this.svg.querySelector(`[data-id="${landmarkId}"]`);
        if (marker) marker.classList.remove("active");

        const connection = this.svg.querySelector(
          `[data-landmark="${landmarkId}"]`
        );
        if (connection) connection.classList.remove("active");
      });
    });
  }

  setupEventListeners() {
    window.addEventListener("resize", () => {
      this.hideTooltip();
    });

    window.addEventListener("beforeunload", () => {
      this.hideTooltip();
      this.closeModal();
    });
  }
}

// Auto-initialize
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("locationInteractiveMap")) {
    window.locationMap = new InteractiveMap("locationInteractiveMap", {
      isPreview: false,
      showLegend: true,
      enableModal: true,
    });
  }

  if (document.getElementById("homeMapPreview")) {
    window.homeMap = new InteractiveMap("homeMapPreview", {
      isPreview: true,
      showLegend: false,
      enableModal: false,
      height: 450,
    });
  }
});