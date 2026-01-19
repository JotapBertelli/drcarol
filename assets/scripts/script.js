// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .fade-in').forEach(el => {
    observer.observe(el);
});

// ==================== MENU MOBILE ====================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ==================== SMOOTH SCROLL ====================
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

// ==================== IMAGE COMPARISON SLIDER ====================
const slider = document.getElementById('compareSlider');
const beforeImage = document.querySelector('.image-wrapper.before');
const sliderLine = document.querySelector('.slider-line');
const sliderButton = document.querySelector('.slider-button');

if (slider) {
    function updateSlider(value) {
        beforeImage.style.width = value + '%';
        sliderLine.style.left = value + '%';
    }

    slider.addEventListener('input', (e) => {
        updateSlider(e.target.value);
    });

    // Touch support para mobile
    slider.addEventListener('touchmove', (e) => {
        const rect = slider.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const percent = (x / rect.width) * 100;
        if (percent >= 0 && percent <= 100) {
            updateSlider(percent);
            slider.value = percent;
        }
    });
}

// ==================== HEADER STICKY WITH SCROLL ====================
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'var(--shadow-sm)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== DELAY ANIMATIONS FOR CARDS ====================
document.querySelectorAll('.delay-1').forEach(el => {
    el.style.animationDelay = '0.2s';
});

document.querySelectorAll('.delay-2').forEach(el => {
    el.style.animationDelay = '0.4s';
});

// ==================== PARALLAX EFFECT (HERO) ====================
const heroContent = document.querySelector('.hero-content');

if (heroContent) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
}

// ==================== FLOATING BADGE ANIMATION ====================
const floatingBadge = document.querySelector('.floating-badge');

if (floatingBadge) {
    setInterval(() => {
        floatingBadge.style.animation = 'float 3s ease-in-out infinite';
    }, 100);
}

// ==================== ADD ANIMATION KEYFRAMES ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .active {
        animation: slideInUp 0.8s ease-out forwards;
    }
`;

document.head.appendChild(style);

// ==================== FORM VALIDATION & WHATSAPP LINK ====================
function generateWhatsAppLink(phone, message) {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/55${phone}?text=${encodedMessage}`;
}

// Atualizar links do WhatsApp com número real
document.querySelectorAll('[href*="wa.me"]').forEach(link => {
    // Substitua SEUNUMERO pelo número real
    const newHref = link.getAttribute('href').replace('SEUNUMERO', '11999999999');
    link.setAttribute('href', newHref);
});

// ==================== ACCORDION/TOGGLE EFFECTS ====================
document.querySelectorAll('.credential-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.boxShadow = 'var(--shadow-md)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// ==================== PERFORMANCE - LAZY LOAD IMAGES ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== CONSOLE MESSAGE ====================
console.log('✨ Dra. Carol Maschieto - Website carregado com sucesso!');
