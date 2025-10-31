/* ============================================
   6040 VISTA - NUMBER ANIMATIONS
   Odometer-style counting with Intersection Observer
   ============================================ */

class NumberAnimator {
    constructor() {
        this.animatedElements = new Set();
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupObserver());
        } else {
            this.setupObserver();
        }
    }
    
    setupObserver() {
        // Find all elements with data-animate-number attribute
        const elements = document.querySelectorAll('[data-animate-number]');
        
        if (elements.length === 0) return;
        
        // Create Intersection Observer
        const options = {
            threshold: 0.5, // Trigger when 50% visible
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateNumber(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, options);
        
        // Observe all number elements
        elements.forEach(element => observer.observe(element));
    }
    
    animateNumber(element) {
        const targetValue = parseFloat(element.getAttribute('data-animate-number'));
        const duration = parseInt(element.getAttribute('data-duration')) || 1000; // Default 1 second
        const decimals = this.getDecimalPlaces(targetValue);
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        
        // Odometer effect settings
        const fps = 60;
        const totalFrames = Math.round((duration / 1000) * fps);
        const increment = targetValue / totalFrames;
        
        let currentFrame = 0;
        let currentValue = 0;
        
        // Add odometer class for styling
        element.classList.add('number-animating');
        
        const animation = setInterval(() => {
            currentFrame++;
            currentValue += increment;
            
            // Apply easing function (ease-out)
            const progress = currentFrame / totalFrames;
            const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
            const displayValue = targetValue * easedProgress;
            
            // Format number with commas and decimals
            const formattedValue = this.formatNumber(displayValue, decimals);
            element.textContent = prefix + formattedValue + suffix;
            
            // Complete animation
            if (currentFrame >= totalFrames) {
                clearInterval(animation);
                element.textContent = prefix + this.formatNumber(targetValue, decimals) + suffix;
                element.classList.remove('number-animating');
                element.classList.add('number-animated');
            }
        }, 1000 / fps);
    }
    
    formatNumber(num, decimals) {
        // Round to specified decimal places
        const rounded = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
        
        // Split into integer and decimal parts
        const parts = rounded.toFixed(decimals).split('.');
        
        // Add commas to integer part
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        // Join parts
        return decimals > 0 ? parts.join('.') : parts[0];
    }
    
    getDecimalPlaces(num) {
        const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match) return 0;
        return Math.max(
            0,
            (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0)
        );
    }
}

// ROI Calculator Number Animation
class ROICalculatorAnimator {
    constructor() {
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupCalculator());
        } else {
            this.setupCalculator();
        }
    }
    
    setupCalculator() {
        // Find calculator result elements
        const resultElements = {
            rentalYield: document.getElementById('rentalYield'),
            totalRental: document.getElementById('totalRental'),
            futureValue: document.getElementById('futureValue'),
            totalROI: document.getElementById('totalROI')
        };
        
        // Check if elements exist
        if (!resultElements.rentalYield) return;
        
        // Find input elements
        const inputs = {
            propertyValue: document.getElementById('propertyValue'),
            rentalRate: document.getElementById('rentalRate'),
            holdingPeriod: document.getElementById('holdingPeriod'),
            appreciationRate: document.getElementById('appreciationRate')
        };
        
        // Initial calculation with animation
        setTimeout(() => {
            this.calculateAndAnimate(inputs, resultElements);
        }, 500);
        
        // Add event listeners to recalculate on input change
        Object.values(inputs).forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    this.calculateAndAnimate(inputs, resultElements);
                });
            }
        });
    }
    
    calculateAndAnimate(inputs, results) {
        const propertyValue = parseFloat(inputs.propertyValue.value);
        const monthlyRental = parseFloat(inputs.rentalRate.value);
        const years = parseInt(inputs.holdingPeriod.value);
        const appreciationRate = parseFloat(inputs.appreciationRate.value) / 100;
        
        // Calculate values
        const annualRental = monthlyRental * 12;
        const rentalYield = (annualRental / propertyValue) * 100;
        const totalRental = annualRental * years;
        const futureValue = propertyValue * Math.pow(1 + appreciationRate, years);
        const totalGain = (futureValue - propertyValue) + totalRental;
        const totalROI = (totalGain / propertyValue) * 100;
        
        // Animate each result
        this.animateValue(results.rentalYield, rentalYield, 1, '%');
        this.animateValue(results.totalRental, totalRental / 1000000, 1, 'KSh ', 'M');
        this.animateValue(results.futureValue, futureValue / 1000000, 1, 'KSh ', 'M');
        this.animateValue(results.totalROI, totalROI, 0, '', '%');
    }
    
    animateValue(element, targetValue, decimals, prefix = '', suffix = '') {
        const currentText = element.textContent.replace(/[^0-9.]/g, '');
        const currentValue = parseFloat(currentText) || 0;
        
        const duration = 600; // 0.6 seconds - fast
        const fps = 60;
        const totalFrames = Math.round((duration / 1000) * fps);
        const increment = (targetValue - currentValue) / totalFrames;
        
        let currentFrame = 0;
        let animValue = currentValue;
        
        const animation = setInterval(() => {
            currentFrame++;
            animValue += increment;
            
            // Ease-out
            const progress = currentFrame / totalFrames;
            const easedProgress = 1 - Math.pow(1 - progress, 2);
            const displayValue = currentValue + (targetValue - currentValue) * easedProgress;
            
            element.textContent = prefix + this.formatNumber(displayValue, decimals) + suffix;
            
            if (currentFrame >= totalFrames) {
                clearInterval(animation);
                element.textContent = prefix + this.formatNumber(targetValue, decimals) + suffix;
            }
        }, 1000 / fps);
    }
    
    formatNumber(num, decimals) {
        const rounded = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
        const parts = rounded.toFixed(decimals).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return decimals > 0 ? parts.join('.') : parts[0];
    }
}

// Initialize animators
const numberAnimator = new NumberAnimator();
const roiCalculatorAnimator = new ROICalculatorAnimator();

// Export for external use
window.NumberAnimator = NumberAnimator;
window.ROICalculatorAnimator = ROICalculatorAnimator;