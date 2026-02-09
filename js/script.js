// Sudarshan Astrology Upay - Custom JavaScript

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollToTop();
    initNavbarScroll();
    initCounters();
    initContactForm();
    initSmoothScroll();
    initFloatingButtons();
    initPlanetsScroll();
    initDynamicStars();
});

// Scroll to Top Button
function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    
    if (scrollButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('show');
            } else {
                scrollButton.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Navbar Background on Scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                navbar.style.background = 'rgba(30, 41, 59, 0.95)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    const countUp = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(counter), 10);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };
    
    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (counter.innerText === '0') {
                    countUp(counter);
                }
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Validate required fields
            const requiredFields = ['name', 'phone', 'service', 'consultation-type'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!data[field] || data[field].trim() === '') {
                    isValid = false;
                    showNotification(`Please fill in the ${field.replace('-', ' ')} field`, 'error');
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Processing...';
                submitButton.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    showNotification('Consultation request submitted successfully! We will contact you soon.', 'success');
                    contactForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    
                    // Redirect to WhatsApp after successful submission
                    setTimeout(() => {
                        const message = encodeURIComponent(`Hello, I would like to book a consultation for ${data.service}. Name: ${data.name}, Phone: ${data.phone}`);
                        window.open(`https://wa.me/917232899555?text=${message}`, '_blank');
                    }, 2000);
                }, 2000);
            }
        });
    }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Floating Buttons Animation
function initFloatingButtons() {
    const floatingButtons = document.querySelectorAll('.floating-btn');
    
    floatingButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi bi-${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="bi bi-x"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        padding: 15px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : 
                     type === 'error' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 
                     'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
        animation: slideIn 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle-fill';
        case 'error': return 'exclamation-triangle-fill';
        case 'warning': return 'exclamation-circle-fill';
        default: return 'info-circle-fill';
    }
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 10px;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Phone Number Formatting
function formatPhoneNumber(input) {
    const phoneNumber = input.value.replace(/\D/g, '');
    const formattedNumber = phoneNumber.replace(/(\d{5})(\d{5})/, '$1-$2');
    input.value = formattedNumber;
}

// Add phone number formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
});

// Date Validation - Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
});

// Service Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
});

// Page Loading Animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Dynamic Year in Footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
});

// WhatsApp Share Function
function shareOnWhatsApp(text) {
    const message = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${message}`, '_blank');
}

// Facebook Share Function
function shareOnFacebook(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy to clipboard', 'error');
    });
}

// Print Function
function printPage() {
    window.print();
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printPage();
    }
    
    // Escape to close notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Performance optimization - Debounce scroll events
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

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(function() {
    // Scroll-related functions here
}, 100));

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
        });
    });
});

// Console branding
console.log('%c🌟 Sudarshan Astrology Upay 🌟', 'font-size: 20px; font-weight: bold; color: #f59e0b;');
console.log('%cTrusted Astrology Services Since 2005', 'font-size: 14px; color: #6366f1;');
console.log('%c📞 Call: 7232899555 | 🌐 www.sudarshanastrology.com', 'font-size: 12px; color: #666;');

// Planets Scroll Movement
function initPlanetsScroll() {
    const planetsContainer = document.querySelector('.planets-container');
    const planets = document.querySelectorAll('.planet');
    
    if (!planetsContainer || planets.length === 0) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updatePlanets() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercent = scrollY / (documentHeight - windowHeight);
        
        // Add scrolled class for basic transformations
        if (scrollY > 100) {
            planetsContainer.classList.add('scrolled');
        } else {
            planetsContainer.classList.remove('scrolled');
        }
        
        // Advanced planet movements based on scroll
        planets.forEach((planet, index) => {
            const baseTransform = planet.style.transform || '';
            const scrollOffset = scrollY * (0.1 + (index * 0.05));
            const rotateOffset = scrollY * (0.5 + (index * 0.2));
            const scaleOffset = 1 + (scrollPercent * 0.3);
            
            // Different movement patterns for each planet
            let movementX, movementY;
            switch(index) {
                case 0: // Planet 1 - Diagonal movement
                    movementX = Math.sin(scrollPercent * Math.PI * 2) * 100;
                    movementY = Math.cos(scrollPercent * Math.PI * 2) * 80;
                    break;
                case 1: // Planet 2 - Circular movement
                    movementX = Math.cos(scrollPercent * Math.PI * 3) * 120;
                    movementY = Math.sin(scrollPercent * Math.PI * 3) * 100;
                    break;
                case 2: // Planet 3 - Figure-8 movement
                    movementX = Math.sin(scrollPercent * Math.PI * 4) * 150;
                    movementY = Math.sin(scrollPercent * Math.PI * 2) * 120;
                    break;
                case 3: // Planet 4 - Vertical wave
                    movementX = Math.sin(scrollPercent * Math.PI * 6) * 80;
                    movementY = scrollOffset * 0.5;
                    break;
                case 4: // Planet 5 - Horizontal wave
                    movementX = Math.cos(scrollPercent * Math.PI * 5) * 100;
                    movementY = Math.sin(scrollPercent * Math.PI * 3) * 60;
                    break;
                default:
                    movementX = scrollOffset;
                    movementY = scrollOffset * 0.5;
            }
            
            // Apply transformations
            planet.style.transform = `
                translateX(${movementX}px) 
                translateY(${movementY}px) 
                rotate(${rotateOffset}deg) 
                scale(${scaleOffset})
            `;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updatePlanets);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initial update
    updatePlanets();
}

// Dynamic Stars Generation
function initDynamicStars() {
    const body = document.body;
    const existingStars = document.querySelectorAll('.dynamic-star');
    
    // Remove existing dynamic stars if any
    existingStars.forEach(star => star.remove());
    
    // Create dynamic stars based on viewport
    function createStars() {
        const starCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'dynamic-star';
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 3 + 1;
            
            // Random animation delay
            const delay = Math.random() * 5;
            
            // Random animation duration
            const duration = Math.random() * 3 + 2;
            
            star.style.cssText = `
                position: fixed;
                top: ${x}%;
                left: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: #666;
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                animation: twinkle ${duration}s ${delay}s infinite;
                opacity: ${Math.random() * 0.6 + 0.2};
            `;
            
            body.appendChild(star);
        }
    }
    
    // Create initial stars
    createStars();
    
    // Recreate stars on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createStars, 250);
    });
}

// Add CSS for dynamic stars
const dynamicStarsCSS = document.createElement('style');
dynamicStarsCSS.textContent = `
    @keyframes twinkle {
        0%, 100% { 
            opacity: 0.2;
            transform: scale(1);
        }
        50% { 
            opacity: 1;
            transform: scale(1.2);
        }
    }
    
    .dynamic-star {
        transition: all 0.3s ease;
    }
    
    .dynamic-star:hover {
        transform: scale(2);
        opacity: 1;
    }
`;
document.head.appendChild(dynamicStarsCSS);

// Parallax Effect for Planets
function initParallaxEffect() {
    const planets = document.querySelectorAll('.planet');
    
    if (planets.length === 0) return;
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        planets.forEach((planet, index) => {
            const depth = (index + 1) * 10;
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;
            
            planet.style.transform += ` translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Initialize parallax effect
initParallaxEffect();

// Scroll-based Star Density
function initScrollBasedStars() {
    let scrollStars = [];
    
    window.addEventListener('scroll', debounce(function() {
        const scrollY = window.scrollY;
        const scrollPercent = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        
        // Add more stars as user scrolls down
        if (scrollPercent > 0.2 && scrollStars.length < 20) {
            const star = document.createElement('div');
            star.className = 'scroll-star';
            star.style.cssText = `
                position: fixed;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                width: 2px;
                height: 2px;
                background: #666;
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                animation: fadeIn 1s ease-in;
            `;
            document.body.appendChild(star);
            scrollStars.push(star);
        }
        
        // Remove stars when scrolling back up
        if (scrollPercent < 0.1 && scrollStars.length > 0) {
            const star = scrollStars.pop();
            if (star) {
                star.style.animation = 'fadeOut 1s ease-out';
                setTimeout(() => star.remove(), 1000);
            }
        }
    }, 100));
}

// Initialize scroll-based stars
initScrollBasedStars();

// Add fade animations
const fadeAnimations = document.createElement('style');
fadeAnimations.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0); }
        to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0); }
    }
`;
document.head.appendChild(fadeAnimations);
