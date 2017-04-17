define(
    [
        'text!./pay.html',
        'css!./pay.css'
    ],
    function(html){
        function render(){
            $('.container').html(html);

        };


        //ajax请求
        function data(){

        }

        //事件
        function  event(query){
        }


        return {
            render:render,
            data:data,
            event:event
        }
    }
);
