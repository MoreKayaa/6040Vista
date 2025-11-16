/**
 * Location Page Number Animations
 * Count-up animation for location proximity statistics
 * Numbers: 100M, 15min, 12min, 8min, 2min
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Number animation function with easing
    function animateNumber(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        const range = end - start;
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (range * easeOut));
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = end + suffix;
                element.setAttribute('data-animated', 'true');
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Set up Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const highlightObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const icon = card.querySelector('.highlight-icon');
                
                if (icon && !icon.getAttribute('data-animated')) {
                    const number = parseInt(icon.getAttribute('data-number'));
                    const suffix = icon.getAttribute('data-suffix') || '';
                    const duration = parseInt(icon.getAttribute('data-duration')) || 2000;
                    
                    // Create number display element
                    const numberElement = document.createElement('span');
                    numberElement.style.cssText = 'font-size: 1.5rem; font-weight: 700; color: white; font-family: var(--font-heading);';
                    icon.textContent = '';
                    icon.appendChild(numberElement);
                    
                    // Animate the number
                    animateNumber(numberElement, 0, number, duration, suffix);
                    
                    // Add pulse animation
                    icon.style.animation = 'pulse 0.5s ease';
                }
                
                highlightObserver.unobserve(card);
            }
        });
    }, observerOptions);
    
    // Observe all highlight cards
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach(card => {
        highlightObserver.observe(card);
    });
    
    // Fallback: If Intersection Observer not supported, animate immediately
    if (!('IntersectionObserver' in window)) {
        highlightCards.forEach(card => {
            const icon = card.querySelector('.highlight-icon');
            if (icon) {
                const number = parseInt(icon.getAttribute('data-number'));
                const suffix = icon.getAttribute('data-suffix') || '';
                icon.textContent = number + suffix;
            }
        });
    }
});