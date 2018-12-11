var getData100 = function(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve('100ms');
        },1000);
    });
}

var getData200 = function(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve('200ms');
        },2000);
    });
}
var getData300 = function(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            reject('reject');
        },3000);
    });
}

getData100().then(function(data){
    console.log(data);      // 100ms
    return getData200();
}).then(function(data){
    console.log(data);      // 200ms
    return getData300();
}).then(function(data){
    console.log(data);      
}, function(data){
    console.log(data);      // 'reject'
});

Promise.all([getData100(), getData200()]).then(function(data){
    console.log(data);      // [ "100ms", "200ms" ]
});

Promise.race([getData100(), getData200(), getData300()]).then(function(data){
    console.log(data);      // 100ms
});
Promise.resolve('resolve').then(function(data){
    console.log(data);      //'resolve'
})
Promise.reject('reject函数').then(function(data){
    console.log(data);
}, function(data){
    console.log(data);     //'reject函数'
})