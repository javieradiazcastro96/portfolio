document.addEventListener('DOMContentLoaded', function() {
    // Animación para revelar proyectos al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    });

    // Observar todas las tarjetas de proyectos
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });

    // Asegurarse de que todos los videos se reproduzcan automáticamente
    document.querySelectorAll('.project-image video').forEach(video => {
        // Asegurarse de que el video se reproduzca
        video.play().catch(e => {
            // Si hay un error (por ejemplo, política de autoplay del navegador),
            // no hacemos nada y dejamos que los atributos HTML manejen el comportamiento
            console.log("Nota: Reproducción automática bloqueada por el navegador. Los videos se reproducirán cuando el usuario interactúe con la página.");
        });
        
        // No agregamos eventos de mouseenter/mouseleave para que el video no se detenga al pasar el mouse
    });

    // Funcionalidad para navegación móvil
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = '<span></span><span></span><span></span>';
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.appendChild(mobileMenu);
        
        mobileMenu.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Animación de scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto de hover en imágenes de galería
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Funcionalidad para cambiar entre temas (opcional)

    // Verificar carga de imágenes
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.error('Error al cargar la imagen:', this.src);
            this.style.display = 'none';
            this.parentElement.style.backgroundColor = '#f0f0f0';
            
            // Opcional: mostrar un mensaje o icono de error
            const errorMsg = document.createElement('div');
            errorMsg.textContent = 'Imagen no disponible';
            errorMsg.style.padding = '20px';
            errorMsg.style.textAlign = 'center';
            this.parentElement.appendChild(errorMsg);
        });
    });

});
