$(document).ready(function () {

    /////// LOAD HEADER & FOOTER
    $('header').load('header.html');
    $('footer').load('footer.html');

    /////// BOOTSTARP TOOLTIP
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    /////// TRIBUTE IMAGE SLIDER 
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
                items: 2,
                margin: 30,
                center: true
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

    /////// SELECT YEAR
    var currentYear = new Date().getFullYear();
    for (var i = currentYear; i >= 1900; i--) {
        $('#yearSelect').append($('<option>', {
            value: i,
            text: i
        }));
    };

    /////// PASSWORD SHOW & HIDE WITH ICON
    $('.pass-group i').click(function () {
        $(this).toggleClass("gol-eye gol-eye-slash");
        var input = $(this).siblings('.pass-group input');
        if (input.attr('type') == 'password') {
            input.attr('type', 'text');
        } else {
            input.attr('type', 'password');
        }
    });

    /////// PRIVIEW TRIBUTE SLIDER
    $('.pre-tribute-slider').owlCarousel({
        loop: true,
        items: 1,
        margin: 10,
        nav: true,
        fade: true,
        autoplay: 3000,
        smartSpeed: 1000,
        dots: false,
        navText: ["<i class='gol-chevron-left'>", "<i class='gol-chevron-right'>"]
    });

    /////// TEXTAREACHARACTER COUNT
    // Update character count on page load and on input
    $('.charCountArea').on('input', function () {
        const charCount = $(this).val().length;
        $(this).siblings('.char-counter').find('.charCount').text(charCount);
    }).each(function () {
        // Ensure initial count is set for pre-filled text
        const charCount = $(this).val().length;
        $(this).siblings('.char-counter').find('.charCount').text(charCount);
    });

});
