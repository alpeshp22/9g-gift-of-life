document.addEventListener("DOMContentLoaded", () => {
    const offcanvas = document.getElementById("offcanvasMainNav");
    const navLinks = document.querySelectorAll(".main-menu .nav-link");

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

// TRIBUTE IMAGE SLIDER 
$(document).ready(function () {
    $('.tribute-slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: 3000,
        smartSpeed: 1000,
        dots: false,
        navText: ["<i class='gol-chevron-left'>", "<i class='gol-chevron-right'>"],
        responsive: {
            0: {
                items: 1
            },
            991: {
                items: 3
            },
            1200: {
                items: 4,
                margin: 24
            },
            1500: {
                items: 5,
                margin: 24
            }
        }
    });
});
