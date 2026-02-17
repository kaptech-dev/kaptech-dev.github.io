// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
});

// Navbar change background on scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 100) {
        nav.classList.add('nav-blur');
    } else {
        nav.classList.remove('nav-blur');
    }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
