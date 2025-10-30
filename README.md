# 6040 Vista Website - Complete Package

## 📋 Project Overview

Professional real estate investment website for **6040 Vista** - a premium residential development in Gitere, Northern Bypass, Nairobi. This is a complete, production-ready website designed for tomorrow's client meeting demonstration.

### Key Features
- ✅ Investment-focused messaging throughout
- ✅ Heavy parallax scrolling (desktop only - disabled on mobile for performance)
- ✅ Warm neutral color palette with gold accents
- ✅ Interactive ROI calculator
- ✅ Comprehensive inquiry form for investors
- ✅ < 2 second load time (optimized with WebP images and lazy loading)
- ✅ Fully responsive design
- ✅ GitHub Pages ready
- ✅ Easy cPanel migration path

---

## 🗂️ Project Structure

```
6040vista-website/
│
├── index.html              # Homepage (hero, overview, units preview, ROI calculator)
├── about.html              # About page (vision, mission, timeline)
├── units.html              # Unit types with floor plans
├── amenities.html          # Amenities and features
├── location.html           # Location map and neighborhood
├── gallery.html            # Image gallery
├── contact.html            # Contact form
├── inquiry.html            # Investment inquiry form
│
├── css/
│   └── styles.css          # Complete stylesheet (warm colors, parallax, responsive)
│
├── js/
│   └── main.js             # All interactivity (parallax, calculator, navigation)
│
├── images/                 # Image assets (to be added)
│   ├── hero-bg.webp
│   ├── 2bed-a.webp
│   ├── 2bed-b.webp
│   ├── 3bed.webp
│   ├── 3bed-dsq.webp
│   ├── location-map.webp
│   ├── building-aerial.webp
│   └── [other images]
│
└── README.md               # This file
```

---

## 🎨 Design Specifications

### Color Palette (Extracted from Interior Renders)

**Primary Colors:**
- Cream: `#F5F1E8` - Primary background
- Beige: `#E8DCC4` - Secondary background
- Sand: `#D4C4A8` - Tertiary backgrounds
- Taupe: `#B8A58F` - Borders and subtle accents
- Warm Gray: `#8B7E6A` - Text accents

**Accent Colors:**
- Gold: `#C9A869` - Primary buttons, highlights
- Bronze: `#A37F4E` - Secondary buttons, links
- Deep Gold: `#8B6F3D` - Hover states

**Text Colors:**
- Charcoal: `#3A3530` - Primary text
- Dark Brown: `#2A2420` - Headings
- Text Secondary: `#6B5F4F` - Body copy

### Typography
- **Headings:** Playfair Display (serif) - Elegant, professional
- **Body:** Lato (sans-serif) - Clean, readable
- Loaded from Google Fonts for optimal performance

### Performance Optimizations
- **Image Format:** WebP with lazy loading
- **Parallax:** Heavy on desktop, completely disabled on mobile
- **Animations:** Subtle transitions, hardware-accelerated where possible
- **Load Time:** Target < 2 seconds

---

## 🚀 Deployment Guide

### Option 1: GitHub Pages (Recommended for Demo)

#### Prerequisites
- Windows PC (as specified)
- Visual Studio Code (or any code editor)
- Git installed ([Download](https://git-scm.com/download/win))
- GitHub account ([Sign up](https://github.com/signup))

#### Step-by-Step Instructions

**1. Prepare Your Images**

Before deploying, you need to add the 13 images provided by the client:

```
images/
├── hero-bg.webp               # Use aerial render or street view
├── 2bed-a.webp                # Interior render (bedroom or living room)
├── 2bed-b.webp                # Interior render (kitchen or bathroom)
├── 3bed.webp                  # Interior render (vestibule or foyer)
├── 3bed-dsq.webp              # Interior render (best quality image)
├── location-map.webp          # Create or use placeholder
├── building-aerial.webp       # Aerial render (low or high oblique)
├── amenities-bg.webp          # Use balcony view or aerial
├── [additional images]        # Gallery images from provided files
```

**How to Convert to WebP:**
- Use online converter: https://cloudconvert.com/jpg-to-webp
- Or use local tool: https://developers.google.com/speed/webp/download
- Recommended quality: 80-85% for balance between quality and file size

**2. Local Preview (Before Pushing to GitHub)**

```bash
# Open VS Code in the project folder
cd path\to\6040vista-website
code .

# Install "Live Server" extension in VS Code
# Right-click index.html → "Open with Live Server"
# Website opens at http://localhost:5500
```

Test everything locally:
- ✅ All pages load correctly
- ✅ Navigation works
- ✅ Images display properly
- ✅ ROI calculator functions
- ✅ Mobile responsive design
- ✅ Parallax effects (desktop only)

**3. Create GitHub Repository**

```bash
# Initialize git in project folder
cd path\to\6040vista-website
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: 6040 Vista website v1.0"

# Create repository on GitHub
# Go to https://github.com/new
# Repository name: 6040vista-website
# Public repository
# Do NOT initialize with README (we already have one)

# Link local to GitHub (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/6040vista-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**4. Enable GitHub Pages**

1. Go to repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 2-3 minutes for deployment
6. Your site will be live at: `https://YOUR-USERNAME.github.io/6040vista-website/`

**5. Share with Client**

- Copy the GitHub Pages URL
- Test thoroughly before sharing
- Ensure all images load correctly
- Check mobile responsiveness

---

### Option 2: cPanel Hosting (Production - After Client Approval)

#### Prerequisites
- cPanel hosting account with domain
- FileZilla or cPanel File Manager access
- SMTP email account for contact forms

#### Step-by-Step Instructions

**1. Prepare Files for Upload**

- Ensure all images are in `images/` folder
- Verify all paths are relative (not absolute)
- Test locally one final time

**2. Upload via cPanel File Manager**

1. Login to cPanel: `https://yourdomain.com/cpanel`
2. Click **File Manager**
3. Navigate to `public_html/` (or your domain's root folder)
4. Click **Upload** button
5. Drag and drop all files:
   - `index.html`, `about.html`, etc.
   - `css/` folder
   - `js/` folder
   - `images/` folder
6. Wait for upload to complete

**OR Upload via FileZilla:**

1. Open FileZilla
2. Connect to your hosting:
   - Host: `yourdomain.com` or IP address
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21 (or 22 for SFTP)
3. Drag all local files to `/public_html/` on server

**3. Test Website**

- Visit `https://yourdomain.com`
- Check all pages load
- Verify images display
- Test contact forms (will need backend setup - see below)

**4. Setup Contact Form Backend (PHP + SMTP)**

Your contact forms currently show placeholders. To make them functional:

**A. Create PHP Handler (`contact-handler.php`):**

```php
<?php
// Email configuration
$to = "vista6040sales@gmail.com";
$subject = "New Contact from 6040 Vista Website";

// Get form data
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$phone = htmlspecialchars($_POST['phone']);
$message = htmlspecialchars($_POST['message']);

// Compose email
$email_body = "New contact form submission:\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Phone: $phone\n";
$email_body .= "Message:\n$message\n";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

// Send email
if (mail($to, $subject, $email_body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Thank you! We will contact you soon.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error sending message. Please try again.']);
}
?>
```

**B. Update Contact Form HTML:**

In `contact.html` and `inquiry.html`, add this JavaScript before `</body>`:

```javascript
<script>
document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const response = await fetch('contact-handler.php', {
        method: 'POST',
        body: formData
    });
    
    const result = await response.json();
    alert(result.message);
    
    if (result.success) {
        this.reset();
    }
});
</script>
```

**C. Configure SMTP in cPanel:**

1. Go to **Email Accounts** in cPanel
2. Create email: `noreply@yourdomain.com`
3. Use this for automated responses
4. For advanced email (attachments, templates), integrate PHPMailer library

**5. Setup SSL Certificate (HTTPS)**

1. In cPanel, go to **SSL/TLS Status**
2. Click **Run AutoSSL**
3. Wait for automatic Let's Encrypt SSL installation
4. Your site will be accessible via `https://`

---

## 🧪 Testing Checklist

### Before Tomorrow's Meeting

- [ ] **Homepage**
  - [ ] Hero section displays with parallax (desktop)
  - [ ] ROI calculator works correctly
  - [ ] All buttons link to correct pages
  - [ ] Stats display properly

- [ ] **All Pages**
  - [ ] Navigation highlights active page
  - [ ] Footer displays correctly
  - [ ] Images load (or placeholders visible)
  - [ ] Mobile menu works on phone

- [ ] **Mobile Testing**
  - [ ] No horizontal scrolling
  - [ ] Text is readable (not too small)
  - [ ] Buttons are tappable
  - [ ] Parallax is disabled (smooth scrolling)

- [ ] **Performance**
  - [ ] Pages load in < 2 seconds
  - [ ] No console errors (press F12 in browser)
  - [ ] Smooth animations

---

## 📝 Content Notes

### Missing Content (To Be Added After Meeting)

1. **Images:** 13 provided images need to be converted to WebP and placed in `images/` folder
2. **Floor Plans:** Embed PDF or create image gallery from Floor Plans.pdf
3. **Exact Pricing:** Investment inquiry form ready, but specific unit pricing not included (client decision)
4. **Social Media Links:** Footer has placeholders - update with actual Facebook/Instagram/LinkedIn URLs
5. **Virtual Tour:** Not included (not available yet per requirements)

### Content Updates Needed

**If Client Wants Changes:**
1. **Text:** Edit directly in HTML files
2. **Colors:** Modify CSS variables in `css/styles.css` (lines 10-50)
3. **Images:** Replace files in `images/` folder (keep same filenames)
4. **ROI Calculator Defaults:** Edit `js/main.js` (lines 150-160)

---

## 🔧 Troubleshooting

### Common Issues and Solutions

**Problem:** Images not displaying
- **Solution:** Check that images are in `images/` folder and filenames match HTML
- Use relative paths: `images/hero-bg.webp` (not `/images/...` or `C:\...`)

**Problem:** Parallax not working on mobile
- **Solution:** This is intentional! Parallax is disabled on mobile for performance

**Problem:** ROI calculator shows NaN or incorrect values
- **Solution:** Check that input fields have valid numbers, refresh page

**Problem:** Contact form doesn't send
- **Solution:** Forms need PHP backend (see cPanel setup above). On GitHub Pages, forms are placeholders only

**Problem:** Website loads slowly
- **Solution:** 
  - Compress images further (target < 200KB per image)
  - Check internet connection
  - Test on different device

**Problem:** Mobile menu doesn't close
- **Solution:** Click outside menu area, or refresh page

---

## 📞 Support

### For Website Technical Issues
**Developer:** C.K. Marketing Limited  
**Contact:** xiaoyouzi0911@gmail.com | +254 759 681 867

### For Content/Business Inquiries
**Sales Manager:** Ren Yuan  
**Email:** vista6040sales@gmail.com  
**Phone:** +254 745 118 118

---

## 📅 Meeting Preparation (Tomorrow Afternoon)

### What to Demonstrate

1. **Homepage (5 minutes)**
   - Scroll through hero section
   - Show property overview cards
   - Demo ROI calculator (change values, show calculations)
   - Preview unit cards

2. **Unit Types Page (5 minutes)**
   - Show all 4 unit types with sizes
   - Explain floor plan integration (when PDFs added)

3. **Location Page (3 minutes)**
   - Highlight strategic position
   - Show proximity to amenities

4. **Investment Inquiry Form (3 minutes)**
   - Walk through investor-focused fields
   - Explain backend integration (for cPanel later)

5. **Mobile Demonstration (4 minutes)**
   - Open on phone/tablet
   - Show responsive navigation
   - Scroll through homepage

### Questions to Ask Client

1. Do you have specific unit pricing to add?
2. Should we add financing partner information (NBK mentioned in notes)?
3. Do you want payment plan details on website?
4. Any content changes for homepage hero text?
5. Preferred timeline for cPanel migration?

---

## 🎯 Next Steps After Client Approval

1. **Immediate (Same Day as Meeting):**
   - [ ] Incorporate any client feedback
   - [ ] Add actual images (client will provide or use from 13 files)
   - [ ] Finalize homepage hero text

2. **Within 1 Week:**
   - [ ] Deploy to cPanel with client's domain
   - [ ] Setup contact form PHP backend
   - [ ] Configure SMTP for automated emails
   - [ ] Add Google Analytics tracking

3. **Within 2 Weeks:**
   - [ ] Add blog section (per additional services LOE)
   - [ ] Integrate social media feeds
   - [ ] Setup Google Search Console
   - [ ] Implement LLM optimization (llms.txt)

4. **Ongoing:**
   - [ ] Monthly blog posts (per KSh 20k/month service)
   - [ ] Social media management (per KSh 25k/month service)
   - [ ] Construction progress photos (per KSh 15k shoot service)

---

## 📜 License & Credits

**Website Developed by:** C.K. Marketing Limited  
**Client:** 6040 Vista Development  
**Version:** 1.0 (October 2025)  
**Framework:** Custom HTML/CSS/JS (No dependencies)

**Fonts:** Google Fonts (Playfair Display, Lato)  
**Icons:** Inline SVG (no external icon library required)

---

## 💡 Tips for Success

1. **Test Early:** Preview locally before GitHub deployment
2. **Image Quality:** Balance between quality and file size (80-85% WebP compression)
3. **Mobile First:** Most visitors will view on phones - test thoroughly
4. **Performance:** Monitor load times - aim for < 2 seconds consistently
5. **Content Updates:** Keep messaging focused on investment value, not just "buy a home"
6. **Social Proof:** Add testimonials from Phase 1 investors (when available)
7. **Lead Capture:** Monitor inquiry form submissions closely - fast response = higher conversion

---

**END OF README**

For additional questions or custom modifications, contact the development team at C.K. Marketing Limited.