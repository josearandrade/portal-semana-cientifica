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
});