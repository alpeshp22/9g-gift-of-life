document.addEventListener("DOMContentLoaded", () => {
    const offcanvas = document.getElementById("offcanvasMainNav");
    const navLinks = document.querySelectorAll(".main-navbar .nav-link");

    offcanvas.addEventListener("show.bs.offcanvas", () => {
        navLinks.forEach((link, index) => {
            link.style.animation = `slideIn 0.5s ease forwards`;
            link.style.animationDelay = `${index * 0.3}s`;
        });
    });

    // Reset animation on hide to ensure it can replay
    offcanvas.addEventListener("hidden.bs.offcanvas", () => {
        navLinks.forEach((link) => {
            link.style.animation = "none";
        });
    });
});
