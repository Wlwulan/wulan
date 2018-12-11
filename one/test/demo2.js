Object.prototype.a = 'a';
Function.prototype.a = 'a1';

function Foo() {};
var yideng = new Foo();
console.log('p.a: ' + yideng.a);
// console.log(1..a);
// console.log(1.a);



//1.函数实例寻找原型链
var f1 = new Foo();
f1.__proto__ = Foo.prototype;
Foo.prototype.__proto__ = Object.prototype;
Object.prototype.__proto__ = null;

//2.函数的原型链
Foo.__proto__ = Function.prototype;
Function.prototype.__proto__ = Object.prototype;
Object.prototype.__proto__ = null;


//3.爷爷的原型链
Function.__proto__ = Function.prototype;
Object.__proto__ = Function.prototype;

//终结
function Foo(){};
console.log(Foo.__proto__ == Object.__proto__);
console.log(Foo.__proto__ == Function.__proto__);
console.log(Object.__proto__ == Function.__proto__);