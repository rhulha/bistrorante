const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!menuToggle?.contains(e.target) && !mainNav?.contains(e.target)) {
        menuToggle?.classList.remove('active');
        mainNav?.classList.remove('open');
    }
});

const menuCatBtns = document.querySelectorAll('.menu-cat-btn');
const menuCategories = document.querySelectorAll('.menu-category');

menuCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;

        menuCatBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        menuCategories.forEach(cat => {
            cat.style.display = (category === 'all' || cat.dataset.category === category)
                ? 'block'
                : 'none';
        });
    });
});

const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Vielen Dank! Ihre Nachricht wurde gesendet.');
    contactForm.reset();
});

function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    requestAnimationFrame(() => {
        toast.classList.add('visible');
    });
    setTimeout(() => {
        toast.classList.remove('visible');
    }, 3500);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.highlight-card, .catering-card, .menu-category, .contact-info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
