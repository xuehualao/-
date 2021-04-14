console.log(cookie);
$.ajax({
    type: "get",
    url: `http://jx.xuzhixiang.top/ap/api/detail.php?id=${cookie}`,
    success: function (result) {
        localStorage.setItem("productData", JSON.stringify(result.data));
        var productData = JSON.parse(localStorage.getItem("productData"));
        let str = "";
        productData.forEach((item) => {
            str += `
            <div data-id=${item['pid']} class="s1 swiper-slide">
            <img src="${item['pimg']}" alt="">
            <p>Charme</p>
            <span>${item['pname']}</span>
            <i>$${item['pprice']}</i>
            </div>
            `
        })
        $("#sww").html(str)
        clicklist()
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 4,   // 当前展示的个数
            spaceBetween: 30,   // 每个swiper-slide之间的距离
            slidesPerGroup: 1,  // 步进数
            loop: true,			// 是否循环
            loopFillGroupWithBlank: true,  // 在最后一个是否展示前面的个数
            pagination: {
                el: '.swiper-pagination',  // 你原点的类名
                clickable: true,           // 是否可以点击
            },
            navigation: {
                nextEl: '.swiper-button-next',  // 下一个按钮类名
                prevEl: '.swiper-button-prev',  // 上一个按钮类名
            },
        });
        if (getCookie("uid")) {
            $(".logw").css("display", "none");
            $(".xinyuan").css("left", "18px")
            $(".yuan").css("left", "110px")
        }
    }
})