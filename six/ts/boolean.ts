let isDone: boolean = false;
let num: number = 1;
let str: string = '333';
let any: any = false;
let list1:number[] = [1,2,3]
var list2:Array<string>=["aa","bb"]
//枚举
enum Color{
    red=5,green,blue
}
// var ColorName:string=Color[5]
var c:Color = Color.green
//any
var notSure:any = 10;
notSure = "hello"
notSure = false
var list:any[]=[1,"hello",false];

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
function tell():void{
    alert(1)
}
export{}