const superagent = require("superagent")
const app = require("./app")
function request(){
    return superagent(app.listen())
}
describe("node接口",function(){
    it("test接口测试",function(){
        request()
        .get("/test")
        
    })
})