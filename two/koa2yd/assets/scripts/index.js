// console.log("苹果")
// var app = new Vue({
//     el:'#app',
//     data:{
//         message:'hello vue'
//     }
// })

//前端请求
// fetch("/index/data")
//     .then((res)=>{
//         return res.json()
//     })
//     .then((res)=>{
//         console.log("后台数据",res)
//     })
class Create{
    constructor(){
        this.elBtn = $("#js-btn");
    }
    fn(){
        this.elBtn.click(function(){
            alert(1);
        })
    }
}
export default Create;