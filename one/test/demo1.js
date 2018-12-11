//LexicakEnvironment
function test() {
    var a = "yideng";
    var s = {
        name: "laoyuan"
    };
    return function () {
        // debugger;
        // eval(""); == new Function("return a");
        // with (s) {
        //     age + a;
        // }
        // try{

        // }catch(ex){

        // }
    }
}
test()();

//1.不对LexicakEnvironment任何变量进行解除绑定 保留所有的   window.eval
//2. new Function() 创建的所有的函数的Scope-> LexicakEnvironment 会 3.
//3.with 不会 浏览器一旦遇到with 放弃所有的变量回收 
//4.try的话 会回收a 不会回收ex 延长作用域链ex->LexicakEnvironment
