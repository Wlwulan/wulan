<script src="./zone.min.js"></script>
<!-- <script src="./demo4.js"></script> -->
<script src="https://cdn.staticfile.org/rxjs/6.3.3/rxjs.umd.min.js"></script>
<script>
    var log = function (info) {
        console.log(info);
    }
    Zone.current.fork({
        beforeTask: log("beforeTask")
    }).run(() => {
        const methodLog = (func) => {
                return function () {
                    console.log(`我是从${func}来的`)
                }
            },
            foo = methodLog("foo"),
            bar = methodLog("bar"),
            baz = () => {
                setTimeout(methodLog("baz in setTimeout"), 0);
            },
            obserable = rxjs.Observable.create(function (observer) {
                setTimeout(function () {
                    observer.next("end");
                    observer.complete();
                }, 0);
            });
            baz();
                foo();
                bar();
        obserable.subscribe({
            next: function (x) {
                console.warn(x);
            }
        })
    })
</script>


<script>
var s = Date.now();
function test(){}
setTimeout(function(){
    test();
    var e = Date.now();
    console.log(e-s);
})
</script>