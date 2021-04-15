var id=getCookie("id");$.ajax({type:"get",url:`http://jx.xuzhixiang.top/ap/api/productlist.php?uid=${id}`,success:function(i){localStorage.setItem("productData",JSON.stringify(i.data));i=JSON.parse(localStorage.getItem("productData"));let e="";i.forEach(i=>{e+=`
            <div data-id=${i.pid} class="s1 swiper-slide">
            <img src="${i.pimg}" alt="">
            <p>Charme</p>
            <span>${i.pname}</span>
            <i>$${i.pprice}</i>
            </div>
            `}),$("#sww").html(e),clicklist();new Swiper(".swiper-container",{slidesPerView:4,spaceBetween:30,slidesPerGroup:1,loop:!0,loopFillGroupWithBlank:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});getCookie("uid")&&($(".logw").css("display","none"),$(".xinyuan").css("left","18px"),$(".yuan").css("left","110px"))}});