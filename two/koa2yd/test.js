const fetch = require("node-fetch")
const {URLSearchParams} = require("url")
const params = new URLSearchParams()

// const body = {
//     "Books[name]":'测试数据',
//     "Books[author]":'测试作者',
// }
params.append("Books[bookName]","测试数据")
params.append("Books[bookAuthor]","测试作者")
fetch('http://localhost/index.php?r=books/create',{
    method:'POST',
    body:params
})
    .then(res => res.json())
    .then(json => console.log(json))
    .catch((err)=>{
        console.log(`错了${err}`)
    })