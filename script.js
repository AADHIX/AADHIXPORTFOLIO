// Theme Toggle - Fixed
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'light'
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });

    // Close menu when clicking on links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('fa-times');
            navbar.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target) && navbar.classList.contains('active')) {
            menuIcon.classList.remove('fa-times');
            navbar.classList.remove('active');
        }
    });

    // Handle escape key to close menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbar.classList.contains('active')) {
            menuIcon.classList.remove('fa-times');
            navbar.classList.remove('active');
        }
    });
}

// Sticky Header on Scroll with debounce
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

window.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 0);
    }
}, 10));

// Typed.js for Multiple Text
if (typeof Typed !== 'undefined') {
    const typed = new Typed('.multiple-text', {
        strings: ['Flutter Developer', 'UI/UX Designer', 'Mobile Developer', 'Freelancer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
} else {
    console.warn('Typed.js not loaded');
    const multipleText = document.querySelector('.multiple-text');
    if (multipleText) {
        multipleText.textContent = 'Flutter Developer';
    }
}

// Scroll Reveal Animation - Fixed
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({
        reset: false,
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .projects-box, .certificate-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
} else {
    console.warn('ScrollReveal not loaded');
}

// Enhanced Form Submission with Validation
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const phone = form.querySelector('input[type="tel"]').value;
        const subject = form.querySelectorAll('input[type="text"]')[1].value;
        const message = form.querySelector('textarea').value;

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields (Name, Email, Message)');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Here you would typically send this data to a server
        console.log('Form submitted:', { name, email, phone, subject, message });

        // Show success message
        alert('Message sent successfully! I will get back to you soon.');
        form.reset();
    });
}

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 100);
    });
}

if (skillsSection && skillBars.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
}

// Enhanced Active Section Detection
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', debounce(() => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && (href === `#${current}` || href.includes(`#${current}`))) {
            link.classList.add('active');
        }
    });
}, 10));

// Custom Cursor with mobile detection
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// Disable custom cursor on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints) {
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorOutline) cursorOutline.style.display = 'none';
    document.body.style.cursor = 'auto';
} else {
    // Enable custom cursor for desktop
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        if (cursorDot) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
        }

        if (cursorOutline) {
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        }
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, #menu-icon, .social-media a, .theme-toggle, .footer-iconTop a, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorOutline) {
                cursorOutline.classList.add('hover');
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursorOutline) {
                cursorOutline.classList.remove('hover');
            }
        });
    });
}

// Smooth scrolling for anchor links
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

// Page load animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Initialize skill bars on page load
window.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
});

// Rive Animations for Certificates Section
function initializeRiveAnimations() {
    // Check if Rive is available
    if (typeof rive === 'undefined') {
        console.warn('Rive is not available, using fallback animations');
        initializeFallbackAnimations();
        return;
    }

    // Rive animations configuration
    const riveConfigs = [
        {
            canvasId: 'ui-ux-animation',
            riveFile: 'https://cdn.rive.app/animations/vehicles.riv',
            artboard: 'Vehicle',
            stateMachine: 'State Machine 1'
        },
        {
            canvasId: 'flutter-animation',
            riveFile: 'https://cdn.rive.app/animations/off_road_car.riv',
            artboard: 'New Artboard',
            stateMachine: 'State Machine 1'
        },
        {
            canvasId: 'iot-animation',
            riveFile: 'https://cdn.rive.app/animations/truck.riv',
            artboard: 'Truck',
            stateMachine: 'State Machine 1'
        }
    ];

    // Initialize Rive animations
    riveConfigs.forEach(config => {
        const canvas = document.getElementById(config.canvasId);
        if (canvas) {
            // Add loading state
            canvas.parentElement.classList.add('rive-loading');

            try {
                // Initialize Rive
                new rive.Rive({
                    src: config.riveFile,
                    canvas: canvas,
                    artboard: config.artboard,
                    stateMachine: config.stateMachine,
                    autoplay: true,
                    onLoad: () => {
                        // Remove loading state when loaded
                        canvas.parentElement.classList.remove('rive-loading');
                        console.log(`${config.canvasId} animation loaded successfully`);
                    },
                    onLoadError: (error) => {
                        console.error(`Error loading ${config.canvasId}:`, error);
                        // Fallback to CSS animation if Rive fails
                        fallbackAnimation(canvas.parentElement, config.canvasId);
                    }
                });
            } catch (error) {
                console.error(`Error initializing Rive for ${config.canvasId}:`, error);
                fallbackAnimation(canvas.parentElement, config.canvasId);
            }
        }
    });
}

// Fallback animation if Rive fails to load
function fallbackAnimation(container, canvasId) {
    container.classList.remove('rive-loading');
    container.innerHTML = `
        <div class="fallback-animation">
            <i class="fas ${getFallbackIcon(canvasId)}"></i>
            <div class="pulse-effect"></div>
        </div>
    `;
}

// Initialize all fallback animations
function initializeFallbackAnimations() {
    document.querySelectorAll('.rive-container').forEach(container => {
        const canvasId = container.querySelector('canvas')?.id;
        if (canvasId) {
            fallbackAnimation(container, canvasId);
        }
    });
}

// Get appropriate icon for fallback animation
function getFallbackIcon(canvasId) {
    const icons = {
        'ui-ux-animation': 'fa-palette',
        'flutter-animation': 'fa-mobile-alt',
        'iot-animation': 'fa-microchip'
    };
    return icons[canvasId] || 'fa-certificate';
}

// Enhanced certificate interactions
function enhanceCertificateInteractions() {
    const certificateBoxes = document.querySelectorAll('.certificate-box');

    certificateBoxes.forEach(box => {
        // Add click animation
        box.addEventListener('click', (e) => {
            if (!e.target.closest('a')) {
                box.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    box.style.transform = '';
                }, 150);
            }
        });

        // Add keyboard navigation
        box.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = box.querySelector('a.btn');
                if (link) {
                    link.click();
                }
            }
        });

        // Add focus styles
        box.setAttribute('tabindex', '0');

        // Add hover sound effect (optional)
        box.addEventListener('mouseenter', () => {
            // You can add a subtle sound effect here if desired
        });
    });
}

// Intersection Observer for certificate animations
function observeCertificateAnimations() {
    const certificatesSection = document.querySelector('.certificates');
    const certificateBoxes = document.querySelectorAll('.certificate-box');

    if (certificatesSection && certificateBoxes.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                }
            });
        }, { threshold: 0.1 });

        certificateBoxes.forEach(box => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(50px)';
            observer.observe(box);
        });
    }
}

// Load Rive.js and initialize animations
function loadRiveAndInitialize() {
    // Check if Rive is already loaded
    if (typeof rive !== 'undefined') {
        initializeRiveAnimations();
        return;
    }

    // Load Rive.js from CDN
    const riveScript = document.createElement('script');
    riveScript.src = 'https://unpkg.com/@rive-app/canvas@2.7.0';
    riveScript.onload = function() {
        console.log('Rive.js loaded successfully');
        // Initialize Rive animations after script loads
        setTimeout(initializeRiveAnimations, 500);
    };
    riveScript.onerror = function() {
        console.warn('Rive.js failed to load, using fallback animations');
        // Initialize fallback animations
        initializeFallbackAnimations();
    };
    document.head.appendChild(riveScript);
}

// Initialize all certificate-related functionality
function initializeCertificates() {
    enhanceCertificateInteractions();
    observeCertificateAnimations();

    // Only load Rive if we're on a page with certificates
    const certificatesSection = document.querySelector('.certificates');
    if (certificatesSection) {
        loadRiveAndInitialize();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCertificates();
});

// Add to your existing window load event
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Re-initialize Rive animations if needed
    const certificatesSection = document.querySelector('.certificates');
    if (certificatesSection && typeof rive !== 'undefined') {
        setTimeout(initializeRiveAnimations, 500);
    }
});

// Handle theme changes for Rive animations
themeToggle.addEventListener('click', () => {
    // Re-initialize Rive animations on theme change if needed
    setTimeout(() => {
        if (typeof rive !== 'undefined' && document.querySelector('.certificates')) {
            initializeRiveAnimations();
        }
    }, 300);
});