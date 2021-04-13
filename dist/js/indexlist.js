$.ajax({type:"get",url:"http://jx.xuzhixiang.top/ap/api/productlist.php?uid=51139",contentType:"jsonp",success:function(a){localStorage.setItem("productData",JSON.stringify(a.data));a=JSON.parse(localStorage.getItem("productData"));let t="";a.forEach(a=>{t=`
            <div data-id=${a.pid} class="s1 swiper-slide">
            <img src="${a.pimg}" alt="">
            <p>Charme</p>
            <span>${a.pname}</span>
            <i>${a.pprice}</i>
            </div>
            `}),$(".swiper-slide").innerHtml=t,console.log(a)}}),console.log("abc");