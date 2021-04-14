console.log(cookie),$.ajax({type:"get",url:`http://jx.xuzhixiang.top/ap/api/detail.php?id=${cookie}`,success:function(e){localStorage.setItem("productData",JSON.stringify(e.data));e=JSON.parse(localStorage.getItem("productData"));let i="";e.forEach(e=>{i+=`
            <div data-id=${e.pid} class="s1 swiper-slide">
            <img src="${e.pimg}" alt="">
            <p>Charme</p>
            <span>${e.pname}</span>
            <i>$${e.pprice}</i>
            </div>
            `}),$("#sww").html(i),clicklist();new Swiper(".swiper-container",{slidesPerView:4,spaceBetween:30,slidesPerGroup:1,loop:!0,loopFillGroupWithBlank:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});getCookie("uid")&&($(".logw").css("display","none"),$(".xinyuan").css("left","18px"),$(".yuan").css("left","110px"))}});