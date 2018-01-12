/**
 * gulp配置文件
 */

// gulp核心包
const gulp = require('gulp');
// html压缩
const htmlmin = require('gulp-htmlmin');
// css压缩，二选一
const cssnano = require('gulp-cssnano');
const cssmin = require('gulp-minify-css');
// js压缩包
const uglify = require('gulp-uglify');
// js，css合并
const concat = require('gulp-concat');
// 压缩图片
const imagemin = require('gulp-imagemin');
// 重命名
const rename = require('gulp-rename');
// 删除文件夹
const clean = require('gulp-clean');

const babel = require('gulp-babel');

const es2015 = require('babel-preset-es2015');
/*
	Babel默认只转换新的js句法，而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（如Object.assign）都不会转码。
	例：ES6在Array对象上新增了Array.from方法。Babel就不会对其转码。必须使用babel-polyfill，为当前环境提供一个垫片。在入口文件或需要使用API的文件头部import或require
 */
const polyfill = require('babel-polyfill');

// 测试
gulp.task('test', () => {
    console.log(123);
});

// 处理html
gulp.task('html', () => {
    return gulp.src(['index.html'])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
    gulp.src(['views/*.html', 'views/**/*.html'])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/views'));
});

// 处理css
gulp.task('css', () => {
    return gulp.src(['style/*.css'])
        .pipe(cssmin({
            advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/style'));
});

// 处理js
gulp.task('js', () => {
    return gulp.src(['js/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// 处理图片
gulp.task('img', () => {
    return gulp.src(['images/*', 'images/**/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// 删除文件夹
gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

// 任务序列，执行多个任务(需要配置一个异步，加个回调，不然会边编译边删除)
gulp.task('all', ['clean'], function() {
    return gulp.start('css', 'html', 'js', 'img');
});

gulp.task('mywatch', () => {
    // 监听html
    gulp.watch(['index.html', 'views/*.html'], () => {
        gulp.run('html');
    });

    // 监听css
    gulp.watch(['style/*.css'], () => {
        gulp.run('css');
    });

    // 监听js
    gulp.watch(['js/*.js'], () => {
        gulp.run('js');
    });

    // 监听images
    gulp.watch(['images/*', 'images/**/*'], () => {
        gulp.run('img');
    });
});