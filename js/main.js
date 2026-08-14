"use strict"
//ハンバーガー
$(".l-header__hb-btn").click(function(){
    $(".l-header__hb-btn").toggleClass('active');
    $(".l-header__nav").toggleClass('active');
})
$(".l-header__nav ul li a").click(function(){
    $(".l-header__hb-btn").removeClass('active');
    $(".l-header__nav").removeClass('active');
})