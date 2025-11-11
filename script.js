// Menú hamburguesa para móviles
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar transparente en scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Animación de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.skill-card, .project-card, .about-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Resaltar enlace de navegación activo
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Manejo del formulario de contacto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Simulación de envío (en producción conectar con backend)
    console.log('Formulario enviado:', formData);
    
    // Mostrar mensaje de éxito
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    
    // Limpiar formulario
    contactForm.reset();
});

// Smooth scroll mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animación de aparición del título ya está en CSS
// El efecto de typewriter se ha eliminado para preservar el HTML correctamente

// Contador de scroll para la flecha de scroll down
const scrollDownArrow = document.querySelector('.scroll-down');
if (scrollDownArrow) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollDownArrow.style.opacity = '0';
        } else {
            scrollDownArrow.style.opacity = '1';
        }
    });
}

// Agregar clase 'loaded' al body cuando la página termina de cargar
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevenir comportamiento por defecto en enlaces de proyecto (placeholder)
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
            alert('Este es un proyecto de demostración. Agrega tus propios enlaces aquí.');
        }
    });
});

// Validación en tiempo real del formulario
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');

emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#ef4444';
    } else {
        emailInput.style.borderColor = '#10b981';
    }
});

nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim().length < 2) {
        nameInput.style.borderColor = '#ef4444';
    } else {
        nameInput.style.borderColor = '#10b981';
    }
});

// Reset border color en focus
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = '#2563eb';
    });
});
