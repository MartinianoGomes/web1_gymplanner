document.getElementById("open-button").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("open-sidebar");
});

document.getElementById("logout-button").addEventListener("click", function () {   
    localStorage.removeItem("gymplanner_current_user");   
    window.location.href = '../../../index.html';
});