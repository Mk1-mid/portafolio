// ============ THEME TOGGLE FUNCTIONALITY ============

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Verificar si hay tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Aplicar tema guardado
    if (savedTheme === 'light') {
        html.classList.add('light-mode');
        updateThemeIcon(true);
    }

    // Toggle del tema
    themeToggle.addEventListener('click', function() {
        html.classList.toggle('light-mode');
        
        // Guardar preferencia
        const isLightMode = html.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        
        // Actualizar icono
        updateThemeIcon(isLightMode);
    });

    // Función para actualizar el icono
    function updateThemeIcon(isLightMode) {
        const icon = themeToggle.querySelector('i');
        themeToggle.classList.toggle('light-mode', isLightMode);
        
        if (isLightMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // ============ HAMBURGER MENU FUNCTIONALITY ============
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navLogo = document.querySelector('.nav-logo');

    if (hamburger) {
        // Toggle menu cuando se hace click en el hamburguesa
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menu cuando se hace click en un link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // El logo NO cierra el menú, solo navega
        navLogo.addEventListener('click', function(e) {
            // Permite que el navegador maneje el link normalmente
            // No cierra el menú
        });

        // Cerrar menu si se hace click fuera del navbar
        document.addEventListener('click', function(event) {
            const navbar = document.querySelector('.navbar');
            if (!navbar.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Cerrar menu cuando se redimensiona la ventana
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ============ SCROLL ANIMATIONS ============

// Opción: Agregar animaciones cuando los elementos entran al viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animar cards y secciones
document.querySelectorAll('.card, .skill-badge, .projects-table tbody tr').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============ SMOOTH SCROLL BEHAVIOR ============
// El scroll suave ya está en el CSS, pero aquí puedes agregar lógica adicional si necesitas

// ============ ACTIVE LINK EN LA NAVBAR ============
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section, header');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
