define(
    [
        'text!./home-nav.html',
        'css!./home-nav.css'
    ],
    function(html){
        function render(){
            $('.left-nav').html(html);
        };


        //ajax请求
        function data(){

        }

        //事件
        function  event(){
            showIcon(location.hash)

            $('.home-nav-bot').on('click','a',function () {
                var $this = $(this);
                if($this.attr('href').indexOf('#') == -1){
                    return;
                }
                showIcon($this.attr('href'))
            });

            function showIcon(hash) {
                var $this = $('.home-nav-bot').find('a[href ='+hash+']');
                $('.home-nav-bot a').removeClass('active');
                $this.addClass('active');
            }
        }


        return {
            render:render,
            data:data,
            event:event
        }
    }
);

