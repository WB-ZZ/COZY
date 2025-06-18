// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Add visible class to hero elements immediately
    const heroElements = document.querySelectorAll('.hero .fade-in');
    setTimeout(() => {
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });
    }, 500);
});

// Header scroll effect with parallax
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const scrolled = window.pageYOffset;
    
    // Header background change
    if (scrolled > 100) {
        header.style.background = 'rgba(255, 248, 240, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(255, 159, 122, 0.1)';
    } else {
        header.style.background = 'rgba(255, 248, 240, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    // Parallax effect for hero content
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        const opacity = Math.max(0, 1 - scrolled / (hero.offsetHeight * 0.8));
        
        heroContent.style.transform = `translateY(${rate}px) translateZ(0)`;
        heroContent.style.opacity = opacity;
        
        // Parallax background effect
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Stats section - keep original values without animation interference
// Disabled counter animation to prevent stat corruption

// Add some interactive hover effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple form validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff6b6b';
                    isValid = false;
                } else {
                    input.style.borderColor = var('--light-gray');
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('예약 문의가 성공적으로 전송되었습니다! 🏡', 'success');
                contactForm.reset();
            } else {
                showNotification('예약에 필요한 모든 정보를 입력해주세요. 🌿', 'error');
            }
        });
    }
});

// Notification function
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 25px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #FF9F7A, #E8A598);' : 'background: linear-gradient(135deg, #ff6b6b, #ee5a52);'}
        box-shadow: 0 8px 32px rgba(255, 159, 122, 0.25);
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Mobile menu toggle (for future mobile navigation)
function initMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--sunset-orange);
        cursor: pointer;
    `;
    
    // Add mobile styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            .nav-toggle {
                display: block !important;
            }
            
            .nav-menu {
                position: fixed;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 248, 240, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                padding: 2rem;
                box-shadow: 0 4px 20px rgba(255, 159, 122, 0.15);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .nav-menu.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-link {
                width: 100%;
                text-align: center;
                padding: 1rem;
                margin: 0.5rem 0;
            }
        }
    `;
    
    document.head.appendChild(mobileStyles);
    
    // Insert toggle button
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.appendChild(navToggle);
        
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Enhanced page loading animation
document.addEventListener('DOMContentLoaded', () => {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">코지 펜션</div>
            <div class="loading-spinner"></div>
            <div class="loading-text">자연 속 아늑한 휴식을 준비하고 있습니다...</div>
        </div>
    `;
    
    // Add loading styles
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--warm-cream), var(--soft-sand));
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.6s ease, visibility 0.6s ease;
        }
        
        .loading-overlay.fade-out {
            opacity: 0;
            visibility: hidden;
        }
        
        .loading-content {
            text-align: center;
            padding: 3rem;
        }
        
        .loading-logo {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 600;
            color: var(--deep-brown);
            margin-bottom: 2rem;
            opacity: 0;
            animation: fadeInUp 0.8s ease 0.3s forwards;
        }
        
        .loading-spinner {
            width: 60px;
            height: 60px;
            margin: 0 auto 2rem;
            border: 3px solid rgba(45, 24, 16, 0.1);
            border-top: 3px solid var(--deep-brown);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            opacity: 0;
            animation: spin 1s linear infinite, fadeIn 0.5s ease 0.6s forwards;
        }
        
        .loading-text {
            color: var(--warm-gray);
            font-size: 1.1rem;
            font-weight: 400;
            opacity: 0;
            animation: fadeInUp 0.8s ease 0.9s forwards;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(loadingStyles);
    document.body.appendChild(loadingOverlay);
    
    // Initial body setup
    document.body.style.overflow = 'hidden';
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
    
    // Simulate loading and remove overlay
    setTimeout(() => {
        loadingOverlay.classList.add('fade-out');
        document.body.style.overflow = '';
        document.body.style.opacity = '1';
        
        setTimeout(() => {
            loadingOverlay.remove();
            loadingStyles.remove();
        }, 600);
    }, 2500);
});

// Performance optimization: Debounce scroll events
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
const debouncedScrollHandler = debounce(() => {
    // Additional scroll-related calculations can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical fonts
document.addEventListener('DOMContentLoaded', () => {
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Comfortaa:wght@300;400;500;700&display=swap';
    fontPreload.as = 'style';
    document.head.appendChild(fontPreload);
});