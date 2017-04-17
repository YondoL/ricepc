
require.config({
    paths:{
        'jquery':'lib/jquery.min',
        'backbone':'lib/backbone',
        'css':'lib/css',
        'text':'lib/text',
        'underscore':'lib/underscore',
        'template':'lib/art-template',
        'lazyload':'lib/jquery.lazyload',
        'cookie':'lib/jquery.cookie'
    }
});

require([
        'jquery',
        'backbone',
        'template',
        'cookie',
        'router.js'
    ],

    function($,backbone){
        // var api = "http://api.upshequ.com/"
        var api = 'http://192.168.1.133:8080/up/';

        Backbone.history.start();
        var userDropDown = $('.user-drop-down'),
            mousemoveTimer;
        //滑过显示个人菜单
        $('.user-set-up').on('mouseenter',function () {
            mousemoveTimer = setTimeout(function () {
                userDropDown.fadeIn();
            },300)
        }).on('mouseleave',function (e) {
            clearTimeout(mousemoveTimer)
            userDropDown.fadeOut();
        })
        userDropDown.on('click','a',function () {
            var index = $(this).index();
            var leftSetNav = $('.left-set-nav a');
            $(this).addClass('active').siblings('a').removeClass('active');
            leftSetNav.removeClass('active');
            leftSetNav.eq(index).addClass('active');
        });

        // 登录注册忘记密码
        $(".register").on("click",function(){
            $(".wrap-shade").slideDown(500);
            $(".register-div").css("display","inline-block");
        })
        $(".logn").on("click",function(){
            $(".wrap-shade").slideDown(500);
            $(".order-div").css("display","inline-block");
        })
            // 跳转到 已有已有账号登录
        $(".to-accout").on("click",function(){
            $(".register-div").slideUp(300);
            setTimeout(function(){$(".order-div").css("display","inline-block").slideDown(300)},400)
        })
            // 跳转到 忘记密码
        $(".to-forget").on("click",function(){
            $(".order-div").slideUp(300);
            setTimeout(function(){$(".forget-div").css("display","inline-block").slideDown(300)},400)
        })
        
       
        $(".btn-clo").on("click",function(){
            // $(".wrap-shade").fadeOut(500);
            $(".wrap-shade").slideUp(500);
            setTimeout(function(){$(".reg-log-wrap").css("display","none")},500)
            
        })

    // ----------------------------------------------------登录
        // 获取验证码
        var curCount = 6;
        $(".code-reg").on("click",sendMessage);
        function sendMessage(){
            var phone = $(".input-tel-num").val();
            var data ={
                "phone":phone,
                "type":4
            }
            if(phone != ""){
                $(".code-forget").attr("disabled","disabled");    
                if((/^1[34578]\d{9}$/.test(phone))){
                    $(".code-reg").html(curCount + "秒重新获取");
                    var timer = setInterval(setRemainTime,1000);
                    $.ajax({
                        type:"GET",
                        url:api + "api/user/getMessageCode",
                        data:data,
                        datatype:'json',
                        success:function(msg){
                            console.log("success");
                            console.log(msg);
                        },
                        error:function(msg){
                            console.log("error");
                            console.log(msg);
                        }
                    })
                }else{
                    alert("请输入合法手机号");
                }
            }else{
                alert("请输入手机号");
            }
            function setRemainTime(){
                if(curCount == 0){
                    clearInterval(timer);
                    $(".code-reg").removeAttr('disabled');
                    $('.code-reg').html('重新获取');
                    curCount = 6;
                }else{
                    curCount -- ;
                    $('.code-reg').html(curCount + '秒重新获取');
                }
            }
        }
        // 进行登录
        $(".btn-to-tel").on("click",sendLoginReq);
        function sendLoginReq(){
            var phone = $(".input-tel-num").val();
            var codeNum = $(".input-code").val();
            var data = {
                "phone":phone,
                "code":codeNum
            }
            $.ajax({
                type:"GET",
                url:api + "api/user/loginByCode",
                data:data,
                datatype:"json",
                success:function(msg){
                    console.log("登录成功");
                    console.log(msg);
                    var cookie = msg.cookie,
                        userId = msg.userId,
                        psd = msg.password;
                    $.cookie('userId',userId,{ path: "/",expires: 30});
                    $.cookie('ccookie',cookie,{ path: "/",expires: 30});
                    $.cookie('pad',psd,{ psth: "/",expires: 30});
                },
                error:function(msg){
                    var return_msg = JSON.parse(msg.responseText).code
                    console.log(return_msg);
                    alert("验证码不正确");
                    $(".input-password").focus();
                }
            })
        }
        // 用户协议
        $(".to-userLaw").on("click",function(){
            window.location.href = "./arragement.html";
        })


    // ------------------------------------------------已有账户登录
        $(".btn-to-user").on("click",sendLoginTel);
        function sendLoginTel(){
            var phone = $(".input-tel").val();
            var password = $(".input-password").val();
            if(phone == ""){
                alert("请输入手机号");
                $(".input-tel").focus();
            }else if(password == ""){
                alert("请输入密码");
                $(".input-password").focus();
            }else{
                $.ajax({
                    type:"GET",
                    url:api + "api/user/login",
                    data:{"phone":phone,"psw":password},
                    datatype:"json",
                    success:function(msg){
                        console.log("登录成功");
                        console.log(msg)
                        // window.location.href = "./"
                    },
                    error:function(msg){
                        console.log("登录失败");
                        console.log(msg);
                        var return_msg = JSON.parse(msg.responseText).code
                        console.log(return_msg);
                    }
                })
            }
        }
        // 跳转到忘记密码
        $(".to-forget").on("click",function(){
            // window.location.href = "./"
        })

    // ---------------------------------------------忘记密码
            // 获取验证码
        $(".code-forget").on("click",function(){
            var phone = $(".input-tel").val();
            if(pnone != ""){
                $.ajax({
                    url:api + "api/user/findPassWord",
                    type:"GET",
                    data:{"phone":phone,"type":2},
                    datatype:"json",
                    success:function(msg){
                        console.log("获取验证码成功");
                        console.log(msg);
                    },
                    error:function(msg){
                        console.log("获取验证码失败");
                        var return_msg = JSON.parse(msg.responseText).code
                        console.log(return_msg);
                    }
                })
            }else{
                alert("请输入手机号");
            }
        })
            // 进行找回密码
        $(".btn-to-verify").on("click",function(){
            var phone = $(".input-tel").val(),
                codeNum = $(".input-code").val(),
                passwordF = $(".input-password").val(),
                passwordS = $(".input-password-verify").val();
            

            if(phone == ""){
                alert("请输入手机号");
                $(".input-tel").focus();
            }else if(codeNum == ""){
                alert("请输入验证码");
                $(".input-code").focus();
            }else if(passwordF == ""){
                alert("请输入密码");
                $(".input-password").focus();
            }else if(passwordS == ""){
                alert("请输入确认密码");
                $(".input-password-verify").focus();
            }else{
                var data = {
                    "phone":phone,
                    "codeNum":codeNum,
                    "password":passwordF,
                    "password":passwordS
                }
                // $.ajax({
                //     url:api + "api/user/findPassWord",
                //     type:"POST",
                //     data:data,
                //     datatype:"json",
                //     // contentType:"application/json;charset=utf-8"
                //     success:function(msg){
                //         console.log("找回密码成功");
                //         console.log(msg);
                //     },
                //     error:function(msg){
                //         console.log("找回密码失败");
                //         var return_msg = JSON.parse(msg.responseText).code
                //         console.log(return_msg);
                //     }
                // })
            }
        })


    });

