const fetch = require('node-fetch');
// fetch('http://localhost/basic/web/index.php?r=books')
//     .then(res => res.json()) // expecting a json response
//     .then(json => console.log(json[0].name));
const { URLSearchParams } = require('url');
const params = new URLSearchParams();
// const body = {
//     "Books[name]":"测试的数据",
//     "Books[author]":"测试作者"
// }
params.append("Books[name]", "测试的数据");
params.append("Books[author]", "测试作者");
fetch('http://localhost/basic/web/index.php?r=books/create', {
        method: 'POST',
        // body: JSON.stringify(body),
        // headers: {
        //     'Content-Type': 'application/x-form-urlencoded'
        // },
        body:params
    })
    .then(res => res.json()) // expecting a json response
    .then(json => console.log(json))
    .catch((err)=>{
        console.log(`😢${err}`);
    })