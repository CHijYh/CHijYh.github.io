/*global $, document*/
$(document).ready(function () {
    $(".slider").slick({
        dots: true,
        infinite: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1
                }
            }
        ],
        slidesToScroll: 3,
        slidesToShow: 3,
        speed: 500
    });
});