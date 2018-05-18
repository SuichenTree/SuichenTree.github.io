$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 8000)                    //8000 是指返回顶部按钮在什么位置显示
            $('div.go-top').show();
        else
            $('div.go-top').hide();
    });
    $('div.go-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 1000);       //1000 是指返回顶部的速度，越小越快
    });
});