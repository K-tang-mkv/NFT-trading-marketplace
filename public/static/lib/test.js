window.addEventListener("load", function () {
    var photo = document.querySelector(".market_banner_photo_list");
    var btn = document.querySelector(".photo_list_photo_button");
    fn(photo);
    function fn(obj) {
        obj.addEventListener("mousemove", function () {
            obj.style.display = "block";

        })
        obj.addEventListener("mouseleave", function () {
            obj.style.display = "none";
        })

    }
})
