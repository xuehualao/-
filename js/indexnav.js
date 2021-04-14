$(function () {
    $(function () {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 120) {
                $(".navBottom2").show();
            }
            else {
                $(".navBottom2").hide();
            }
        });
    });
});
