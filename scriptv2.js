document.addEventListener('DOMContentLoaded', () => {
    // 1. Atualiza a data no cabeçalho
    const dateDisplay = document.getElementById('date-display');
    const hoje = new Date();
    dateDisplay.innerHTML = `<i class="fa-regular fa-calendar"></i> ${hoje.toLocaleDateString('pt-BR')}`;

    // 2. Lógica de navegação do Menu
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');
    const titleDisplay = document.getElementById('current-view-title');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            // Remove classe ativa de todos os botões e adiciona no clicado
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Esconde todas as telas e mostra a alvo
            views.forEach(view => view.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');

            // Atualiza o título no cabeçalho (removendo o ícone para ficar limpo)
            titleDisplay.innerText = button.innerText.trim();
        });
    });
});
