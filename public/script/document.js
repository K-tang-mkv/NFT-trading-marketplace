window.addEventListener("load", function () {
    var banner_works = document.querySelector(".banner-works");
    var short_cut_li2 = document.querySelector(".shortcut_nav_li2");
    fn(short_cut_li2);
    var short_cut_li1 = document.querySelector(".shortcut_nav_li1");
    fn(short_cut_li1);
    var short_cut_li3 = document.querySelector(".shortcut_nav_li3");
    fn(short_cut_li3);
    function fn(obj) {
        obj.addEventListener("mousemove", function () {
            banner_works.style.zIndex = "-1";
            obj.style.overflow = "visible";

        })
        obj.addEventListener("mouseleave", function () {
            banner_works.style.zIndex = "0";
            obj.style.overflow = "hidden";

        })

    }
})