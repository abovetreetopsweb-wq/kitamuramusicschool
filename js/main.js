"use strict"
//ハンバーガー
$(".l-header__hb-btn").click(function () {
    $(".l-header__hb-btn").toggleClass('active');
    $(".l-header__nav").toggleClass('active');
})
$(".l-header__nav ul li a").click(function () {
    $(".l-header__hb-btn").removeClass('active');
    $(".l-header__nav").removeClass('active');
});



//スライド
const swiper = new Swiper('.p-voice__contents', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
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
});

//topへ戻る

var goTop = $(".c-fixed-bottons");//変数宣言と代入
var footer = $(".l-footer");

goTop.hide();//サイト上部ではボタンを非表示

//100pxスクロールしたらボタン表示・100px以下ならボタン非表示
$(window).on("scroll", function () {
    var scroll = $(this).scrollTop();

    if (scroll > 100) {
        goTop.fadeIn(300);
    } else {
        goTop.fadeOut(300)
    }


    //フッターとの衝突判定
    var windowBottom = scroll + $(window).height();
    var footerTop = footer.offset().top;

    if (windowBottom > footerTop) {
        goTop.css(
            "bottom",
            (windowBottom - footerTop) + "px"
        );
    } else {
        goTop.css("bottom", "");
    }
});

//ボタンがクリックされたら1秒でページトップへ戻る
goTop.on("click",function () {
    $("body,html").animate({ scrollTop: 0 }, 1000);
    return false;
})
