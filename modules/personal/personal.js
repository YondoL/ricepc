define(
    [
        'text!./personal.html',
        'css!./personal.css'
    ],
    function(html){
        function render(){
            $('.container').html(html);
        };


        //ajax请求
        function data(){

        }

        //事件
        function  event(){

        }


        return {
            render:render,
            data:data,
            event:event
        }
    }
);

