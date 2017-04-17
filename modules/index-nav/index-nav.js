define(
    [
        'text!./index-nav.html',
        'css!./index-nav.css'
    ],
    function (html) {
        function render() {
            $('.left-nav').html(html);
        };


        //ajax请求
        function data() {

        }

        //事件
        function event() {

            var  payCommunityList = $('.pay-community-list');

            //初始化
            initialize(location.hash)
            // //点击logo
            $('.header>a').on('click',function () {
                var $this = $(this);
                showIcon($this.attr('href'))
            });
            //Nav
            $('.left-nav').on('click','.main-icon',function () {
                var $this = $(this);
                if ($this.attr('href').indexOf('#') == -1) {
                    return;
                }
                if(payCommunityList.css('display') == 'block'){
                    $("#openPayMenu span").removeClass('icon-top-big').addClass('icon-bot-big')
                    payCommunityList.slideUp('slow');
                }
                if($this.attr('href').indexOf('#pay') != -1){
                    if(payCommunityList.css('display')=='none'){
                        payCommunityList.slideDown('slow');
                        $("#openPayMenu span").removeClass('icon-bot-big').addClass('icon-top-big')
                    }else{
                        payCommunityList.slideUp('slow');
                        $("#openPayMenu span").removeClass('icon-top-big').addClass('icon-bot-big')
                    }
                }
                showIcon($this.attr('href'))
            });

            function showIcon(hash) {
                var $this = $('.left-index-nav').find('a[href ="' + hash + '"]:eq(0)'),
                    mianIcon = $('.main-icon');
                    mianIcon.removeClass('bgColor active');
                    $this.addClass('bgColor active')
                    $(".left-index-nav i").each(function (i) {
                        var attrClass = $(this).attr('class'),
                            modClass = attrClass.split(' icon-sprite')[0];
                        if (modClass.substring(modClass.length - 3) == 'red') {
                            $(this).attr('class', attrClass.replace("red", "gray"))
                        }
                    });
                    $this.find('i').attr('class', $this.find('i').attr('class').replace("gray", "red"))
            }
            //二级菜单

            payCommunityList.on('click','a',function () {
                $(this).addClass('active').siblings('a').removeClass('active');
                $("#openPayMenu>a").attr('href', $(this).attr('href'))
            })

            //初始化
            function initialize(hash) {

                if(hash.indexOf('#pay')==-1){
                    showIcon(hash)
                }else{
                    var $this = $('#openPayMenu>a');
                    $this.addClass('bgColor active');
                    payCommunityList.slideDown('slow');
                    $("#openPayMenu span").removeClass('icon-bot-big').addClass('icon-top-big')
                    $this.find('i').attr('class', $this.find('i').attr('class').replace("gray", "red"))
                    var th = payCommunityList.find('a[href ="' + hash + '"]')
                    th.addClass('active').siblings('a').removeClass('active')
                }
            }
            
        }


        return {
            render: render,
            data: data,
            event: event
        }
    }
);
