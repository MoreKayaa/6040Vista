/* ============================================
   6040 VISTA - MAIN JAVASCRIPT
   Parallax Effects, Navigation, ROI Calculator
   ============================================ */

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if device is mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// ============================================
// NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', debounce(handleNavbarScroll, 10));
    handleNavbarScroll(); // Initial check
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbar.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
        
        // Close menu when clicking nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', debounce(highlightNavLink, 100));
});

// ============================================
// PARALLAX EFFECTS (Desktop Only)
// ============================================

if (!isMobile()) {
    // Hero parallax
    const heroParallax = document.getElementById('parallaxBg');
    if (heroParallax) {
        window.addEventListener('scroll', debounce(function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroParallax.style.transform = `translate3d(0, ${rate}px, 0)`;
        }, 10));
    }
    
    // General parallax backgrounds
    const parallaxBgs = document.querySelectorAll('.parallax-bg-light, .parallax-bg-dark, .parallax-bg-gradient');
    
    window.addEventListener('scroll', debounce(function() {
        const scrolled = window.pageYOffset;
        
        parallaxBgs.forEach(bg => {
            const section = bg.closest('section');
            if (section) {
                const rect = section.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const sectionTop = section.offsetTop;
                    const offset = (scrolled - sectionTop) * 0.3;
                    bg.style.transform = `translate3d(0, ${offset}px, 0)`;
                }
            }
        });
    }, 10));
}

// ============================================
// ROI CALCULATOR
// ============================================

// const roiCalculator = {
//     // DOM elements
//     propertyValue: document.getElementById('propertyValue'),
//     rentalRate: document.getElementById('rentalRate'),
//     holdingPeriod: document.getElementById('holdingPeriod'),
//     appreciationRate: document.getElementById('appreciationRate'),
    
//     // Result elements
//     rentalYield: document.getElementById('rentalYield'),
//     totalRental: document.getElementById('totalRental'),
//     futureValue: document.getElementById('futureValue'),
//     totalROI: document.getElementById('totalROI'),
    
//     // Initialize calculator
//     init() {
//         if (!this.propertyValue) return; // Not on page with calculator
        
//         // Add event listeners
//         this.propertyValue.addEventListener('input', () => this.calculate());
//         this.rentalRate.addEventListener('input', () => this.calculate());
//         this.holdingPeriod.addEventListener('input', () => this.calculate());
//         this.appreciationRate.addEventListener('input', () => this.calculate());
        
//         // Initial calculation
//         this.calculate();
//     },
    
//     // Calculate all values
//     calculate() {
//         const propertyValue = parseFloat(this.propertyValue.value);
//         const monthlyRental = parseFloat(this.rentalRate.value);
//         const years = parseInt(this.holdingPeriod.value);
//         const appreciationRate = parseFloat(this.appreciationRate.value) / 100;
        
//         // Calculate rental yield (annual rental income / property value * 100)
//         const annualRental = monthlyRental * 12;
//         const rentalYield = (annualRental / propertyValue) * 100;
        
//         // Calculate total rental income over period
//         const totalRental = annualRental * years;
        
//         // Calculate future property value with compound appreciation
//         const futureValue = propertyValue * Math.pow(1 + appreciationRate, years);
        
//         // Calculate total ROI
//         // Total gain = (Future Value - Initial Value) + Total Rental Income
//         const totalGain = (futureValue - propertyValue) + totalRental;
//         const totalROI = (totalGain / propertyValue) * 100;
        
//         // Update display
//         this.rentalYield.textContent = rentalYield.toFixed(1) + '%';
//         this.totalRental.textContent = 'KSh ' + this.formatNumber(totalRental / 1000000, 1) + 'M';
//         this.futureValue.textContent = 'KSh ' + this.formatNumber(futureValue / 1000000, 1) + 'M';
//         this.totalROI.textContent = totalROI.toFixed(0) + '%';
//     },
    
//     // Format numbers with commas and decimals
//     formatNumber(num, decimals = 0) {
//         return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     }
// };

// // Initialize calculator when DOM is ready
// document.addEventListener('DOMContentLoaded', function() {
//     roiCalculator.init();
// });

// ============================================
// ROI CALCULATOR WITH DYNAMIC LABELS
// ============================================

const roiCalculator = {
    // DOM elements
    propertyValue: document.getElementById('propertyValue'),
    rentalRate: document.getElementById('rentalRate'),
    holdingPeriod: document.getElementById('holdingPeriod'),
    appreciationRate: document.getElementById('appreciationRate'),
    
    // Result elements
    rentalYield: document.getElementById('rentalYield'),
    totalRental: document.getElementById('totalRental'),
    futureValue: document.getElementById('futureValue'),
    totalROI: document.getElementById('totalROI'),
    
    // Initialize calculator
    init() {
        if (!this.propertyValue) return; // Not on page with calculator
        
        // Add event listeners
        this.propertyValue.addEventListener('input', () => this.calculate());
        this.rentalRate.addEventListener('input', () => this.calculate());
        this.holdingPeriod.addEventListener('input', () => this.updateLabelsAndCalculate());
        this.appreciationRate.addEventListener('input', () => this.calculate());
        
        // Initial calculation
        this.updateLabelsAndCalculate();
    },
    
    updateLabelsAndCalculate() {
        const years = parseInt(this.holdingPeriod.value) || 5;
        const yearText = years === 1 ? 'Year' : 'Years';
        
        // Find and update the labels
        const resultCards = document.querySelectorAll('.result-card h4');
        resultCards.forEach(label => {
            if (label.textContent.includes('Total Rental Income')) {
                label.textContent = `Total Rental Income (${years} ${yearText})`;
            }
            if (label.textContent.includes('Estimated Property Value')) {
                label.textContent = `Estimated Property Value (${years} ${yearText})`;
            }
        });
        
        this.calculate();
    },
    
    calculate() {
        const propertyValue = parseFloat(this.propertyValue.value) || 10000000;
        const monthlyRental = parseFloat(this.rentalRate.value) || 80000;
        const years = parseInt(this.holdingPeriod.value) || 5;
        const appreciationRate = parseFloat(this.appreciationRate.value) / 100 || 0.08;
        
        // Calculate rental yield
        const annualRental = monthlyRental * 12;
        const rentalYield = (annualRental / propertyValue) * 100;
        
        // Calculate total rental income over period
        const totalRental = annualRental * years;
        
        // Calculate future property value with compound appreciation
        const futureValue = propertyValue * Math.pow(1 + appreciationRate, years);
        
        // Calculate total ROI
        const totalGain = (futureValue - propertyValue) + totalRental;
        const totalROI = (totalGain / propertyValue) * 100;
        
        // Update display
        if (this.rentalYield) this.rentalYield.textContent = rentalYield.toFixed(1) + '%';
        if (this.totalRental) this.totalRental.textContent = 'KSh ' + this.formatNumber(totalRental / 1000000, 1) + 'M';
        if (this.futureValue) this.futureValue.textContent = 'KSh ' + this.formatNumber(futureValue / 1000000, 1) + 'M';
        if (this.totalROI) this.totalROI.textContent = totalROI.toFixed(0) + '%';
    },
    
    formatNumber(num, decimals = 0) {
        return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    roiCalculator.init();
});


// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and items
    const animatedElements = document.querySelectorAll('.overview-card, .unit-card, .amenity-item, .stat-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// IMAGE LAZY LOADING ENHANCEMENT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add fade-in effect
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    img.addEventListener('load', function() {
                        img.style.opacity = '1';
                    });
                    
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Disable animations/transitions during resize
let resizeTimer;
window.addEventListener('resize', function() {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Add CSS class for resize animation stopping
// const style = document.createElement('style');
// style.textContent = `
//     .resize-animation-stopper * {
//         animation: none !important;
// `;
// document.head.appendChild(style);

// ============================================
// FORM VALIDATION HELPERS (For other pages)
// ============================================

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation (Kenya format)
function isValidPhone(phone) {
    const re = /^(\+254|0)[17]\d{8}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Export validation functions for use in other pages
window.formValidation = {
    isValidEmail,
    isValidPhone
};

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    function handleScrollToTopVisibility() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', debounce(handleScrollToTopVisibility, 100));
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c6040 Vista - Premium Real Estate Investment', 
    'color: #C9A869; font-size: 16px; font-weight: bold;');
console.log('%cWebsite developed by C.K. Marketing Limited', 
    'color: #8B6F3D; font-size: 12px;');