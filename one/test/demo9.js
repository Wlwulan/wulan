function test(){}

test.call(this);


Reflect.call(test,this);

Reflect.metadata("yd", function(){})

Reflect.getMetadata("yd");