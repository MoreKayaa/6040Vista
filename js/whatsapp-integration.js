/* ============================================
   WHATSAPP CTA INTEGRATION
   Allows form submission OR WhatsApp messaging
   6040 Vista - Real Estate Development
   ============================================ */

class WhatsAppIntegration {
    constructor() {
        this.phoneNumber = '+254745118118'; // 6040 Vista Sales - Ren Yuan
        this.secondaryPhone = '+254759681867'; // Alternative contact
        this.init();
    }
    
    init() {
        this.addWhatsAppButtons();
        this.enhanceForms();
        this.addFloatingButton();
    }
    
    // Add WhatsApp buttons to all CTA sections
    addWhatsAppButtons() {
        const ctaSections = document.querySelectorAll('.cta-buttons, .hero-cta');
        
        ctaSections.forEach(section => {
            // Check if WhatsApp button already exists
            if (section.querySelector('.btn-whatsapp')) return;
            
            const whatsappBtn = document.createElement('a');
            whatsappBtn.href = this.generateWhatsAppLink('Hi, I am interested in 6040 Vista investment opportunity. I would like more information about the available units and payment plans.');
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
            // Skip if already enhanced
            if (form.querySelector('.form-whatsapp-option')) return;
            
            // Add WhatsApp button below submit button
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (!submitBtn) return;
            
            const whatsappOption = document.createElement('div');
            whatsappOption.className = 'form-whatsapp-option';
            whatsappOption.innerHTML = `
                <div style="text-align: center; margin: 1.5rem 0;">
                    <div style="position: relative; display: flex; align-items: center; margin: 1rem 0;">
                        <div style="flex: 1; height: 1px; background: var(--sand);"></div>
                        <p style="color: var(--text-secondary); margin: 0 1rem; font-weight: 600; font-size: 0.875rem;">OR</p>
                        <div style="flex: 1; height: 1px; background: var(--sand);"></div>
                    </div>
                    <button type="button" class="btn-whatsapp-form">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.882 11.882 0 005.713 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Send Inquiry via WhatsApp
                    </button>
                    <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.75rem; line-height: 1.5;">
                        <strong>Fill form above first</strong>, then click to send your inquiry via WhatsApp for instant response
                    </p>
                </div>
            `;
            
            submitBtn.parentNode.insertBefore(whatsappOption, submitBtn.nextSibling);
            
            // Add click handler
            const whatsappBtn = whatsappOption.querySelector('.btn-whatsapp-form');
            whatsappBtn.addEventListener('click', () => this.sendFormDataViaWhatsApp(form));
        });
    }
    
    // Add floating WhatsApp button
    addFloatingButton() {
        // Check if floating button already exists
        if (document.querySelector('.whatsapp-float')) return;
        
        const floatingBtn = document.createElement('a');
        floatingBtn.href = this.generateWhatsAppLink('Hi, I found 6040 Vista website and I am interested in learning more about your investment opportunities.');
        floatingBtn.className = 'whatsapp-float';
        floatingBtn.target = '_blank';
        floatingBtn.rel = 'noopener noreferrer';
        floatingBtn.title = 'Chat with us on WhatsApp';
        floatingBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.882 11.882 0 005.713 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
        `;
        
        document.body.appendChild(floatingBtn);
        
        // Add entrance animation
        setTimeout(() => {
            floatingBtn.style.opacity = '1';
            floatingBtn.style.transform = 'scale(1)';
        }, 1000);
    }
    
    // Generate WhatsApp link
    generateWhatsAppLink(message) {
        const encodedMessage = encodeURIComponent(message);
        const cleanPhone = this.phoneNumber.replace(/[^0-9]/g, '');
        return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    }
    
    // Send form data via WhatsApp
    sendFormDataViaWhatsApp(form) {
        // Validate form first
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const formData = new FormData(form);
        let message = '*6040 VISTA - Investment Inquiry*\n\n';
        
        // Check if form has data
        let hasData = false;
        
        // Build message from form fields
        for (let [key, value] of formData.entries()) {
            if (value.trim()) {
                hasData = true;
                // Format field name (capitalize, remove underscores/dashes)
                const fieldName = key
                    .replace(/[_-]/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())
                    .replace(/Id\b/g, 'ID')
                    .replace(/Roi\b/g, 'ROI');
                
                // Format value
                let formattedValue = value;
                if (key.toLowerCase().includes('email')) {
                    formattedValue = value.toLowerCase();
                }
                if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('mobile')) {
                    formattedValue = value.replace(/\s+/g, '');
                }
                
                message += `*${fieldName}:* ${formattedValue}\n`;
            }
        }
        
        if (!hasData) {
            alert('Please fill in at least one field before sending via WhatsApp.');
            return;
        }
        
        // Add footer
        message += `\n_Sent from 6040 Vista website_\n`;
        message += `_${new Date().toLocaleString()}_`;
        
        // Open WhatsApp
        window.open(this.generateWhatsAppLink(message), '_blank');
        
        // Optional: Show success message
        this.showSuccessNotification();
    }
    
    // Show success notification
    showSuccessNotification() {
        const notification = document.createElement('div');
        notification.className = 'whatsapp-notification';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <div>
                    <strong>Opening WhatsApp...</strong>
                    <p style="margin: 0; font-size: 0.875rem; opacity: 0.9;">Your inquiry is ready to send!</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide notification after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new WhatsAppIntegration();
});

// Also initialize on dynamic content load (if using AJAX)
if (typeof window.initWhatsAppIntegration === 'undefined') {
    window.initWhatsAppIntegration = () => new WhatsAppIntegration();
}
