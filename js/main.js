"use strict"
//ハンバーガー
$(".l-header__hb-btn").click(function () {
    $(".l-header__hb-btn").toggleClass('active');
    $(".l-header__nav").toggleClass('active');
})
$(".l-header__nav ul li a").click(function () {
    $(".l-header__hb-btn").removeClass('active');
    $(".l-header__nav").removeClass('active');
})

//スライド
const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

//アコーディオン
$(".qa-title").on('click', function () {
    $(this).toggleClass('active');
    $(this).next().slideToggle();
})