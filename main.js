// AI Academy - Main JavaScript File

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const header = document.getElementById('header');
const filterBtns = document.querySelectorAll('.filter__btn');
const courseCards = document.querySelectorAll('.course__card');
const pricingToggle = document.getElementById('pricing-toggle');
const contactForm = document.getElementById('contact-form');

// Navigation Toggle (Mobile)
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        navToggle.querySelector('i').classList.toggle('fa-bars');
        navToggle.querySelector('i').classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        navToggle.querySelector('i').classList.add('fa-bars');
        navToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Header scroll effect
function scrollHeader() {
    if (window.scrollY >= 100) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

// Course Filter Functionality
function filterCourses() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            courseCards.forEach(card => {
                if (filter === 'all' || card.dataset.level === filter) {
                    card.style.display = 'block';
                    // Add animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize course filtering
if (filterBtns.length > 0) {
    filterCourses();
}

// Pricing Toggle Functionality
if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
        const monthlyAmounts = document.querySelectorAll('.amount.monthly');
        const yearlyAmounts = document.querySelectorAll('.amount.yearly');

        if (pricingToggle.checked) {
            monthlyAmounts.forEach(amount => amount.style.display = 'none');
            yearlyAmounts.forEach(amount => amount.style.display = 'inline');
        } else {
            monthlyAmounts.forEach(amount => amount.style.display = 'inline');
            yearlyAmounts.forEach(amount => amount.style.display = 'none');
        }
    });
}

// Smooth Scrolling for Navigation Links
function smoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

smoothScrolling();

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const formObject = {};

        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with actual backend endpoint)
            await simulateFormSubmission(formObject);

            // Show success message
            showNotification('¡Mensaje enviado correctamente! Te responderemos pronto.', 'success');
            contactForm.reset();

        } catch (error) {
            // Show error message
            showNotification('Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success (you can add validation logic here)
            if (formData.name && formData.email && formData.message) {
                resolve({ success: true });
            } else {
                reject(new Error('Missing required fields'));
            }
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add notification to DOM
    document.body.appendChild(notification);

    // Add close functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Course Card Interactions
function setupCourseInteractions() {
    courseCards.forEach(card => {
        const enrollBtn = card.querySelector('.btn');

        if (enrollBtn) {
            enrollBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const courseTitle = card.querySelector('.course__title').textContent;
                const coursePrice = card.querySelector('.course__price').textContent;

                showEnrollmentModal(courseTitle, coursePrice);
            });
        }
    });
}

// Enrollment Modal
function showEnrollmentModal(courseTitle, coursePrice) {
    // Remove existing modal
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal__overlay">
            <div class="modal__content">
                <div class="modal__header">
                    <h3>Inscribirse al Curso</h3>
                    <button class="modal__close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal__body">
                    <h4>${courseTitle}</h4>
                    <p class="modal__price">Precio: ${coursePrice}</p>
                    <p>Para inscribirte a este curso, necesitas crear una cuenta o iniciar sesión.</p>
                    <div class="modal__actions">
                        <button class="btn btn--primary btn--full" onclick="handleEnrollment('${courseTitle}')">
                            Crear Cuenta e Inscribirse
                        </button>
                        <button class="btn btn--outline btn--full" onclick="handleLogin()">
                            Ya tengo cuenta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    const closeBtn = modal.querySelector('.modal__close');
    const overlay = modal.querySelector('.modal__overlay');

    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });

    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
}

// Handle enrollment (placeholder - integrate with backend)
function handleEnrollment(courseTitle) {
    showNotification(`¡Genial! Te inscribirás al curso: ${courseTitle}. Redirigiendote al registro...`, 'success');
    // Here you would redirect to registration page or open registration modal
    setTimeout(() => {
        document.querySelector('.modal').remove();
    }, 2000);
}

// Handle login (placeholder - integrate with backend)
function handleLogin() {
    showNotification('Redirigiendo al inicio de sesión...', 'info');
    // Here you would redirect to login page or open login modal
    setTimeout(() => {
        document.querySelector('.modal').remove();
    }, 2000);
}

// Initialize course interactions
setupCourseInteractions();

// Scroll to Top Functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');

    document.body.appendChild(scrollBtn);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    // Scroll to top when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createScrollToTop();

// Animation on Scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.course__card, .pricing__card, .testimonial__card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize animations
animateOnScroll();

// Search functionality (placeholder for future implementation)
function initializeSearch() {
    // This would be implemented when adding search functionality
    console.log('Search functionality ready for implementation');
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('AI Academy website loaded successfully!');
    initializeSearch();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        navMenu.classList.remove('show-menu');
        navToggle.querySelector('i').classList.add('fa-bars');
        navToggle.querySelector('i').classList.remove('fa-times');
    }
});

// Performance optimization - Lazy loading for images
function lazyLoadImages() {
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

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();