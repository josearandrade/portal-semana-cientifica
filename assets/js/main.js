// assets/js/main.js

function loadComponent(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error('Falha na operação de fetch:', error);
            document.getElementById(elementId).innerHTML = `<p style="color:red;">Erro ao carregar componente.</p>`;
        });
}

document.addEventListener("DOMContentLoaded", function() {
    loadComponent('/partials/header.html', 'header-placeholder');
    loadComponent('/partials/footer.html', 'footer-placeholder');

    // --- Código do carrossel com loop infinito ---
    const track = document.querySelector(".presenters__track");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");

    if (track && prevBtn && nextBtn) {
        const cardWidth = track.querySelector('.presenter-card')?.offsetWidth || 300;
        const gap = parseInt(getComputedStyle(track).gap) || 24;
        const scrollAmount = cardWidth + gap;

        nextBtn.addEventListener("click", () => {
            if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - 1) {
                track.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                track.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        });

        prevBtn.addEventListener("click", () => {
            if (track.scrollLeft <= 1) {
                track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
            } else {
                track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            }
        });
    }
});

