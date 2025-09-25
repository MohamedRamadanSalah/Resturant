// ===== ANIMATIONS AND INTERACTIONS =====

// Intersection Observer for Scroll Animations
class ScrollAnimator {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateIn(entry.target);
                }
            });
        }, options);

        this.observeElements();
    }

    observeElements() {
        const elements = document.querySelectorAll(
            '.about-content, .pdf-container, .contact-item, .section-title'
        );

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(el);
        });
    }

    animateIn(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Add staggered animation for child elements
        if (element.classList.contains('contact-info')) {
            this.animateChildren(element.querySelectorAll('.contact-item'));
        }
    }

    animateChildren(children) {
        children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
        });
    }
}

// Parallax Scrolling Effect
class ParallaxScroller {
    constructor() {
        this.hero = document.querySelector('.hero');
        if (this.hero) {
            this.init();
        }
    }

    init() {
        window.addEventListener('scroll', () => {
            this.updateParallax();
        });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (this.hero) {
            this.hero.style.transform = `translateY(${rate}px)`;
        }
    }
}

// Typing Animation for Hero Text
class TypingAnimation {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        
        this.type();
    }

    type() {
        const current = this.textIndex % this.texts.length;
        const fullText = this.texts[current];

        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.currentText = fullText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        this.element.textContent = this.currentText;

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === fullText.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Image Lazy Loading
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observeImages();
        } else {
            this.loadImagesImmediately();
        }
    }

    observeImages() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        this.images.forEach(img => imageObserver.observe(img));
    }

    loadImage(img) {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
    }

    loadImagesImmediately() {
        this.images.forEach(img => {
            this.loadImage(img);
        });
    }
}

// Form Handling (for future contact form)
class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        const formData = new FormData(this.form);
        
        try {
            // Simulate API call
            await this.submitForm(formData);
            this.showSuccess();
        } catch (error) {
            this.showError(error);
        }
    }

    async submitForm(data) {
        // Replace with actual API endpoint
        return new Promise((resolve) => {
            setTimeout(() => resolve({ success: true }), 2000);
        });
    }

    showSuccess() {
        // Success message implementation
        console.log('Form submitted successfully');
    }

    showError(error) {
        // Error message implementation
        console.error('Form submission error:', error);
    }
}

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    new ScrollAnimator();
    
    // Initialize parallax effect
    new ParallaxScroller();
    
    // Initialize lazy loading
    new LazyLoader();
    
    // Example typing animation (uncomment to use)
    // const heroText = document.querySelector('.hero h1');
    // if (heroText) {
    //     new TypingAnimation(heroText, ['Welcome to Meat Overdose', 'Premium Dining Experience'], 100);
    // }
});

// Utility function for CSS transforms
function setTransform(element, transform) {
    element.style.transform = transform;
    element.style.webkitTransform = transform;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ScrollAnimator,
        ParallaxScroller,
        TypingAnimation,
        LazyLoader,
        FormHandler
    };
}