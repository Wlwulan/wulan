function Hello(){
    var name;
    this.setName = function (argName){
        name = argName
    }
    this.sayHello = function(){
        console.log('Hello'+name)
    }
}
module.exports = Hello