document.getElementById("open-button").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("open-sidebar");
});

// Função de logout
document.getElementById("logout-button").addEventListener("click", function () {
    // Limpa o usuário atual do localStorage
    localStorage.removeItem("gymplanner_current_user");
    // Redireciona para a página de login ou página inicial
    window.location.href = '/web1_gymplanner/src/pages/login/login.html';
});