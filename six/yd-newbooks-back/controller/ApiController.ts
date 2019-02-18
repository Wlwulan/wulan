import {
    Router,
    TAGS,
    interfaces,
    TYPE,
    httpGet,
    controller,
    provideThrowable,
    inject
} from "../ioc";
@provideThrowable(TYPE.Controller,"ApiController")
@controller("/api")
export default class ApiController implements interfaces.Controller {
    private apiService;
    //AOP 面向切面编程
    constructor(@inject(TAGS.ApiService) apiService) {
        //DI 依赖注入
        this.apiService = apiService;
    }
    @httpGet("/test")
    private async test(ctx:Router.IRouterContext,next:()=>Promise<any>) :Promise<any>{
        const result:Promise<Object> = await this.apiService.getInfo("http://localhost:4000/");
        // return result;
        ctx.body = result;
    }
}