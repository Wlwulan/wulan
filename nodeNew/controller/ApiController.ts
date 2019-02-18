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
export default class ApiController implements interfaces.Controller{
    private apiService;
    //aop 面向切面变成
    constructor(@inject(TAGS.ApiService)ApiService){
        //di
        this.apiService = ApiService
    }
    @httpGet("/test")
    private async test(ctx:Router.IRouterContext,next:()=>Promise<any>):Promise<any>{
        const result:Promise<Object> = await this.apiService.getInfo("http://localhost:4000");
        //ctx.body = result;
        return result
    }

}