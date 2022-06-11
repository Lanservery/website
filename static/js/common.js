
// 面向过程

$(function() {
    var slide={
        stop:true,//控制是否继续执行
        animate:false,//判断是否执行动画
        prevEvent:function(){
            var prev=$(".prev")
            prev.click(function() {
                var ul = $(".hot ul");
                if(slide.animate) return;
                slide.animate=true;
                // 现将最后一个li放到首位
                ul.find("li").last().prependTo(ul)
                // 在将首位li隐藏
                ul.css("left","-1002px")
                ul.animate({
                    left:0
                },800,function() {
                    slide.animate=false;
                })
                
            })
        },
        nextEvent:function() {
            var next=$(".next")
            next.click(function() {
                var ul = $(".hot ul");
                if(slide.animate) return;
                slide.animate=true;
                ul.animate({
                    left: "-1002px"
                },800,function() {
                    // 将移走的第一个li移动到ul的后面
                    ul.find("li").eq(0).appendTo(ul)
                    // 再将原本已经移动过的ul还原
                    ul.css("left",0);
                    slide.animate=false;
                })
                
            })
        },
        init:function() {
            setInterval(function() {
                if(slide.stop) return;
                if(slide.animate) return;
                slide.animate=true;
                var ul = $(".hot ul");
                ul.animate({
                    left: "-1002px"
                },800,function() {
                    // 将移走的第一个li移动到ul的后面
                    ul.find("li").eq(0).appendTo(ul)
                    // 再将原本已经移动过的ul还原
                    ul.css("left",0);
                    slide.animate=false;
                }) 
            },2000)

            $(".slide-box").mouseover(function() {
                slide.stop=true;
            })
            $(".slide-box").mouseout(function() {
                slide.stop=false;
            })
            this.prevEvent();//添加翻页功能
            this.nextEvent();
        }
    }
    slide.init();

    
    //ajax请求数据
    var indexNum = 0;//统计当前请求次数
    $(".comMore").click(function() {
        var self = $(this);
        self.html("正在加载...").removeClass("cl").addClass("fa fa-hourglass-2");
        $.ajax({
            type:"post",
            url:"/static/json/json.js",
            dataType:"json",
            success:function(data) {
                var data1 = data[indexNum];
                var param = "";
                for(var i = 0; i < data1.length; i ++) {
                    param += '<li><img src="'+data1[i].img+'" widt"222" height="130"><div class="info"><p class="name">'+data1[i].text+'</p><div class="fix"><span class="left price">'+data1[i].price+'</span><p class="right"><span class="xin"><i class="fa fa-heart"></i> 3</span><span class="look"><i class="fa fa-comment"></i> 3</span></p></div></div></li>'

                }
                self.parent().prev().append(param);
                indexNum++
                self.html("点击加载更多 <span class='fa fa-angle-double-right'></span>").removeClass("fa fa-hourglass-2").addClass("cl");
                if(indexNum >= data.length) {
                    self.parent().html("<span class='no-more'>没有更多了~</span>");
                }
            }
        })
    })

    //返回顶部按钮
    $(window).scroll(function() {
        if($(window).scrollTop()>100) {
            $("#backTop").show();
        }else{
            $("#backTop").hide();
        }
    })
    $("#backTop").click(function() {
        $("html,body").animate({
            scrollTop:0
        },800)
    })
})

