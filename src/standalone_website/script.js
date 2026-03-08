// Standalone Website Script
document.addEventListener('DOMContentLoaded', () => {
    console.log('NexMine Website Initialized');

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-black/95', 'py-2');
            nav.classList.remove('bg-black/80', 'py-4');
        } else {
            nav.classList.add('bg-black/80', 'py-4');
            nav.classList.remove('bg-black/95', 'py-2');
        }
    });
});
