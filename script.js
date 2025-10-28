// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Update cursor position
const moveCursor = (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
};

// Add hover effect to interactive elements
const addHoverEffect = () => {
    const interactiveElements = document.querySelectorAll('a, button, .btn, .skills-box, .projects-box, .certificate-box, input, textarea');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });

        element.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });
};

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

const toggleTheme = () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', newTheme);
    themeIcon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

    // Save theme preference to localStorage
    localStorage.setItem('theme', newTheme);
};

// Multiple Text Animation (Replacement for Typed.js)
class MultipleTextAnimator {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.options = {
            typeSpeed: 100,
            backSpeed: 60,
            backDelay: 2000,
            loop: true,
            ...options
        };

        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;

        this.init();
    }

    init() {
        this.type();
    }

    type() {
        if (this.isPaused) return;

        const currentText = this.texts[this.currentTextIndex];

        if (this.isDeleting) {
            // Deleting text
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            // Typing text
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? this.options.backSpeed : this.options.typeSpeed;

        // Add variation to typing speed for more natural feel
        typeSpeed += Math.random() * 50;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            // Finished typing, pause before deleting
            typeSpeed = this.options.backDelay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            // Finished deleting, move to next text
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            typeSpeed = 500; // Pause before starting next text
        }

        setTimeout(() => this.type(), typeSpeed);
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
        this.type();
    }

    destroy() {
        this.isPaused = true;
    }
}

// Initialize Multiple Text Animation
const initMultipleText = () => {
    const multipleTextElement = document.querySelector('.multiple-text');
    if (!multipleTextElement) return;

    const texts = [
        'Flutter Developer',
        'Mobile App Developer',
        'UI/UX Enthusiast',
        'Problem Solver',
        'Tech Innovator'
    ];

    new MultipleTextAnimator(multipleTextElement, texts, {
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 2000,
        loop: true
    });
};

// Scroll Reveal Animation
const scrollReveal = () => {
    const elements = document.querySelectorAll('.home-content, .about-content, .about-img, .skills-box, .projects-box, .certificate-box, .contact form');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
};

// Sticky Header
const stickyHeader = () => {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('sticky', window.scrollY > 100);
    });
};

// Active Navigation Links
const setActiveNavLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
};

// Mobile Menu Toggle
const mobileMenuToggle = () => {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('fa-times');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuIcon.classList.remove('fa-times');
        });
    });
};

// Animate Skill Bars
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = `${width}%`;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
};

// Form Submission Handler
const handleFormSubmit = () => {
    const form = document.querySelector('.contact form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to a server
        console.log('Form submitted:', data);

        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
    });
};

// Smooth Scrolling for Anchor Links
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cursor
    document.addEventListener('mousemove', moveCursor);
    addHoverEffect();

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

    // Initialize components
    initMultipleText();
    scrollReveal();
    stickyHeader();
    setActiveNavLink();
    mobileMenuToggle();
    animateSkillBars();
    handleFormSubmit();
    smoothScroll();

    // Add event listeners
    themeToggle.addEventListener('click', toggleTheme);

    // Hide cursor when not moving
    let cursorTimer;
    document.addEventListener('mousemove', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';

        clearTimeout(cursorTimer);
        cursorTimer = setTimeout(() => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        }, 3000);
    });
});

// Handle page visibility changes (pause animations when tab is not active)
document.addEventListener('visibilitychange', () => {
    const multipleTextAnimators = document.querySelectorAll('.multiple-text');
    if (document.hidden) {
        multipleTextAnimators.forEach(animator => {
            // You might want to add pause functionality to your animator
            animator.style.animationPlayState = 'paused';
        });
    } else {
        multipleTextAnimators.forEach(animator => {
            animator.style.animationPlayState = 'running';
        });
    }
});

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Enhanced scroll event handlers
window.addEventListener('scroll', debounce(() => {
    // Your scroll-related code here
}, 10));

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn(`Failed to load image: ${this.src}`);
    });
});

// Console greeting
console.log(`
🌟 Welcome to Adarsh Ajay's Portfolio!

   🚀 Flutter Developer | Mobile App Specialist
   💡 Passionate about creating amazing user experiences
   📱 Building the future, one app at a time

   Feel free to explore the code and get inspired!

   Connect with me:
   📧 Email: aadhiadarsh192001@gmail.com
   💼 LinkedIn: linkedin.com/in/adarshajay19200/
   🔗 GitHub: github.com/AADHIX
`);