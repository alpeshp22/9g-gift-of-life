$(document).ready(function () {

    //** LOAD HEADER & FOOTER
    $('header').load('header.html');
    $('footer').load('footer.html');

    //** PASSWORD TOGGLE
    $('.pass-toggle').on('click', function () {
        if ($(this).hasClass('gol-eye')) {
            $(this).removeClass('gol-eye');
            $(this).addClass('gol-eye-slash');
            $('.password').attr('type', 'text');
        } else {
            $(this).removeClass('gol-eye-slash');
            $(this).addClass('gol-eye');
            $('.password').attr('type', 'password');
        }
    });

    //** TRIBUTE IMAGE SLIDER 
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
                items: 2
            },
            460: {
                items: 3,
                margin: 16
            },
            991: {
                items: 4,
                margin: 24
            },
            1200: {
                items: 5,
                margin: 24
            }
        }
    });
});
