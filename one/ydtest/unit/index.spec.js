//npm install karma-jasmine jasmine-core phantomjs karma-phantomjs-launcher --save-dev
//karma-jasmine适配器 jasmine-core 核心库
describe("测试基本函数api",function(){
    it("+1函数应用",function(){
        expect(window.add(1)).toBe(2)
    })
})