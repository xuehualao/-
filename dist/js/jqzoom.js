!function($){var isIE6=!1,body=$(document.body),window=$(window),jqzoompluging_disabled=!1;$.fn.jqzoom=function(e){return this.each(function(){"a"==this.nodeName.toLowerCase()&&new jqzoom(this,e)})},jqzoom=function(el,options){var api=null,api=$(el).data("jqzoom");if(api)return api;var obj=this,settings=$.extend({},$.jqzoom.defaults,options||{});obj.el=el,el.rel=$(el).attr("rel"),el.zoom_active=!1,el.zoom_disabled=!1,el.largeimageloading=!1,el.largeimageloaded=!1,el.scale={},el.timer=null,el.mousepos={},el.mouseDown=!1,$(el).css({"outline-style":"none","text-decoration":"none"});var img=$("img:eq(0)",el);el.title=$(el).attr("title"),el.imagetitle=img.attr("title");var zoomtitle=0<$.trim(el.title).length?el.title:el.imagetitle,smallimage=new Smallimage(img),lens=new Lens,stage=new Stage,largeimage=new Largeimage,loader=new Loader;$(el).bind("click",function(e){return e.preventDefault(),!1});var zoomtypes=["standard","drag","innerzoom","reverse"];function Smallimage(image){var $obj=this;return this.node=image[0],this.findborder=function(){var bordertop=0,bordertop=image.css("border-top-width");btop="";var borderleft=0,borderleft=image.css("border-left-width");if(bleft="",bordertop)for(i=0;i<3;i++){var x=[],x=bordertop.substr(i,1);if(0!=isNaN(x))break;btop=btop+""+bordertop.substr(i,1)}if(borderleft)for(i=0;i<3&&!isNaN(borderleft.substr(i,1));i++)bleft+=borderleft.substr(i,1);$obj.btop=0<btop.length?eval(btop):0,$obj.bleft=0<bleft.length?eval(bleft):0},this.fetchdata=function(){$obj.findborder(),$obj.w=image.width(),$obj.h=image.height(),$obj.ow=image.outerWidth(),$obj.oh=image.outerHeight(),$obj.pos=image.offset(),$obj.pos.l=image.offset().left+$obj.bleft,$obj.pos.t=image.offset().top+$obj.btop,$obj.pos.r=$obj.w+$obj.pos.l,$obj.pos.b=$obj.h+$obj.pos.t,$obj.rightlimit=image.offset().left+$obj.ow,$obj.bottomlimit=image.offset().top+$obj.oh},this.node.onerror=function(){throw alert("Problems while loading image."),"Problems while loading image."},this.node.onload=function(){$obj.fetchdata(),0==$(".zoomPad",el).length&&obj.create()},$obj}function Loader(){return this.append=function(){this.node=$("<div/>").addClass("zoomPreload").css("visibility","hidden").html(settings.preloadText),$(".zoomPad",el).append(this.node)},this.show=function(){this.node.top=(smallimage.oh-this.node.height())/2,this.node.left=(smallimage.ow-this.node.width())/2,this.node.css({top:this.node.top,left:this.node.left,position:"absolute",visibility:"visible"})},this.hide=function(){this.node.css("visibility","hidden")},this}function Lens(){var t=this;return this.node=$("<div/>").addClass("zoomPup"),this.append=function(){$(".zoomPad",el).append($(this.node).hide()),"reverse"==settings.zoomType&&(this.image=new Image,this.image.src=smallimage.node.src,$(this.node).empty().append(this.image))},this.setdimensions=function(){this.node.w=parseInt(settings.zoomWidth/el.scale.x)>smallimage.w?smallimage.w:parseInt(settings.zoomWidth/el.scale.x),this.node.h=parseInt(settings.zoomHeight/el.scale.y)>smallimage.h?smallimage.h:parseInt(settings.zoomHeight/el.scale.y),this.node.top=(smallimage.oh-this.node.h-2)/2,this.node.left=(smallimage.ow-this.node.w-2)/2,this.node.css({top:0,left:0,width:this.node.w+"px",height:this.node.h+"px",position:"absolute",display:"none",borderWidth:"1px"}),"reverse"==settings.zoomType&&(this.image.src=smallimage.node.src,$(this.node).css({opacity:1}),$(this.image).css({position:"absolute",display:"block",left:-(this.node.left+1-smallimage.bleft)+"px",top:-(this.node.top+1-smallimage.btop)+"px"}))},this.setcenter=function(){this.node.top=(smallimage.oh-this.node.h-2)/2,this.node.left=(smallimage.ow-this.node.w-2)/2,this.node.css({top:this.node.top,left:this.node.left}),"reverse"==settings.zoomType&&$(this.image).css({position:"absolute",display:"block",left:-(this.node.left+1-smallimage.bleft)+"px",top:-(this.node.top+1-smallimage.btop)+"px"}),largeimage.setposition()},this.setposition=function(e){el.mousepos.x=e.pageX,el.mousepos.y=e.pageY;var t,o,s,i,a=0,e=0;a=el.mousepos.x+smallimage.bleft-smallimage.pos.l-(this.node.w+2)/2,e=el.mousepos.y+smallimage.btop-smallimage.pos.t-(this.node.h+2)/2,o=this.node,el.mousepos.x-o.w/2<smallimage.pos.l?a=smallimage.bleft-1:(t=this.node,el.mousepos.x+t.w/2>smallimage.pos.r&&(a=smallimage.w+smallimage.bleft-this.node.w-1)),i=this.node,el.mousepos.y-i.h/2<smallimage.pos.t?e=smallimage.btop-1:(s=this.node,el.mousepos.y+s.h/2>smallimage.pos.b&&(e=smallimage.h+smallimage.btop-this.node.h-1)),this.node.left=a,this.node.top=e,this.node.css({left:a+"px",top:e+"px"}),"reverse"==settings.zoomType&&$(this.image).css({position:"absolute",display:"block",left:-(this.node.left+1-smallimage.bleft)+"px",top:-(this.node.top+1-smallimage.btop)+"px"}),largeimage.setposition()},this.hide=function(){img.css({opacity:1}),this.node.hide()},this.show=function(){"innerzoom"==settings.zoomType||!settings.lens&&"drag"!=settings.zoomType||this.node.show(),"reverse"==settings.zoomType&&img.css({opacity:settings.imageOpacity})},this.getoffset=function(){var e={};return e.left=t.node.left,e.top=t.node.top,e},this}function Stage(){var t=this;this.node=$("<div class='zoomWindow'><div class='zoomWrapper'><div class='zoomWrapperTitle'></div><div class='zoomWrapperImage'></div></div></div>"),this.ieframe=$('<iframe class="zoomIframe" src="javascript:\'\';" marginwidth="0" marginheight="0" align="bottom" scrolling="no" frameborder="0" ></iframe>'),this.setposition=function(){if(this.node.leftpos=0,this.node.toppos=0,"innerzoom"!=settings.zoomType)switch(settings.position){case"left":this.node.leftpos=0<smallimage.pos.l-smallimage.bleft-Math.abs(settings.xOffset)-settings.zoomWidth?0-settings.zoomWidth-Math.abs(settings.xOffset):smallimage.ow+Math.abs(settings.xOffset),this.node.toppos=Math.abs(settings.yOffset);break;case"top":this.node.leftpos=Math.abs(settings.xOffset),this.node.toppos=0<smallimage.pos.t-smallimage.btop-Math.abs(settings.yOffset)-settings.zoomHeight?0-settings.zoomHeight-Math.abs(settings.yOffset):smallimage.oh+Math.abs(settings.yOffset);break;case"bottom":this.node.leftpos=Math.abs(settings.xOffset),this.node.toppos=smallimage.pos.t-smallimage.btop+smallimage.oh+Math.abs(settings.yOffset)+settings.zoomHeight<screen.height?smallimage.oh+Math.abs(settings.yOffset):0-settings.zoomHeight-Math.abs(settings.yOffset);break;default:this.node.leftpos=smallimage.rightlimit+Math.abs(settings.xOffset)+settings.zoomWidth<screen.width?smallimage.ow+Math.abs(settings.xOffset):0-settings.zoomWidth-Math.abs(settings.xOffset),this.node.toppos=Math.abs(settings.yOffset)}return this.node.css({left:this.node.leftpos+"px",top:this.node.toppos+"px"}),this},this.append=function(){var e;$(".zoomPad",el).append(this.node),this.node.css({position:"absolute",display:"none",zIndex:5001}),"innerzoom"==settings.zoomType&&(this.node.css({cursor:"default"}),e=0==smallimage.bleft?1:smallimage.bleft,$(".zoomWrapper",this.node).css({borderWidth:e+"px"})),$(".zoomWrapper",this.node).css({width:Math.round(settings.zoomWidth)+"px",borderWidth:e+"px"}),$(".zoomWrapperImage",this.node).css({width:"100%",height:Math.round(settings.zoomHeight)+"px"}),$(".zoomWrapperTitle",this.node).css({width:"100%",position:"absolute"}),$(".zoomWrapperTitle",this.node).hide(),settings.title&&0<zoomtitle.length&&$(".zoomWrapperTitle",this.node).html(zoomtitle).show(),t.setposition()},this.hide=function(){"fadeout"===settings.hideEffect?this.node.fadeOut(settings.fadeoutSpeed,function(){}):this.node.hide(),this.ieframe.hide()},this.show=function(){"fadein"===settings.showEffect?(this.node.fadeIn(),this.node.fadeIn(settings.fadeinSpeed,function(){})):this.node.show(),isIE6&&"innerzoom"!=settings.zoomType&&(this.ieframe.width=this.node.width(),this.ieframe.height=this.node.height(),this.ieframe.left=this.node.leftpos,this.ieframe.top=this.node.toppos,this.ieframe.css({display:"block",position:"absolute",left:this.ieframe.left,top:this.ieframe.top,zIndex:99,width:this.ieframe.width+"px",height:this.ieframe.height+"px"}),$(".zoomPad",el).append(this.ieframe),this.ieframe.show())}}function Largeimage(){var o=this;return this.node=new Image,this.loadimage=function(e){loader.show(),this.url=e,this.node.style.position="absolute",this.node.style.border="0px",this.node.style.display="none",this.node.style.left="-5000px",this.node.style.top="0px",document.body.appendChild(this.node),this.node.src=e},this.fetchdata=function(){var e=$(this.node),t={};this.node.style.display="block",o.w=e.width(),o.h=e.height(),o.pos=e.offset(),o.pos.l=e.offset().left,o.pos.t=e.offset().top,o.pos.r=o.w+o.pos.l,o.pos.b=o.h+o.pos.t,t.x=o.w/smallimage.w,t.y=o.h/smallimage.h,el.scale=t,document.body.removeChild(this.node),$(".zoomWrapperImage",el).empty().append(this.node),lens.setdimensions()},this.node.onerror=function(){throw alert("Problems while loading the big image."),"Problems while loading the big image."},this.node.onload=function(){o.fetchdata(),loader.hide(),el.largeimageloading=!1,el.largeimageloaded=!0,"drag"!=settings.zoomType&&!settings.alwaysOn||(lens.show(),stage.show(),lens.setcenter())},this.setposition=function(){var e=-el.scale.x*(lens.getoffset().left-smallimage.bleft+1),t=-el.scale.y*(lens.getoffset().top-smallimage.btop+1);$(this.node).css({left:e+"px",top:t+"px"})},this}$.inArray($.trim(settings.zoomType),zoomtypes)<0&&(settings.zoomType="standard"),$.extend(obj,{create:function(){0==$(".zoomPad",el).length&&(el.zoomPad=$("<div/>").addClass("zoomPad"),img.wrap(el.zoomPad)),"innerzoom"==settings.zoomType&&(settings.zoomWidth=smallimage.w,settings.zoomHeight=smallimage.h),0==$(".zoomPup",el).length&&lens.append(),0==$(".zoomWindow",el).length&&stage.append(),0==$(".zoomPreload",el).length&&loader.append(),(settings.preloadImages||"drag"==settings.zoomType||settings.alwaysOn)&&obj.load(),obj.init()},init:function(){"drag"==settings.zoomType&&($(".zoomPad",el).mousedown(function(){el.mouseDown=!0}),$(".zoomPad",el).mouseup(function(){el.mouseDown=!1}),document.body.ondragstart=function(){return!1},$(".zoomPad",el).css({cursor:"default"}),$(".zoomPup",el).css({cursor:"move"})),"innerzoom"==settings.zoomType&&$(".zoomWrapper",el).css({cursor:"crosshair"}),$(".zoomPad",el).bind("mouseenter mouseover",function(e){img.attr("title",""),$(el).attr("title",""),el.zoom_active=!0,smallimage.fetchdata(),el.largeimageloaded?obj.activate(e):obj.load()}),$(".zoomPad",el).bind("mouseleave",function(e){obj.deactivate()}),$(".zoomPad",el).bind("mousemove",function(e){return e.pageX>smallimage.pos.r||e.pageX<smallimage.pos.l||e.pageY<smallimage.pos.t||e.pageY>smallimage.pos.b?(lens.setcenter(),!1):(el.zoom_active=!0,el.largeimageloaded&&!$(".zoomWindow",el).is(":visible")&&obj.activate(e),void(el.largeimageloaded&&("drag"!=settings.zoomType||"drag"==settings.zoomType&&el.mouseDown)&&lens.setposition(e)))});var thumb_preload=new Array,i=0,thumblist=new Array,first,thumblist=$("a").filter(function(){var e=new RegExp("gallery[\\s]*:[\\s]*'"+$.trim(el.rel)+"'","i"),t=$(this).attr("rel");if(e.test(t))return this});0<thumblist.length&&(first=thumblist.splice(0,1),thumblist.push(first)),thumblist.each(function(){var thumb_options;settings.preloadImages&&(thumb_options=$.extend({},eval("("+$.trim($(this).attr("rel"))+")")),thumb_preload[i]=new Image,thumb_preload[i].src=thumb_options.largeimage,i++),$(this).click(function(e){return $(this).hasClass("zoomThumbActive")||(thumblist.each(function(){$(this).removeClass("zoomThumbActive")}),e.preventDefault(),obj.swapimage(this)),!1})})},load:function(){var e;0==el.largeimageloaded&&0==el.largeimageloading&&(e=$(el).attr("href"),el.largeimageloading=!0,largeimage.loadimage(e))},activate:function(e){clearTimeout(el.timer),lens.show(),stage.show()},deactivate:function(e){"drag"===settings.zoomType||(img.attr("title",el.imagetitle),$(el).attr("title",el.title),settings.alwaysOn?lens.setcenter():(stage.hide(),lens.hide())),el.zoom_active=!1},swapimage:function(link){el.largeimageloading=!1,el.largeimageloaded=!1;var options=new Object,options=$.extend({},eval("("+$.trim($(link).attr("rel"))+")"));if(!options.smallimage||!options.largeimage)throw alert("ERROR :: Missing parameter for largeimage or smallimage."),"ERROR :: Missing parameter for largeimage or smallimage.";var smallimage=options.smallimage,largeimage=options.largeimage;return $(link).addClass("zoomThumbActive"),$(el).attr("href",largeimage),img.attr("src",smallimage),lens.hide(),stage.hide(),obj.load(),!1}}),img[0].complete&&(smallimage.fetchdata(),0==$(".zoomPad",el).length&&obj.create()),$(el).data("jqzoom",obj)},$.jqzoom={defaults:{zoomType:"standard",zoomWidth:300,zoomHeight:300,xOffset:10,yOffset:0,position:"right",preloadImages:!0,preloadText:"Loading zoom",title:!0,lens:!0,imageOpacity:.4,alwaysOn:!1,showEffect:"show",hideEffect:"hide",fadeinSpeed:"slow",fadeoutSpeed:"2000"},disable:function(e){return $(e).data("jqzoom").disable(),!1},enable:function(e){return $(e).data("jqzoom").enable(),!1},disableAll:function(e){jqzoompluging_disabled=!0},enableAll:function(e){jqzoompluging_disabled=!1}}}(jQuery);