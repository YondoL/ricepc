define(
    [
        'text!./set-nav.html',
        'css!./set-nav.css'
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

            $('.left-set-nav').on('click','.left-index-nav>a',function () {
                var $this = $(this);
                if($this.attr('href').indexOf('#') == -1){
                    return;
                }
                showIcon($this.attr('href'))
            });

            function showIcon(hash) {
                var $this = $('.left-set-nav').find('a[href ='+hash+']');
                $('.left-set-nav a').removeClass('active');
                $this.addClass('active');

                var index = $this.index();
                var dropDownWrapper = $('.drop-down-wrapper a');
                $(this).addClass('active').siblings('a').removeClass('active');
                dropDownWrapper.removeClass('active');
                dropDownWrapper.eq(index).addClass('active');
            }
        }


        return {
            render:render,
            data:data,
            event:event
        }
    }
);

