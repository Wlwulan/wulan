 class IndexService {
    constructor(){

    }
     getData() {
         return new Promise((resolve,reject) =>{
            resolve({
                data:"Hello Index"
            });
         });
     }
 }
export default IndexService;