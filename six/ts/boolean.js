"use strict";
exports.__esModule = true;
var isDone = false;
var num = 1;
var str = '333';
var any = false;
var list1 = [1, 2, 3];
var list2 = ["aa", "bb"];
//枚举
var Color;
(function (Color) {
    Color[Color["red"] = 5] = "red";
    Color[Color["green"] = 6] = "green";
    Color[Color["blue"] = 7] = "blue";
})(Color || (Color = {}));
// var ColorName:string=Color[5]
var c = Color.green;
//any
var notSure = 10;
notSure = "hello";
notSure = false;
var list = [1, "hello", false];
//
// function tell(){
//     // alert (isDone)
//     // any = 4;
//     // alert(num)
//     // alert(str)
//     // alert(any)
//     // alert(list1[0])
//     // alert(list2[0])
//     //alert(c)
//     //alert(notSure)
//     alert(list[1])
// }
// tell()
function tell() {
    alert(1);
}
