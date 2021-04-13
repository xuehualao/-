$.ajax({
    type: "get",
    url: `http://jx.xuzhixiang.top/ap/api/productlist.php?${"uid=51139"}`,
    contentType: "jsonp",
    success: function (result) {
        localStorage.setItem("productData", JSON.stringify(result.data));
        var productData = JSON.parse(localStorage.getItem("productData"));
        let str = "";
        productData.forEach((item) => {
            str = `
            <div data-id=${item['pid']} class="s1 swiper-slide">
            <img src="${item['pimg']}" alt="">
            <p>Charme</p>
            <span>${item['pname']}</span>
            <i>${item['pprice']}</i>
            </div>
            `
        })
        // for (let pid in productData) {
        //     str = `
        //     <div data-id=${productData[pid]} class="s1 swiper-slide">
        //     <img src="${productData[pimg]}" alt="">
        //     <p>Charme</p>
        //     <span>${productData[pname]}</span>
        //     <i>${productData[pprice]}</i>
        //     </div>
        //     `
        // }
        $(".swiper-slide").innerHtml = str;
        console.log(productData);
    }
})
console.log("abc");