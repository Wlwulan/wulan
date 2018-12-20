class TestController {
    constructor() {

    }
    actionIndex() {
        return (ctx, next) => {
            ctx.body = 'hello test'
        }
    }
}
module.exports = TestController;