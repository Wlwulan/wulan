export interface ISafeRequest {
    getInfo(url:string,arg?:Object,callback?:Function):Promise<Object>;
}