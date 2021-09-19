window.addEventListener("load", function () {
    var textarea = document.querySelector("textarea");
    fn1(textarea);
    var input1 = document.querySelector(".input1");
    fn1(input1);
    var input0 = document.querySelector(".input0");
    fn1(input0);
    var BlockChain = document.querySelector(".BlockChain");
    var polygon = document.querySelector(".polygon");
    var Ethereum = document.querySelector(".Ethereum");
    function fn1(obj) {
        document.addEventListener("click", function (e) {
            if (e.target == obj) {
                obj.className = "shadow";
            } else {
                obj.className = "";
            }
        })
    }
    var flag = 1;
    if (flag%2==1) {
        BlockChain.addEventListener("click", function (e) {
            BlockChain.style.overflow = "visible";
            // Ethereum.style.position="absolute";
            // polygon.style.position="absolute";
            // polygon.style.zIndex="1";
            // polygon.style.top="100%";
            flag ++;
            e.stopPropagation();
        });       
    } else {
       Ethereum.addEventListener("click", function (e) {
            // if (e.target == Ethereum) {
            BlockChain.style.overflow = "hidden"; 
            Ethereum.style.top = "0";
            polygon.style.top = "100px";
            flag ++;
            e.stopPropagation();

        });
        polygon.addEventListener("click", function (e) {
            // if (e.target == Ethereum) {
            BlockChain.style.overflow = "hidden";
            Ethereum.style.top = "100px";
            polygon.style.top = "0";
            flag ++;
            e.stopPropagation();
        });
    }

})