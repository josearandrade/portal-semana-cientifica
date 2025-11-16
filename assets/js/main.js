// assets/js/main.js (VERSÃO CORRIGIDA)

/**
 * Função principal para carregar componentes HTML.
 * @param {string} url - O caminho para o arquivo HTML (ex: '/partials/header.html')
 * @param {string} elementId - O ID do elemento onde o HTML será injetado.
 * @param {function} [callback] - Uma função opcional a ser executada APÓS o carregamento.
 */
function loadComponent(url, elementId, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            }
            
            // 4. Executa a função de callback APÓS o conteúdo ser carregado
            if (callback) {
                callback();
            }
        })
        .catch(error => {
            console.error('Falha na operação de fetch:', error);
            document.getElementById(elementId).innerHTML = `<p style="color:red;">Erro ao carregar componente.</p>`;
        });
}

/**
 * 1. Esta função SÓ será chamada DEPOIS que o header.html for carregado.
 * Ela configura o menu mobile.
 */
function setupMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            // Adiciona ou remove a classe "nav-active" do menu
            navLinks.classList.toggle('nav-active');
        });
    }
}

/**
 * 2. Esta função configura o carrossel da home page.
 */
function setupCarousel() {
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
}


/**
 * 3. Quando a página carregar, executa tudo.
 */
document.addEventListener("DOMContentLoaded", function() {
    // Carrega o header e, DEPOIS, executa setupMobileMenu
    loadComponent('/partials/header.html', 'header-placeholder', setupMobileMenu);
    
    // Carrega o footer (sem callback)
    loadComponent('/partials/footer.html', 'footer-placeholder');

    // Configura o carrossel (ele já está na página, não precisa esperar)
    setupCarousel();
});