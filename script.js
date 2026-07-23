// 1. EFEK NAVBAR & ANIMASI MUNCUL SAAT SCROLL
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled'); 
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Reveal Elements
    document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
});

// Panggil sekali saat load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
});

// 2. COUNTER ANIMASI (Angka Statistik Naik Sendiri)
const counters = document.querySelectorAll('.counter');
const speed = 200; // Semakin kecil semakin cepat

const startCounters = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const counter = entry.target;
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
            observer.unobserve(counter); // Hanya animasi 1x
        }
    });
};

const counterObserver = new IntersectionObserver(startCounters, { threshold: 0.5 });
counters.forEach(counter => {
    counterObserver.observe(counter);
});

// 3. FILTER PORTFOLIO (Masonry)
const filterBtns = document.querySelectorAll('.filter-btn');
const masonryItems = document.querySelectorAll('.masonry-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Hapus kelas active dari semua tombol
        filterBtns.forEach(b => b.classList.remove('active'));
        // Tambahkan ke tombol yang diklik
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        masonryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-cat') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// 4. LIGHTBOX PREVIEW (Klik foto membesar)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');
const galleryImages = document.querySelectorAll('.lightbox-trigger');

galleryImages.forEach(img => {
    img.addEventListener('click', function() {
        lightbox.style.display = "block";
        lightboxImg.src = this.src;
    });
});

// Tutup modal lightbox
closeBtn.onclick = function() { lightbox.style.display = "none"; }
// Tutup kalau klik diluar gambar
window.onclick = function(event) {
    if (event.target == lightbox) {
        lightbox.style.display = "none";
    }
}
function openWhatsAppBooking() {
    window.open('https://wa.me/6282128614356', '_blank');
}

function openWhatsApp(namaPaket) {
    const nomorWA = '6282128614356';
    const pesan = `Halo Admin Temani Photobooth, saya tertarik dan ingin order *${namaPaket}*. Boleh info lebih lanjut?`;
    window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, '_blank');
}