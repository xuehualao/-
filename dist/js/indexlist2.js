$(".s1").click(function(){JSON.parse(localStorage.getItem("productData"));let t=JSON.parse(t);console.log(t),setCookie("pid",localStorage.getItem("productData","pid"))});