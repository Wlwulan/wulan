//1.简单 快
//2.webpack 前端打包工具 
const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const entry = 'src/nodeuii/**/*.js';
//并行工具gulp-sequence
//开发环境
function builddev() {
    return watch(entry, {
        ignoreInitial: false
    }, function () {
        gulp.src(entry)
            .pipe(babel({
                babelrc: false,
                "plugins": [
                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                    "transform-es2015-modules-commonjs"
                ]
            }))
            .pipe(gulp.dest('dist'))
    });
}
// //上线环境
// gulp.task("buildprod", () => {
function buildprod() {
    return gulp.src(entry)
        .pipe(babel({
            babelrc: false,
            ignore: ["./src/nodeuii/config/*.js"],
            "plugins": [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                "transform-es2015-modules-commonjs"
            ]
        }))
        .pipe(gulp.dest('dist'));
}

function buildconfig() {
    return gulp.src(entry)
        .pipe(rollup({
            output: {
                format: "cjs"
            },
            input: "./src/nodeuii/config/index.js",
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('./dist'));
}
let build = gulp.series(builddev);
if (process.env.NODE_ENV == "production") {
    //这里出现了问题
    build = gulp.series(buildprod,buildconfig);
}
if (process.env.NODE_ENV == "lint") {
    build = gulp.series(buildlint);
}
gulp.task("default", build);