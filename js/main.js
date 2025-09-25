// ===== MAIN JAVASCRIPT FILE =====

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    loadHeader();
    loadFooter();
    setupEventListeners();
    initializeComponents();
}

// Load Header Content
function loadHeader() {
    const header = document.getElementById('header');
    if (header) {
        header.innerHTML = `
            <div class="mobile-header">
                <div class="logo">Meat Overdose</div>
                <button class="menu-toggle" aria-label="Toggle navigation menu">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            <nav class="nav-menu" aria-label="Main navigation">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#menu">Menu</a>
                <a href="#contact">Contact</a>
            </nav>
        `;
    }
}

// Load Footer Content
function loadFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = `
            <div class="footer-content">
                <div class="footer-logo">Meat Overdose</div>
                <div class="social-links">
                    <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                </div>
                <p class="copyright">
                    &copy; 2023 Meat Overdose. All rights reserved.
                </p>
            </div>
        `;
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Back to Top Button
    window.addEventListener('scroll', throttle(handleScroll, 100));

    // Smooth scrolling for anchor links
    setupSmoothScrolling();

    // PDF Download Tracking
    setupDownloadTracking();
}

// Initialize Components
function initializeComponents() {
    // Initialize any third-party components here
    console.log('Meat Overdose Restaurant website initialized');
}

// Handle Scroll Events
function handleScroll() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }

    // Add scroll-based animations
    handleScrollAnimations();
}

// Throttle Function for Performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Setup Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Handle Scroll Animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.about-content, .pdf-container, .contact-item');
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

// Setup Download Tracking
function setupDownloadTracking() {
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Track download event (you can integrate with Google Analytics here)
            console.log('Menu PDF download initiated');
            
            // Add loading state
            const originalHTML = this.innerHTML;
            this.innerHTML = '<span class="loading"></span> Downloading...';
            this.disabled = true;
            
            // Simulate download completion
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.disabled = false;
            }, 2000);
        });
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        setupSmoothScrolling,
        handleScroll
    };
}