var gulp = require('gulp'); //这是gulpfile.js文件内容。打包直接gulp即可
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var paths = {
scripts:['js/index.js','js/main.js']
}
// 创建一个defult任务名
gulp.task('default',function () {
//打开读取的文件，可以是数组也可以直接是一个路径js/*.js
gulp.src(paths.scripts)
.pipe(uglify()) // 压缩上面的打开的文件
.pipe(concat('all.min.js')) // 合并文件成all.min.js文件
.pipe(gulp.dest('build')) // 写入到build目录内
})