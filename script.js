// Mendeteksi scroll untuk merubah tampilan Navbar
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// Pesan sambutan di Console (Opsional)
console.log("%c Kaptech Dev Portfolio v1.0 ", "background: #3b82f6; color: white; font-weight: bold;");
