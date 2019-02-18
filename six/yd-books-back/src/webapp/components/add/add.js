const add = {
    init() {
        console.log("add");
        xtag.create('x-add', class extends XTagElement {
            constructor() {
                super();
                console.log("初始化执行");
                this.datas = {
                    user: "laoyuan"
                }
            }
            '::template(true)'() {
                return `<h3>添加新闻</h3>
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">书名</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">作者</label>
                        < input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <button id="add-btn" type="button"  class="btn btn-primary">提交</button>
                </form>`
            }
            "click::event"(e){
                if(e.target.id == "add-btn"){
                    //fetch()
                    alert("请求");
                }
            }
        });
    }
}
export default add;