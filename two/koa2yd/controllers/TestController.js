class TestController{
    constructor(){

    }
    actionIndex(){
        return (ctx,next) =>{
            ctx.body="hello test"
        }
    }
    actionData(){
        return (ctx,next) =>{
            ctx.body={
                data:'test123'
            }
        }
    }
}
module.exports=TestController;