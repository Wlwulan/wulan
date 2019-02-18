import banner from "../../components/banner/banner.js";
import list from "../../components/list/list.js";
list.init();
banner.init();
//容器的概念
// class App {
//     //所有的模块管理
//     static modules = [];
//     constructor() {
//         this.init();
//         // banner.init();
//         // list.init();
//     }
//     init() {
//         this.initModules
//     }
//     //注入
//     static use() {
//         if (Array.isArray(module)) {
//             module.map(item => App.use(item))
//         } else {
//             App.modules.push(module);
//         }
//     }
//     //执行模块
//     initModules() {
//         App.modules.map(module => module.init(this))
//     }
// };
// App.use([banner, list]);