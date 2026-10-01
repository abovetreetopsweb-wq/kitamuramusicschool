"use strict"
//ハンバーガー
$(".p-header__hb-btn").click(function () {
    $(".p-header__hb-btn").toggleClass('active');
    $(".p-header__nav").toggleClass('active');
})
$(".p-header__nav ul li a").click(function () {
    $(".p-header__hb-btn").removeClass('active');
    $(".p-header__nav").removeClass('active');
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

var goTop = $(".c-fixed-buttons");//変数宣言と代入
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
$(".c-page-top").on("click", function () {
    $("body,html").animate({ scrollTop: 0 }, 1000);
    return false;
})



// 下層：plan スクロールバー
const contents = document.querySelector(".p-price-plans__contents");
const scrollbar = document.querySelector(".p-price-plans__scrollbar");
const thumb = document.querySelector(".p-price-plans__scrollbar-thumb");

// 料金表があるページだけ実行
if (contents && scrollbar && thumb) {
    // テーブルの位置に合わせてバーを動かす
    const updateThumb = () => {
        const maxScroll = contents.scrollWidth - contents.clientWidth;
        const maxMove = scrollbar.clientWidth - thumb.clientWidth;

        const ratio = maxScroll > 0
            ? contents.scrollLeft / maxScroll
            : 0;

        thumb.style.transform =
            `translateX(${Math.max(0, maxMove) * ratio}px)`;
    };

    contents.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);
    updateThumb();

    let dragId = null;
    let startX = 0;
    let startScroll = 0;

    // バーをつかんだ瞬間の位置を覚える
    thumb.addEventListener("pointerdown", (event) => {
        if (dragId !== null || event.button !== 0) return;

        dragId = event.pointerId;
        startX = event.clientX;
        startScroll = contents.scrollLeft;

        // バーの外に指・マウスが出ても操作を続ける
        thumb.setPointerCapture(event.pointerId);
    });

    // つかんだまま動かした分、テーブルをスクロール
    thumb.addEventListener("pointermove", (event) => {
        if (event.pointerId !== dragId) return;

        const maxScroll = contents.scrollWidth - contents.clientWidth;
        const maxMove = scrollbar.clientWidth - thumb.clientWidth;

        if (maxScroll <= 0 || maxMove <= 0) return;

        const distance = event.clientX - startX;

        contents.scrollLeft =
            startScroll + distance * (maxScroll / maxMove);
    });

    // 指・マウスを離したら終了
    const stopDrag = (event) => {
        if (event.pointerId !== dragId) return;

        dragId = null;

        if (thumb.hasPointerCapture(event.pointerId)) {
            thumb.releasePointerCapture(event.pointerId);
        }
    };

    thumb.addEventListener("pointerup", stopDrag);
    thumb.addEventListener("pointercancel", stopDrag);
    thumb.addEventListener("lostpointercapture", stopDrag);
}