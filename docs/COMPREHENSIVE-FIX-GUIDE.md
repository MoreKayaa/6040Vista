# 6040 Vista Website - Comprehensive Fix Guide

## Overview
This guide addresses all identified issues and provides complete solutions for your client meeting.

---

## ISSUE 1: Hero Section Background Images

### Problem
Hero sections lack translucent background images with renders

### Solution - Add to ALL pages
Add this CSS class and apply to hero sections:

```css
/* Hero Background Image Styles */
.hero-with-bg {
    position: relative;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.hero-with-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.25; /* Translucent effect */
    z-index: 0;
}

.hero-with-bg::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.7), rgba(201, 168, 105, 0.5));
    z-index: 1;
}

.hero-with-bg .container {
    position: relative;
    z-index: 2;
}
```

### Apply to Each Page:

**index.html**: Already has hero - just add `::before` for background
```html
<section class="hero parallax-section" style="background-image: url('images/High Oblique Aerial Render.webp');">
```

**about.html**:
```html
<section class="hero-with-bg" style="--bg-image: url('images/Vertical Aerial Render.webp');">
```

**units.html**:
```html
<section class="hero-with-bg" style="--bg-image: url('images/Street Render.webp');">
```

**amenities.html**:
```html
<section class="hero-with-bg" style="--bg-image: url('images/Vestibule Interior Render.webp');">
```

**location.html**:
```html
<section class="hero-with-bg" style="--bg-image: url('images/Low Oblique Aerial Render.webp');">
```

**gallery.html**:
```html
<section class="hero-with-bg" style="--bg-image: url('images/building-aerial.webp');">
```

**contact.html**:
```html
<section class="hero-with-bg" style="--bg-image: url('images/Kitchen Interior Render.webp');">
```

**inquiry.html**:
```html
<section class="hero-with-bg" style="--bg-image: url('images/Living Room Interior Render.webp');">
```

---

## ISSUE 2: Image Loading Optimization

### Problem
Using `loading="eager"` causes performance issues

### Solution
1. **Change ALL images to lazy loading** EXCEPT:
   - Logo
   - Hero section background (first 1-2 images above fold)
   - First carousel slide image

```html
<!-- WRONG -->
<img src="images/example.webp" loading="eager">

<!-- CORRECT -->
<img src="images/example.webp" loading="lazy" alt="Description">
```

### Gallery.html Specific Fixes:

**Image 1 Issue**: `High Obligue Aerial Render.webp` - Typo in filename
```html
<!-- WRONG -->
<img src="images/High Obligue Aerial Render.webp" alt="..." loading="eager">

<!-- CORRECT -->
<img src="images/High Oblique Aerial Render.webp" alt="..." loading="lazy">
```

**Image 2 Issue**: `building-aerial.webp` - May not exist
```html
<!-- Replace with: -->
<img src="images/Low Oblique Aerial Render.webp" alt="Building Aerial View" loading="lazy">
```

---

## ISSUE 3: WhatsApp CTA Integration

### Problem
Forms lack WhatsApp option and data pre-fill

### Solution - Add WhatsApp Integration Script

Create: `js/whatsapp-integration.js`

```javascript
/* ============================================
   WHATSAPP CTA INTEGRATION
   Allows form submission OR WhatsApp messaging
   ============================================ */

class WhatsAppIntegration {
    constructor() {
        this.phoneNumber = '+254745118118'; // 6040 Vista Sales
        this.init();
    }
    
    init() {
        this.addWhatsAppButtons();
        this.enhanceForms();
    }
    
    // Add WhatsApp buttons to all CTA sections
    addWhatsAppButtons() {
        const ctaSections = document.querySelectorAll('.cta-buttons, .hero-cta');
        
        ctaSections.forEach(section => {
            const whatsappBtn = document.createElement('a');
            whatsappBtn.href = this.generateWhatsAppLink('Hi, I am interested in 6040 Vista investment opportunity. I would like more information.');
            whatsappBtn.className = 'btn-whatsapp';
            whatsappBtn.target = '_blank';
            whatsappBtn.rel = 'noopener noreferrer';
            whatsappBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.882 11.882 0 005.713 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
            `;
            
            // Insert before last child or append
            if (section.lastElementChild) {
                section.insertBefore(whatsappBtn, section.lastElementChild.nextSibling);
            } else {
                section.appendChild(whatsappBtn);
            }
        });
    }
    
    // Enhance forms with WhatsApp option
    enhanceForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Add WhatsApp button below submit button
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (!submitBtn) return;
            
            const whatsappOption = document.createElement('div');
            whatsappOption.className = 'form-whatsapp-option';
            whatsappOption.innerHTML = `
                <div style="text-align: center; margin: 1.5rem 0;">
                    <p style="color: var(--text-secondary); margin-bottom: 0.75rem;">OR</p>
                    <button type="button" class="btn-whatsapp-form">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.882 11.882 0 005.713 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Send Inquiry via WhatsApp
                    </button>
                    <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.5rem;">Fill form above, then click to send via WhatsApp</p>
                </div>
            `;
            
            submitBtn.parentNode.insertBefore(whatsappOption, submitBtn.nextSibling);
            
            // Add click handler
            const whatsappBtn = whatsappOption.querySelector('.btn-whatsapp-form');
            whatsappBtn.addEventListener('click', () => this.sendFormDataViaWhatsApp(form));
        });
    }
    
    // Generate WhatsApp link
    generateWhatsAppLink(message) {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${this.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    }
    
    // Send form data via WhatsApp
    sendFormDataViaWhatsApp(form) {
        const formData = new FormData(form);
        let message = '*6040 Vista Investment Inquiry*\n\n';
        
        // Build message from form fields
        for (let [key, value] of formData.entries()) {
            if (value.trim()) {
                // Format field name (capitalize, remove underscores)
                const fieldName = key.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                message += `*${fieldName}:* ${value}\n`;
            }
        }
        
        message += `\n_Sent from 6040 Vista website_`;
        
        // Open WhatsApp
        window.open(this.generateWhatsAppLink(message), '_blank');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new WhatsAppIntegration();
});
```

**Add WhatsApp Button Styles to CSS:**

```css
/* WhatsApp Integration Styles */
.btn-whatsapp,
.btn-whatsapp-form {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: #25D366;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

.btn-whatsapp:hover,
.btn-whatsapp-form:hover {
    background: #1ebe57;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(37, 211, 102, 0.3);
}

.btn-whatsapp svg,
.btn-whatsapp-form svg {
    margin-right: 0.5rem;
}

.btn-whatsapp-form {
    width: 100%;
    max-width: 400px;
}

/* WhatsApp Floating Button (Optional) */
.whatsapp-float {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    background: #25D366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    transition: all 0.3s ease;
    text-decoration: none;
}

.whatsapp-float:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
}

.whatsapp-float svg {
    width: 32px;
    height: 32px;
    fill: white;
}
```

---

## ISSUE 4: Office Hours Update

### Problem
Incorrect office hours displayed

### Solution - Update in ALL pages

**Find and Replace:**
```html
<!-- OLD -->
<p>Monday - Saturday: 9:00 AM - 6:00 PM</p>

<!-- NEW -->
<p>Monday - Friday: 9:30 AM - 5:00 PM<br>
Saturday: By Appointment Only</p>
```

**Update contact.html and footer sections:**

```html
<div class="contact-info-item">
    <h4>Office Hours</h4>
    <p><strong>Monday - Friday:</strong> 9:30 AM - 5:00 PM</p>
    <p><strong>Saturday:</strong> By Appointment Only</p>
    <p><strong>Sunday & Public Holidays:</strong> Closed</p>
    <p style="margin-top: 0.75rem; font-size: 0.9rem; color: var(--text-secondary);">
        <em>Site visits available during business hours and by special appointment</em>
    </p>
</div>
```

---

## ISSUE 5: Carousel Styling Fixes

### Problem
Carousel has styling issues and poor mobile responsiveness

### Solution - Updated carousel.css

Add to `css/styles.css`:

```css
/* ============================================
   CAROUSEL - FIXED VERSION
   ============================================ */

.carousel-container {
    position: relative;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 0;
    overflow: hidden;
}

.carousel-wrapper {
    perspective: 2000px;
    overflow: visible;
}

.carousel-track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    gap: 2rem;
    padding: 2rem 0;
}

.carousel-slide {
    flex: 0 0 calc(33.333% - 1.5rem); /* 3 cards on desktop */
    background: var(--white);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    transition: all 0.4s ease;
    transform-style: preserve-3d;
    backface-visibility: hidden;
}

.carousel-slide:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.carousel-slide-image {
    width: 100%;
    height: 280px;
    overflow: hidden;
    position: relative;
}

.carousel-slide-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.carousel-slide:hover .carousel-slide-image img {
    transform: scale(1.05);
}

.carousel-slide-content {
    padding: 2rem;
}

.carousel-slide-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    color: var(--bronze);
    margin-bottom: 0.5rem;
}

.carousel-slide-size {
    font-size: 1.125rem;
    color: var(--gold);
    font-weight: 600;
    margin-bottom: 1rem;
}

.carousel-slide-features {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
}

.carousel-slide-features li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: var(--text-secondary);
    font-size: 0.95rem;
}

.carousel-slide-features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--gold);
    font-weight: bold;
}

/* Carousel Controls */
.carousel-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 3rem;
}

.carousel-arrow {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--bronze);
    border: none;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    flex-shrink: 0;
}

.carousel-arrow:hover {
    background: var(--gold);
    transform: scale(1.1);
}

.carousel-arrow::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-top: 3px solid white;
    border-right: 3px solid white;
    top: 50%;
    left: 50%;
}

.carousel-prev::after {
    transform: translate(-30%, -50%) rotate(-135deg);
}

.carousel-next::after {
    transform: translate(-70%, -50%) rotate(45deg);
}

.carousel-dots {
    display: flex;
    gap: 0.75rem;
    align-items: center;
}

.carousel-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--sand);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
}

.carousel-dot.active {
    background: var(--bronze);
    transform: scale(1.3);
}

/* MOBILE RESPONSIVENESS - FIXED */
@media (max-width: 1024px) {
    .carousel-slide {
        flex: 0 0 calc(50% - 1rem); /* 2 cards on tablet */
    }
    
    .carousel-slide-image {
        height: 240px;
    }
    
    .carousel-slide-content {
        padding: 1.5rem;
    }
    
    .carousel-slide-title {
        font-size: 1.5rem;
    }
}

@media (max-width: 768px) {
    .carousel-container {
        padding: 1rem 0;
    }
    
    .carousel-track {
        flex-direction: column;
        gap: 1.5rem;
        padding: 1rem 0;
    }
    
    .carousel-slide {
        flex: 0 0 100%; /* 1 card stacked vertically on mobile */
        max-width: 500px;
        margin: 0 auto;
    }
    
    .carousel-slide-image {
        height: 220px;
    }
    
    .carousel-controls {
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .carousel-arrow {
        width: 44px;
        height: 44px;
    }
    
    .carousel-dot {
        width: 10px;
        height: 10px;
    }
    
    /* Hide grab cursor on mobile */
    .carousel-track {
        cursor: default !important;
    }
}

@media (max-width: 480px) {
    .carousel-slide-content {
        padding: 1.25rem;
    }
    
    .carousel-slide-title {
        font-size: 1.35rem;
    }
    
    .carousel-slide-size {
        font-size: 1rem;
    }
    
    .carousel-slide-features li {
        font-size: 0.875rem;
    }
}
```

---

## ISSUE 6: Interactive Map Visual Improvements

### Problem
Map not visually appealing

### Solution - Enhanced Map Styles

Add to `css/styles.css`:

```css
/* ============================================
   INTERACTIVE MAP - ENHANCED VISUALS
   ============================================ */

#locationInteractiveMap,
#homeMapPreview {
    width: 100%;
    max-width: 900px;
    margin: 2rem auto;
    background: linear-gradient(135deg, #f8f6f3 0%, #e8dcc4 100%);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    border: 3px solid var(--gold);
}

.map-svg-container {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
}

.map-svg-container svg {
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.07));
}

/* Map Landmarks - Enhanced */
.map-landmark {
    cursor: pointer;
    transition: all 0.3s ease;
}

.map-landmark circle {
    transition: all 0.3s ease;
}

.map-landmark:hover circle {
    r: 14;
    fill: var(--bronze);
    stroke-width: 4;
    filter: drop-shadow(0 0 8px rgba(201, 168, 105, 0.6));
}

.map-landmark text {
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    font-size: 13px;
    pointer-events: none;
}

/* Map Tooltip - Enhanced */
.map-tooltip {
    position: absolute;
    background: linear-gradient(135deg, var(--bronze), var(--gold));
    color: white;
    padding: 0.875rem 1.25rem;
    border-radius: 12px;
    font-size: 0.9rem;
    pointer-events: none;
    z-index: 1000;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    transform: translateY(-10px);
    opacity: 0;
    transition: all 0.3s ease;
    font-weight: 500;
    white-space: nowrap;
}

.map-tooltip::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid var(--gold);
}

.map-tooltip.show {
    opacity: 1;
    transform: translateY(0);
}

/* Map Legend - Enhanced */
.map-legend {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-top: 1.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border: 2px solid var(--beige);
}

.map-legend h4 {
    color: var(--bronze);
    margin-bottom: 1rem;
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
}

.legend-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: pointer;
}

.legend-item:hover {
    background: var(--cream);
    transform: translateX(4px);
}

.legend-color {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.legend-label {
    font-size: 0.9rem;
    color: var(--text-primary);
    font-weight: 500;
}

/* Map Modal - Enhanced */
.landmark-info-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(8px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 1rem;
}

.landmark-info-modal.show {
    display: flex;
}

.modal-content {
    background: white;
    border-radius: 20px;
    max-width: 500px;
    width: 100%;
    padding: 2.5rem;
    position: relative;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-30px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--cream);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--bronze);
    transition: all 0.2s ease;
}

.modal-close:hover {
    background: var(--bronze);
    color: white;
    transform: rotate(90deg);
}

.modal-content h3 {
    color: var(--bronze);
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    margin-bottom: 1rem;
}

.modal-content p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.modal-directions-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--bronze);
    color: white;
    padding: 0.875rem 1.75rem;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.modal-directions-btn:hover {
    background: var(--gold);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(201, 168, 105, 0.3);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
    #locationInteractiveMap,
    #homeMapPreview {
        padding: 1.25rem;
    }
    
    .map-legend {
        padding: 1.25rem;
    }
    
    .legend-items {
        grid-template-columns: 1fr;
    }
    
    .modal-content {
        padding: 2rem;
        margin: 1rem;
    }
}
```

---

## ISSUE 7: Amenities Page Enhancement

### Problem
Amenities page is dull with only emojis

### Solution - Create Interactive Amenities Cards

Replace amenities section HTML:

```html
<!-- Amenities - Enhanced Interactive Version -->
<section style="padding: 80px 0; background: var(--white);">
    <div class="container">
        <div class="amenities-interactive-grid">
            
            <!-- Swimming Pool -->
            <div class="amenity-card-interactive">
                <div class="amenity-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="amenity-icon-svg">
                        <path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM231.9 340.5c-13.7 11.9-25.3 17.5-42.4 17.5c-8.1 0-15.6-.9-22.5-2.6l14.2-32.6c3 .5 4.9 .6 8.4 .6c8.9 0 15.9-2 24.8-9.2c0 0 20.2-16.8 27.7-23.4l-17.7-30.5l-30.8 50.5c-45.8-19.9-33.9-75.9 14.3-79.5l16.6-30.6l-18.2-12.6l-66.8 85.8l-22.4 53.1C64.5 316.4 32 288.9 32 256c0-123.7 100.3-224 224-224s224 100.3 224 224s-100.3 224-224 224c-50.4 0-97-16.8-134.4-45.1l89.4-84.2l-28.8-22.3l-46.1 60.3 75.3-141.6l43.2-23.5l-25.3-41.5l-37.2 16.5L222 268.2l-18.5 31.7c18.5-13.3 35.3-22.8 50.4-27.2l30.2-52l22.9-15.8l-30.1-48.5l-33.2 40.4-11.6 19.7-18.5-31.7 15.6-32.2-33.4-17.1l-22.6 50.1c-58.9 11.6-85.4 72-50.6 112.1l-6.4 13l14.8 24.8l27.8-38.8l-6.9 40.3l38.9 27.5l42-87.2 10.3 17.7c-6.4 5.8-12.4 10.8-23.6 20.6z"/>
                    </svg>
                </div>
                <div class="amenity-content">
                    <h3>Sparkling Swimming Pool</h3>
                    <p>Resort-style pool with lounging area. Perfect for families and significantly increases property desirability.</p>
                    <div class="amenity-stats">
                        <span class="stat-badge">Family Friendly</span>
                        <span class="stat-badge">Resort Style</span>
                    </div>
                </div>
                <div class="amenity-hover-effect"></div>
            </div>

            <!-- Fitness Centre -->
            <div class="amenity-card-interactive">
                <div class="amenity-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="amenity-icon-svg">
                        <path fill="currentColor" d="M112 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32V224v64V416c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32h48V96zm416 0v32h48c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H528v32c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z"/>
                    </svg>
                </div>
                <div class="amenity-content">
                    <h3>Modern Fitness Centre</h3>
                    <p>Fully equipped gym with cardio and strength training equipment. High-value amenity for professional tenants.</p>
                    <div class="amenity-stats">
                        <span class="stat-badge">24/7 Access</span>
                        <span class="stat-badge">Premium Equipment</span>
                    </div>
                </div>
                <div class="amenity-hover-effect"></div>
            </div>

            <!-- Secure Parking -->
            <div class="amenity-card-interactive">
                <div class="amenity-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="amenity-icon-svg">
                        <path fill="currentColor" d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm288 32c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z"/>
                    </svg>
                </div>
                <div class="amenity-content">
                    <h3>Secure Stilt Parking</h3>
                    <p>Ground-floor covered parking with CCTV surveillance. Essential for premium rental rates and tenant security.</p>
                    <div class="amenity-stats">
                        <span class="stat-badge">CCTV Monitored</span>
                        <span class="stat-badge">Covered</span>
                    </div>
                </div>
                <div class="amenity-hover-effect"></div>
            </div>

            <!-- Kids Play Area -->
            <div class="amenity-card-interactive">
                <div class="amenity-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="amenity-icon-svg">
                        <path fill="currentColor" d="M160 0a64 64 0 1 1 0 128A64 64 0 1 1 160 0zM88 480V400H70.2c-10.9 0-18.6-10.7-15.2-21.1L93.3 248.1 59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l53.6-89.2c20.3-33.7 56.7-54.3 96-54.3h11.6c39.3 0 75.7 20.6 96 54.3l53.6 89.2c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9l-33.9-56.3L265 378.9c3.5 10.4-4.3 21.1-15.2 21.1H232v80c0 17.7-14.3 32-32 32s-32-14.3-32-32V400H152v80c0 17.7-14.3 32-32 32s-32-14.3-32-32zM480 0a64 64 0 1 1 0 128A64 64 0 1 1 480 0zm-8 384V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V384H376c-22.1 0-40-17.9-40-40V264c0-53 43-96 96-96s96 43 96 96v80c0 22.1-17.9 40-40 40H472z"/>
                    </svg>
                </div>
                <div class="amenity-content">
                    <h3>Kids Play Area</h3>
                    <p>Safe, supervised play zone for children. Attracts family tenants who pay consistently and stay longer.</p>
                    <div class="amenity-stats">
                        <span class="stat-badge">Safe & Supervised</span>
                        <span class="stat-badge">Family Appeal</span>
                    </div>
                </div>
                <div class="amenity-hover-effect"></div>
            </div>

            <!-- Green Spaces -->
            <div class="amenity-card-interactive">
                <div class="amenity-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="amenity-icon-svg">
                        <path fill="currentColor" d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"/>
                    </svg>
                </div>
                <div class="amenity-content">
                    <h3>Lush Green Spaces</h3>
                    <p>Landscaped gardens with serene walking paths. Creates a premium living environment that commands higher rents.</p>
                    <div class="amenity-stats">
                        <span class="stat-badge">Landscaped</span>
                        <span class="stat-badge">Walking Paths</span>
                    </div>
                </div>
                <div class="amenity-hover-effect"></div>
            </div>

            <!-- CCTV Security -->
            <div class="amenity-card-interactive">
                <div class="amenity-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="amenity-icon-svg">
                        <path fill="currentColor" d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/>
                    </svg>
                </div>
                <div class="amenity-content">
                    <h3>24/7 CCTV Security</h3>
                    <p>Comprehensive surveillance system covering all common areas. Critical for tenant safety and peace of mind.</p>
                    <div class="amenity-stats">
                        <span class="stat-badge">24/7 Monitoring</span>
                        <span class="stat-badge">Full Coverage</span>
                    </div>
                </div>
                <div class="amenity-hover-effect"></div>
            </div>

            <!-- Lift Access -->
            <div class="amenity-card-interactive">
                <div class="amenity-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="amenity-icon-svg">
                        <path fill="currentColor" d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM384 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l310.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM128 64A32 32 0 1 1 128 128 32 32 0 1 1 128 64zm73.3 0C213.6 35.7 241.8 16 274.6 16c32.8 0 61 19.7 73.3 48L480 64c17.7 0 32 14.3 32 32s-14.3 32-32 32L347.9 128c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 128C14.3 128 0 113.7 0 96S14.3 64 32 64l169.3 0zM242.6 96a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                    </svg>
                </div>
                <div class="amenity-content">
                    <h3>Lift Access</h3>
                    <p>Elevator service to all floors. Ensures accessibility and convenience for residents and visitors.</p>
                    <div class="amenity-stats">
                        <span class="stat-badge">All Floors</span>
                        <span class="stat-badge">Accessible</span>
                    </div>
                </div>
                <div class="amenity-hover-effect"></div>
            </div>

            <!-- Karura Forest Views -->
            <div class="amenity-card-interactive">
                <div class="amenity-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="amenity-icon-svg">
                        <path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                    </svg>
                </div>
                <div class="amenity-content">
                    <h3>Karura Forest Views</h3>
                    <p>Select units overlook Karura Forest nature reserve. Rare urban amenity that commands premium pricing.</p>
                    <div class="amenity-stats">
                        <span class="stat-badge">Premium Views</span>
                        <span class="stat-badge">Nature Reserve</span>
                    </div>
                </div>
                <div class="amenity-hover-effect"></div>
            </div>

        </div>
    </div>
</section>
```

**Add Amenities Interactive Styles:**

```css
/* ============================================
   AMENITIES - INTERACTIVE CARDS
   ============================================ */

.amenities-interactive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    padding: 2rem 0;
}

.amenity-card-interactive {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid transparent;
}

.amenity-card-interactive:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(201, 168, 105, 0.25);
    border-color: var(--gold);
}

.amenity-icon-wrapper {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, var(--cream), var(--beige));
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    transition: all 0.4s ease;
}

.amenity-card-interactive:hover .amenity-icon-wrapper {
    background: linear-gradient(135deg, var(--gold), var(--bronze));
    transform: scale(1.1) rotate(5deg);
}

.amenity-icon-svg {
    width: 36px;
    height: 36px;
    color: var(--bronze);
    transition: all 0.4s ease;
}

.amenity-card-interactive:hover .amenity-icon-svg {
    color: white;
    transform: scale(1.1);
}

.amenity-content h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: var(--bronze);
    margin-bottom: 0.75rem;
    transition: color 0.3s ease;
}

.amenity-card-interactive:hover .amenity-content h3 {
    color: var(--gold);
}

.amenity-content p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.25rem;
    font-size: 0.95rem;
}

.amenity-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.stat-badge {
    display: inline-block;
    padding: 0.375rem 0.875rem;
    background: var(--cream);
    color: var(--bronze);
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    transition: all 0.3s ease;
}

.amenity-card-interactive:hover .stat-badge {
    background: var(--gold);
    color: white;
}

.amenity-hover-effect {
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(201, 168, 105, 0.1) 0%, transparent 70%);
    transform: scale(0);
    transition: transform 0.6s ease;
    pointer-events: none;
}

.amenity-card-interactive:hover .amenity-hover-effect {
    transform: scale(1);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
    .amenities-interactive-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .amenity-card-interactive {
        padding: 1.5rem;
    }
    
    .amenity-icon-wrapper {
        width: 60px;
        height: 60px;
    }
    
    .amenity-icon-svg {
        width: 30px;
        height: 30px;
    }
    
    .amenity-content h3 {
        font-size: 1.25rem;
    }
}
```

---

## ISSUE 8: SEO & Schema Markup

### Problem
Missing comprehensive SEO and schema markup on all pages

### Solution - Complete SEO Template

Create: `seo-templates.html` for reference

```html
<!-- ============================================
     SEO & SCHEMA TEMPLATE FOR ALL PAGES
     Copy relevant sections to each HTML page
     ============================================ -->

<!-- FOR INDEX.HTML (Homepage) -->
<head>
    <!-- Primary Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>6040 Vista - Prime Real Estate Investment | Northern Bypass, Nairobi</title>
    <meta name="title" content="6040 Vista - Prime Real Estate Investment | Northern Bypass, Nairobi">
    <meta name="description" content="Invest in 6040 Vista - premium 2 & 3 bedroom apartments in Gitere, Northern Bypass, Nairobi. 8-12% rental yield, 15 min to Westlands. Phase 1 early pricing available.">
    <meta name="keywords" content="Nairobi real estate investment, Northern Bypass apartments, Gitere property, 6040 Vista, Kenya real estate, Westlands apartments, rental income property, capital appreciation Nairobi">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://6040vista.com/">
    <meta property="og:title" content="6040 Vista - Prime Real Estate Investment Northern Bypass">
    <meta property="og:description" content="Premium apartments in Nairobi's fastest-growing corridor. 8-12% rental yield guaranteed.">
    <meta property="og:image" content="https://6040vista.com/images/High Oblique Aerial Render.webp">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://6040vista.com/">
    <meta property="twitter:title" content="6040 Vista - Prime Real Estate Investment Northern Bypass">
    <meta property="twitter:description" content="Premium apartments in Nairobi's fastest-growing corridor. 8-12% rental yield guaranteed.">
    <meta property="twitter:image" content="https://6040vista.com/images/High Oblique Aerial Render.webp">
    
    <!-- Canonical Link -->
    <link rel="canonical" href="https://6040vista.com/">
    
    <!-- Structured Data - Real Estate Development -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "RealEstateDevelopment",
        "name": "6040 Vista",
        "description": "Premium residential development in Gitere, Northern Bypass, Nairobi offering 2 & 3 bedroom apartments with exceptional investment potential.",
        "url": "https://6040vista.com",
        "logo": "https://6040vista.com/images/6040V.png",
        "image": "https://6040vista.com/images/High Oblique Aerial Render.webp",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Gitere",
            "addressLocality": "Northern Bypass",
            "addressRegion": "Nairobi",
            "addressCountry": "Kenya"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-1.2159",
            "longitude": "36.8389"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+254-745-118-118",
            "contactType": "Sales",
            "email": "vista6040sales@gmail.com",
            "availableLanguage": ["English", "Swahili"]
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:30",
            "closes": "17:00"
        },
        "priceRange": "KSh 10,000,000 - KSh 20,000,000",
        "numberOfRooms": "2-3 Bedrooms",
        "floorSize": {
            "@type": "QuantitativeValue",
            "value": "101-149",
            "unitCode": "MTK"
        },
        "amenityFeature": [
            {
                "@type": "LocationFeatureSpecification",
                "name": "Swimming Pool",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Fitness Center",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Parking",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Security",
                "value": "24/7 CCTV"
            }
        ],
        "sameAs": [
            "https://facebook.com/6040vista",
            "https://instagram.com/6040vista",
            "https://linkedin.com/company/6040vista"
        ]
    }
    </script>
    
    <!-- Structured Data - Organization -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "6040 Vista",
        "url": "https://6040vista.com",
        "logo": "https://6040vista.com/images/6040V.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+254-745-118-118",
            "contactType": "customer service",
            "email": "vista6040sales@gmail.com",
            "areaServed": "KE",
            "availableLanguage": ["en", "sw"]
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Nairobi",
            "addressRegion": "Nairobi County",
            "addressCountry": "Kenya"
        }
    }
    </script>
</head>

<!-- FOR ABOUT.HTML -->
<head>
    <title>About 6040 Vista | Premium Real Estate Development Northern Bypass</title>
    <meta name="description" content="Discover 6040 Vista - prime residential development in Gitere offering exceptional investment returns, modern living, and strategic location advantages.">
    <meta name="keywords" content="6040 Vista about, Northern Bypass development, Gitere apartments, Nairobi real estate developer">
    <link rel="canonical" href="https://6040vista.com/about.html">
    
    <meta property="og:title" content="About 6040 Vista | Premium Development">
    <meta property="og:description" content="Prime residential development offering modern living and exceptional investment returns.">
    <meta property="og:url" content="https://6040vista.com/about.html">
    <meta property="og:image" content="https://6040vista.com/images/Vertical Aerial Render.webp">
</head>

<!-- FOR UNITS.HTML -->
<head>
    <title>Unit Types | 2 & 3 Bedroom Apartments - 6040 Vista</title>
    <meta name="description" content="Explore 6040 Vista unit types: 2BR A (101m²), 2BR B (101m²), 3BR (135m²), 3BR+DSQ (149m²). Premium finishes, modern layouts, high rental yields.">
    <meta name="keywords" content="6040 Vista units, 2 bedroom apartments Nairobi, 3 bedroom apartments Northern Bypass, apartments with DSQ, floor plans Gitere">
    <link rel="canonical" href="https://6040vista.com/units.html">
    
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": "https://6040vista.com/units.html#2bed-a",
        "name": "2 Bedroom Unit Type A",
        "description": "Modern 2 bedroom apartment with en-suite master, open-plan kitchen, and private balcony.",
        "image": "https://6040vista.com/images/2bed-a.webp",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "KES",
            "price": "10000000",
            "availability": "https://schema.org/InStock"
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "Floor Area",
                "value": "101",
                "unitCode": "MTK"
            },
            {
                "@type": "PropertyValue",
                "name": "Number of Rooms",
                "value": "2"
            }
        ]
    }
    </script>
</head>

<!-- FOR LOCATION.HTML -->
<head>
    <title>Location | 6040 Vista Northern Bypass, Gitere, Nairobi</title>
    <meta name="description" content="6040 Vista strategic location: 100M to Northern Bypass, 15 min to Westlands, 2 min walk to Windsor Golf Club. Prime connectivity to Nairobi's key business districts.">
    <meta name="keywords" content="6040 Vista location, Northern Bypass Nairobi, Gitere location, Westlands proximity, Karura Forest apartments, Two Rivers Mall apartments">
    <link rel="canonical" href="https://6040vista.com/location.html">
    
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": "6040 Vista",
        "description": "Strategic location in Gitere, Northern Bypass with exceptional connectivity to Nairobi's major business and leisure destinations.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Gitere",
            "addressLocality": "Northern Bypass",
            "addressRegion": "Nairobi",
            "addressCountry": "Kenya"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-1.2159",
            "longitude": "36.8389"
        },
        "hasMap": "https://6040vista.com/location.html#map"
    }
    </script>
</head>

<!-- FOR AMENITIES.HTML -->
<head>
    <title>Amenities | World-Class Features - 6040 Vista</title>
    <meta name="description" content="6040 Vista premium amenities: Swimming pool, modern gym, secure parking, kids play area, 24/7 CCTV security, lift access, lush gardens. Luxury living in Nairobi.">
    <meta name="keywords" content="6040 Vista amenities, luxury apartments Nairobi, swimming pool apartments, gym facilities, secure parking Nairobi">
    <link rel="canonical" href="https://6040vista.com/amenities.html">
</head>

<!-- FOR GALLERY.HTML -->
<head>
    <title>Gallery | Visual Tour of 6040 Vista Development</title>
    <meta name="description" content="Explore 6040 Vista through stunning architectural renders and interior designs. View aerial perspectives, unit layouts, and premium finishes.">
    <meta name="keywords" content="6040 Vista gallery, Nairobi apartments photos, interior designs, architectural renders, property visualization">
    <link rel="canonical" href="https://6040vista.com/gallery.html">
    
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "6040 Vista Visual Gallery",
        "description": "Architectural renders and interior designs showcasing 6040 Vista development",
        "image": [
            "https://6040vista.com/images/High Oblique Aerial Render.webp",
            "https://6040vista.com/images/Living Room Interior Render.webp",
            "https://6040vista.com/images/Kitchen Interior Render.webp"
        ]
    }
    </script>
</head>

<!-- FOR CONTACT.HTML -->
<head>
    <title>Contact Us | Schedule Viewing - 6040 Vista</title>
    <meta name="description" content="Contact 6040 Vista sales team. Call +254 745 118 118 | Email: vista6040sales@gmail.com | Office hours: Mon-Fri 9:30-17:00, Sat by appointment.">
    <meta name="keywords" content="6040 Vista contact, schedule viewing, Nairobi property inquiries, investment consultation">
    <link rel="canonical" href="https://6040vista.com/contact.html">
    
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact 6040 Vista",
        "description": "Get in touch with our sales team to schedule a viewing or request investment information",
        "mainEntity": {
            "@type": "Organization",
            "name": "6040 Vista",
            "telephone": "+254-745-118-118",
            "email": "vista6040sales@gmail.com",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nairobi",
                "addressCountry": "Kenya"
            }
        }
    }
    </script>
</head>

<!-- FOR INQUIRY.HTML -->
<head>
    <title>Investment Inquiry | Submit Your Interest - 6040 Vista</title>
    <meta name="description" content="Submit your 6040 Vista investment inquiry. Connect with our sales team for personalized consultation, payment plans, and ROI projections.">
    <meta name="keywords" content="6040 Vista inquiry, investment form, Nairobi property investment, payment plans, ROI calculator">
    <link rel="canonical" href="https://6040vista.com/inquiry.html">
</head>
```

**Add robots.txt to root:**

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://6040vista.com/sitemap.xml
```

**Create sitemap.xml:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://6040vista.com/</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://6040vista.com/about.html</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://6040vista.com/units.html</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://6040vista.com/amenities.html</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://6040vista.com/location.html</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://6040vista.com/gallery.html</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://6040vista.com/contact.html</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://6040vista.com/inquiry.html</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>
```

---

## PRIORITY CHECKLIST FOR MEETING

### ✅ CRITICAL (Must Fix):
1. Gallery.html - Fix typo: "High Obligue" → "High Oblique"
2. Gallery.html - Replace "building-aerial.webp" with existing image
3. All pages - Change `loading="eager"` to `loading="lazy"` (except hero images)
4. Contact page & footer - Update office hours
5. Add WhatsApp integration (js/whatsapp-integration.js + CSS)
6. Fix carousel mobile responsiveness (updated CSS)

### ⚡ HIGH (Should Fix):
7. Add hero background images to all pages
8. Enhance amenities page with interactive cards
9. Improve interactive map styling
10. Add SEO meta tags to all pages

### 🎯 NICE TO HAVE (Time Permitting):
11. Add schema markup to all pages
12. Create sitemap.xml
13. Add WhatsApp floating button
14. Test all animations

---

## TESTING CHECKLIST

### Desktop:
- [ ] All hero images load correctly
- [ ] Carousel displays 3 cards properly
- [ ] Carousel auto-plays every 5 seconds
- [ ] WhatsApp buttons functional
- [ ] Interactive map clickable
- [ ] Amenities cards interactive
- [ ] Forms work correctly

### Mobile:
- [ ] Hero images display well
- [ ] Carousel stacks vertically (1 card)
- [ ] Touch swipe works on carousel
- [ ] WhatsApp buttons visible
- [ ] Map responsive
- [ ] Amenities cards stack properly
- [ ] No horizontal scrolling

### Performance:
- [ ] Lazy loading working
- [ ] Page load < 2 seconds
- [ ] No console errors
- [ ] Images optimized

---

## DEPLOYMENT NOTES

1. **Before deploying**, test locally
2. **Update** all image paths if hosting changes
3. **Verify** WhatsApp phone number is correct
4. **Check** office hours are updated everywhere
5. **Test** on actual mobile device, not just browser

---

## ESTIMATED TIME TO COMPLETE

- **Critical fixes**: 15-20 minutes
- **High priority**: 25-30 minutes
- **Nice to have**: 20-25 minutes
- **Total**: 60-75 minutes

---

## SUPPORT

If you encounter issues during implementation:

1. **Check browser console** for errors (F12)
2. **Verify file paths** are correct
3. **Clear cache** and hard reload (Ctrl+Shift+R)
4. **Test on incognito mode** to rule out caching issues

Good luck with your client meeting! 🚀
