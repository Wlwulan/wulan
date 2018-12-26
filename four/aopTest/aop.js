function test(){
    alert(2)
}
Function.prototype.before = function(fn){
    //fn先执行，当前函数再执行
    var __self = this;
    fn()
    __self.apply(this.arguments)
}
Function.prototype.after = function(fn){
    //先执行本身，再执行回调
    
}
test.before(function(){
    alert(1)
})