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

    // --- Código do carrossel ---
    const track = document.querySelector(".presenters__track");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");

    if (track && prevBtn && nextBtn) {
        const cardWidth = 300; // largura aproximada de cada card + gap

        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: cardWidth, behavior: "smooth" });
        });

        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -cardWidth, behavior: "smooth" });
        });
    }
});