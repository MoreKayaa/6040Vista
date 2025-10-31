# 6040 VISTA WEBSITE - ENHANCEMENT IMPLEMENTATION GUIDE

**Created:** October 25, 2025  
**For Meeting:** Tomorrow Afternoon  
**Status:** Ready to Implement  

---

## ✅ FILES CREATED (Ready to Use)

### New JavaScript Files
1. **`js/carousel.js`** ✅ - 3D flip carousel with auto-play
2. **`js/number-animations.js`** ✅ - Odometer-style number counting
3. **`js/loader.js`** ✅ - Branded 6040 Vista loader

### Updated CSS
4. **`css/styles.css`** ✅ - Added carousel, loader, and animation styles (appended to existing file)

---

## 🚀 IMPLEMENTATION STEPS

### STEP 1: Update index.html (Add Scripts)

**Location:** Before closing `</body>` tag in `index.html`

**FIND THIS:**
```html
    <script src="js/main.js"></script>
</body>
</html>
```

**REPLACE WITH:**
```html
    <!-- Loader (must load first) -->
    <script src="js/loader.js"></script>
    
    <!-- Number Animations -->
    <script src="js/number-animations.js"></script>
    
    <!-- Carousel -->
    <script src="js/carousel.js"></script>
    
    <!-- Main JavaScript -->
    <script src="js/main.js"></script>
</body>
</html>
```

---

### STEP 2: Replace Featured Units Section in index.html

**Location:** Find the `<!-- Featured Units -->` section (around line 180)

**FIND THIS ENTIRE SECTION:**
```html
<!-- Featured Units -->
<section class="featured-units parallax-section" id="featuredUnits">
    <!-- Existing units grid code -->
</section>
```

**REPLACE WITH:**
```html
<!-- Featured Units - 3D Flip Carousel -->
<section class="featured-units parallax-section" id="featuredUnits">
    <div class="parallax-bg-light"></div>
    <div class="container">
        <div class="section-header">
            <span class="section-tag">Unit Types</span>
            <h2>Investment Options Tailored to Your Goals</h2>
            <p>Choose from our carefully designed 2 & 3 bedroom units, each optimized for modern living and maximum investment returns</p>
        </div>
        
        <!-- Carousel Container -->
        <div class="carousel-container" id="unitsCarousel">
            <div class="carousel-wrapper">
                <div class="carousel-track">
                    
                    <!-- Slide 1: 2 Bedroom A -->
                    <div class="carousel-slide">
                        <div class="carousel-slide-image">
                            <img src="images/Living Room Interior Render.webp" alt="2 Bedroom Unit A" loading="lazy">
                        </div>
                        <div class="carousel-slide-content">
                            <h3 class="carousel-slide-title">2 Bedroom A</h3>
                            <div class="carousel-slide-size">101 m²</div>
                            <ul class="carousel-slide-features">
                                <li>Master bedroom with en-suite</li>
                                <li>Modern open-plan kitchen</li>
                                <li>Bright living & dining area</li>
                                <li>Family bathroom</li>
                                <li>Private balcony</li>
                            </ul>
                            <p style="margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 0.95rem;">Perfect entry-level investment with strong rental demand from young professionals.</p>
                            <a href="units.html#unit-2br-a" class="btn-primary" style="width: 100%;">View Details →</a>
                        </div>
                    </div>
                    
                    <!-- Slide 2: 2 Bedroom B -->
                    <div class="carousel-slide">
                        <div class="carousel-slide-image">
                            <img src="images/Kitchen Interior Render.webp" alt="2 Bedroom Unit B" loading="lazy">
                        </div>
                        <div class="carousel-slide-content">
                            <h3 class="carousel-slide-title">2 Bedroom B</h3>
                            <div class="carousel-slide-size">101 m²</div>
                            <ul class="carousel-slide-features">
                                <li>Alternative floor plan layout</li>
                                <li>Two generous bedrooms</li>
                                <li>Contemporary kitchen design</li>
                                <li>Living & dining space</li>
                                <li>Modern bathroom</li>
                            </ul>
                            <p style="margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 0.95rem;">Unique layout appeals to diverse tenants, offering variety in your portfolio.</p>
                            <a href="units.html#unit-2br-b" class="btn-primary" style="width: 100%;">View Details →</a>
                        </div>
                    </div>
                    
                    <!-- Slide 3: 3 Bedroom -->
                    <div class="carousel-slide">
                        <div class="carousel-slide-image">
                            <img src="images/Bedroom Interior Render.webp" alt="3 Bedroom Unit" loading="lazy">
                        </div>
                        <div class="carousel-slide-content">
                            <h3 class="carousel-slide-title">3 Bedroom</h3>
                            <div class="carousel-slide-size">135 m²</div>
                            <ul class="carousel-slide-features">
                                <li>Master bedroom with en-suite</li>
                                <li>Two additional bedrooms</li>
                                <li>Premium kitchen with storage</li>
                                <li>Generous living & dining</li>
                                <li>Large balcony</li>
                            </ul>
                            <p style="margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 0.95rem;">High demand from growing families. Premium rental rates and long-term value.</p>
                            <a href="units.html#unit-3br" class="btn-primary" style="width: 100%;">View Details →</a>
                        </div>
                    </div>
                    
                    <!-- Slide 4: 3 Bedroom + DSQ (Featured) -->
                    <div class="carousel-slide" style="border: 3px solid var(--gold);">
                        <div style="position: absolute; top: 1rem; right: 1rem; background: var(--gold); color: var(--white); padding: 0.5rem 1rem; border-radius: 20px; font-weight: 700; z-index: 10; font-size: 0.875rem;">Most Popular</div>
                        <div class="carousel-slide-image">
                            <img src="images/Bathroom Interior Render.webp" alt="3 Bedroom + DSQ" loading="lazy">
                        </div>
                        <div class="carousel-slide-content">
                            <h3 class="carousel-slide-title">3 Bedroom + DSQ</h3>
                            <div class="carousel-slide-size">149 m²</div>
                            <ul class="carousel-slide-features">
                                <li>Spacious master with luxury en-suite</li>
                                <li>Two additional large bedrooms</li>
                                <li>Domestic Staff Quarters (DSQ)</li>
                                <li>Designer kitchen</li>
                                <li>Oversized balcony</li>
                            </ul>
                            <p style="margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 0.95rem;"><strong>Top-tier rental income.</strong> DSQ attracts affluent tenants. Best ROI in development.</p>
                            <a href="units.html#unit-3br-dsq" class="btn-primary" style="width: 100%; background: var(--bronze);">View Details →</a>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <!-- Carousel Controls -->
            <div class="carousel-controls">
                <button class="carousel-arrow carousel-prev" aria-label="Previous slide">‹</button>
                <div class="carousel-dots"></div>
                <button class="carousel-arrow carousel-next" aria-label="Next slide">›</button>
            </div>
        </div>
        
    </div>
</section>
```

---

### STEP 3: Add Number Animation Attributes

**Location:** Throughout index.html

**UPDATE THESE ELEMENTS:**

#### Hero Statistics (around line 80)
**FIND:**
```html
<div class="stat-item">
    <h3>100M</h3>
    <p>To Northern Bypass</p>
</div>
```

**REPLACE WITH:**
```html
<div class="stat-item">
    <h3><span data-animate-number="100" data-suffix="M" data-duration="1000">100M</span></h3>
    <p>To Northern Bypass</p>
</div>
<div class="stat-item">
    <h3><span data-animate-number="15" data-suffix=" Min" data-duration="1000">15 Min</span></h3>
    <p>To Westlands & GCM</p>
</div>
<div class="stat-item">
    <h3><span data-animate-number="2" data-suffix=" Min" data-duration="1000">2 Min</span></h3>
    <p>To Windsor Golf Club</p>
</div>
```

#### ROI Calculator Results (around line 250)
**The calculator results already have IDs, so number-animations.js will automatically animate them - NO CHANGES NEEDED!**

#### Investment Value Stats (around line 400)
**FIND:**
```html
<div class="value-number">8-12%</div>
```

**REPLACE WITH:**
```html
<div class="value-number"><span data-animate-number="8" data-suffix="%" data-duration="800">8</span>-<span data-animate-number="12" data-suffix="%" data-duration="800">12</span>%</div>
```

---

### STEP 4: Update Background Images

**Location:** Various sections in index.html

#### Update Hero Background (around line 65)
**FIND:**
```html
<div class="parallax-bg" id="parallaxBg"></div>
```

**REPLACE WITH:**
```html
<div class="parallax-bg" id="parallaxBg" style="background-image: url('images/High Oblique Aerial Render.webp');"></div>
```

#### Update Amenities Background (around line 320)
**FIND:**
```html
<div class="parallax-bg-dark"></div>
```

**REPLACE WITH:**
```html
<div class="parallax-bg-dark" style="background-image: url('images/Vestibule Interior Render.webp'); opacity: 0.3;"></div>
```

#### Add About Page Background to about.html
**Location:** about.html hero section

**FIND:**
```html
<section class="about-hero">
```

**REPLACE WITH:**
```html
<section class="about-hero" style="background-image: linear-gradient(rgba(245, 241, 232, 0.9), rgba(232, 220, 196, 0.9)), url('images/Vertical Aerial Render.webp'); background-size: cover; background-position: center;">
```

---

### STEP 5: Add Favicon Integration

**Location:** In `<head>` section of ALL HTML files

**ADD AFTER** `<title>` tag:
```html
<!-- Favicons -->
<link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
```

**YOU NEED TO CREATE THESE FAVICON FILES:**
1. Use the logo image: `images/Site Picture.webp`
2. Convert to PNG format
3. Resize to: 16x16px, 32x32px, 180x180px
4. Name them as above

**Quick Favicon Generator:**
- Use https://realfavicongenerator.net/
- Upload `Site Picture.webp`
- Download generated files
- Place in `images/` folder

---

## 📱 MOBILE OPTIMIZATION ADDED

The carousel automatically:
- Stacks vertically on mobile (no carousel behavior)
- Shows 1 card at a time on phones
- Shows 2 cards on tablets
- Shows 3 cards on desktop

Number animations:
- Trigger on scroll (Intersection Observer)
- Work on all devices
- Respect reduced-motion preferences

---

## 🎯 TESTING CHECKLIST

After implementing changes:

### Desktop Testing
- [ ] Loader appears with logo animation
- [ ] Loader completes smoothly
- [ ] Carousel shows 3 cards
- [ ] Carousel auto-plays every 5 seconds
- [ ] Cards flip horizontally when navigating
- [ ] Hover shows scale effect
- [ ] Cursor changes to grab/grabbing
- [ ] Numbers count up when scrolling to sections
- [ ] ROI calculator numbers animate on input change
- [ ] Background images display correctly

### Mobile Testing (Resize browser to < 768px)
- [ ] Loader works on mobile
- [ ] Carousel stacks vertically
- [ ] No carousel controls visible
- [ ] Cards are full width
- [ ] Numbers still animate on scroll
- [ ] No horizontal scroll
- [ ] Touch swipe disabled (vertical scroll only)
- [ ] Fewer images load (performance)

### Performance Testing
- [ ] Loader completes in < 3 seconds
- [ ] Carousel animations are smooth (60fps)
- [ ] No layout shift when loading
- [ ] Images load progressively
- [ ] No console errors (F12)

---

## 🔧 TROUBLESHOOTING

### Issue: Carousel Not Working
**Solution:**
1. Check browser console for errors (F12)
2. Verify all 4 script files are loading:
   - loader.js
   - number-animations.js
   - carousel.js
   - main.js
3. Ensure carousel HTML structure matches exactly
4. Clear browser cache (Ctrl+Shift+R)

### Issue: Numbers Not Animating
**Solution:**
1. Check `data-animate-number` attributes are correct
2. Verify number-animations.js is loaded
3. Scroll to section slowly to trigger Intersection Observer
4. Check console for JavaScript errors

### Issue: Loader Stuck
**Solution:**
1. Check loader.js is first script
2. Verify Site Picture.webp exists in images folder
3. Check browser console for image load errors
4. Fallback: Loader force-completes after 5 seconds

### Issue: Images Not Loading
**Solution:**
1. Verify exact filenames match (case-sensitive):
   - `High Oblique Aerial Render.webp`
   - `Living Room Interior Render.webp`
   - `Kitchen Interior Render.webp`
   - `Bedroom Interior Render.webp`
   - `Bathroom Interior Render.webp`
   - `Vestibule Interior Render.webp`
   - `Vertical Aerial Render.webp`
2. Check images/ folder structure
3. Test individual image URLs in browser

---

## 🎨 CUSTOMIZATION OPTIONS

### Change Carousel Speed
**File:** `js/carousel.js` (line 21)
```javascript
autoplayDelay: 5000, // Change to 3000 for 3 seconds, 7000 for 7 seconds
```

### Change Number Animation Speed
**File:** `js/number-animations.js` (line 51)
```javascript
const duration = parseInt(element.getAttribute('data-duration')) || 1000;
// Or add data-duration="500" for 0.5 seconds to HTML
```

### Change Loader Duration
**File:** `js/loader.js` (line 67)
```javascript
this.loadingProgress += Math.random() * 15; // Increase 15 to speed up, decrease to slow down
```

---

## 📦 FILE STRUCTURE SUMMARY

```
6040vista-website/
├── index.html                          (UPDATE: Add scripts, carousel HTML, number attributes)
├── about.html                          (UPDATE: Add hero background image)
├── css/
│   └── styles.css                      (✅ UPDATED: Carousel & loader styles added)
├── js/
│   ├── main.js                         (✅ KEEP AS IS)
│   ├── carousel.js                     (✅ NEW: 3D flip carousel)
│   ├── number-animations.js            (✅ NEW: Odometer counting)
│   └── loader.js                       (✅ NEW: Branded loader)
└── images/
    ├── Site Picture.webp               (✅ EXISTS: Used for loader)
    ├── High Oblique Aerial Render.webp (✅ EXISTS: Hero background)
    ├── Living Room Interior Render.webp(✅ EXISTS: Carousel card 1)
    ├── Kitchen Interior Render.webp    (✅ EXISTS: Carousel card 2)
    ├── Bedroom Interior Render.webp    (✅ EXISTS: Carousel card 3)
    ├── Bathroom Interior Render.webp   (✅ EXISTS: Carousel card 4)
    ├── Vestibule Interior Render.webp  (✅ EXISTS: Amenities background)
    ├── Vertical Aerial Render.webp     (✅ EXISTS: About page background)
    ├── favicon-16x16.png               (⏳ TO CREATE)
    ├── favicon-32x32.png               (⏳ TO CREATE)
    └── apple-touch-icon.png            (⏳ TO CREATE)
```

---

## ⚡ QUICK START (5 Minutes)

1. **Backup current index.html**
   ```bash
   cp index.html index-original.html
   ```

2. **Update index.html** - Follow STEP 1, 2, 3, 4

3. **Update about.html** - Follow STEP 4 (about section)

4. **Add favicons to all HTML** - Follow STEP 5

5. **Test locally**
   ```bash
   # Open with Live Server in VS Code
   # Or open index.html in browser
   ```

6. **Test features:**
   - Loader appears and completes
   - Carousel auto-plays and flips
   - Numbers animate on scroll
   - ROI calculator animates on input

7. **Deploy to GitHub Pages** (if needed)

---

## 🚀 READY FOR MEETING

After implementing:
- ✅ Branded loader with progress
- ✅ 3D flip carousel (5-second auto-play)
- ✅ Number animations (odometer style)
- ✅ Enhanced background images
- ✅ Mobile responsive (carousel stacks)
- ✅ Custom cursor effects
- ✅ Performance optimized

**Estimated Implementation Time:** 15-20 minutes

---

**Questions?** Check troubleshooting section or test one section at a time.

**Good luck with tomorrow's presentation!** 🎯