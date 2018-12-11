
$(function(){
    $('#submit').click(function(e){
        e.preventDefault()
        $.ajax({
            url:'/receive',
            type:'get',
            data:{
                username:$("#username").val()
            },
            success:function(){

            },
            error:function(){

            }
        })
    })
})