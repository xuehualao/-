var pid = getCookie("pid");
var uid = getCookie("uid");
$.ajax({
    type: "get",
    url: `http://jx.xuzhixiang.top/ap/api/detail.php?id=${pid}`,
    success: function (result) {
        localStorage.setItem("productData", JSON.stringify(result.data));
        var productData = JSON.parse(localStorage.getItem("productData"));
        let str = "";
        console.log(productData.pname, "---");
        str += `
                    <div class="col-md-7 col-xs-12 col-img ">
                        <img class="my-foto" src="${productData.pimg}" data-large="./img/full.jpg" title="Фото">
                    </div>
                    <div class="col-md-5 col-ctn">
                        <div class="protitle">Charme</div>
                        <h4>${productData.pname}</h4>
                        <p>￥${productData.pprice}</p>
                        <div class="promd"></div>
                        <a class="fackbtn">
                            只需100块，随意选择您喜爱的Charme
                        </a>
                        <a class="joincart" data-uid="${productData.uid}" data-id="${productData.pid}">
                            加入购物袋
                        </a>
                        <a class="round">
                            即时分店库存查询
                        </a>
                        <div class="p">需要协助？ (+86) 400 830 1878</div>
                    </div>
            `
        $("main").html(str)
        // if (getCookie()) {
        //     $(".logw").css("display", "none");
        //     $(".xinyuan").css("left", "18px")
        //     $(".yuan").css("left", "110px")
        //}
    }
})
