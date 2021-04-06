$(document).ready(function () {
    $(document).on("scroll", onScroll);
});

function onScroll(event){
    var scrollPos = $(document).scrollTop()+160;
    try {
        $('.top-affix a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("target"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.top-affix ul li a').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });

        var scrollValue = $(window).scrollTop();
        if (scrollValue > 120) {
            $('.top-affix').addClass('affix');
        } else{
            $('.top-affix').removeClass('affix');
        }
    } catch (error) {}
}

/* $(window).on('scroll', function (event) {
    var scrollValue = $(window).scrollTop();
    if (scrollValue > 120) {
        $('.top-affix').addClass('affix');
    } else{
        $('.top-affix').removeClass('affix');
    }
}); */