var pid=getCookie("pid"),uid=getCookie("uid");$.ajax({type:"get",url:`http://jx.xuzhixiang.top/ap/api/detail.php?id=${pid}`,success:function(a){localStorage.setItem("productData",JSON.stringify(a.data));var i=JSON.parse(localStorage.getItem("productData")),a="";console.log(i.pname,"---"),a+=`
                    <div class="col-md-7 col-xs-12 col-img ">
                        <img class="my-foto" src="${i.pimg}" data-large="./img/full.jpg" title="Фото">
                    </div>
                    <div class="col-md-5 col-ctn">
                        <div class="protitle">Charme</div>
                        <h4>${i.pname}</h4>
                        <p>￥${i.pprice}</p>
                        <div class="promd"></div>
                        <a class="fackbtn">
                            只需100块，随意选择您喜爱的Charme
                        </a>
                        <a class="joincart" data-uid="${i.uid}" data-id="${i.pid}">
                            加入购物袋
                        </a>
                        <a class="round">
                            即时分店库存查询
                        </a>
                        <div class="p">需要协助？ (+86) 400 830 1878</div>
                    </div>
            `,$("main").html(a)}});