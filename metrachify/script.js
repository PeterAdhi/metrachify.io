// Set tahun otomatis di footer
document.getElementById('year').textContent = new Date().getFullYear();

// Toggle menu mobile
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Smooth scroll untuk navigasi (hanya untuk link anchor)
document.querySelectorAll('.pill').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    // Cek apakah link adalah anchor (#) atau halaman eksternal
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href;
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      // Tutup menu mobile setelah klik
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
      }
      
      // Tambah active class
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      link.classList.add('active');
    } else {
      // Untuk link halaman eksternal (order.html), biarkan default behavior
      // Tutup menu mobile saat klik
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
      }
    }
  });
});

// Highlight navigasi saat scroll (hanya untuk halaman dengan section)
if (document.querySelectorAll('section[id]').length > 0) {
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.pill').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}