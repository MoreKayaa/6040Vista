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
        this.holdingPeriod.addEventListener('input', () => this.calculate());
        this.appreciationRate.addEventListener('input', () => this.calculate());
        
        // Initial calculation
        this.calculate();
    },
    
    // Calculate all values
    calculate() {
        const propertyValue = parseFloat(this.propertyValue.value);
        const monthlyRental = parseFloat(this.rentalRate.value);
        const years = parseInt(this.holdingPeriod.value);
        const appreciationRate = parseFloat(this.appreciationRate.value) / 100;
        
        // Calculate rental yield (annual rental income / property value * 100)
        const annualRental = monthlyRental * 12;
        const rentalYield = (annualRental / propertyValue) * 100;
        
        // Calculate total rental income over period
        const totalRental = annualRental * years;
        
        // Calculate future property value with compound appreciation
        const futureValue = propertyValue * Math.pow(1 + appreciationRate, years);
        
        // Calculate total ROI
        // Total gain = (Future Value - Initial Value) + Total Rental Income
        const totalGain = (futureValue - propertyValue) + totalRental;
        const totalROI = (totalGain / propertyValue) * 100;
        
        // Update display
        this.rentalYield.textContent = rentalYield.toFixed(1) + '%';
        this.totalRental.textContent = 'KSh ' + this.formatNumber(totalRental / 1000000, 1) + 'M';
        this.futureValue.textContent = 'KSh ' + this.formatNumber(futureValue / 1000000, 1) + 'M';
        this.totalROI.textContent = totalROI.toFixed(0) + '%';
    },
    
    // Format numbers with commas and decimals
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
const style = document.createElement('style');
style.textContent = `
    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }
`;
document.head.appendChild(style);

// ============================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Create button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
    `;
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    // Add styles
    const scrollTopStyles = document.createElement('style');
    scrollTopStyles.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--gold), var(--bronze));
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(201, 168, 105, 0.3);
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(201, 168, 105, 0.4);
        }
        
        .scroll-to-top svg {
            width: 24px;
            height: 24px;
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 1.5rem;
                right: 1.5rem;
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(scrollTopStyles);
    
    // Show/hide on scroll
    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 100));
    
    // Scroll to top on click
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

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
// CONSOLE MESSAGE
// ============================================

console.log('%c6040 Vista - Premium Real Estate Investment', 
    'color: #C9A869; font-size: 16px; font-weight: bold;');
console.log('%cWebsite developed by C.K. Marketing Limited', 
    'color: #8B6F3D; font-size: 12px;');