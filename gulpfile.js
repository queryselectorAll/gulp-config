var gulp = require('gulp'), //基础库
    imagemin = require('gulp-imagemin'), //图片压缩
    sass = require('gulp-ruby-sass'), //sass
    minifycss = require('gulp-minify-css'), //css压缩
    // jshint = require('gulp-jshint'),           //js检查
    uglify = require('gulp-uglify'), //js压缩
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并文件
    clean = require('gulp-clean'), //清空文件夹
    tinylr = require('tiny-lr'), //livereload
    server = tinylr(),
    port = 8090,
    livereload = require('gulp-livereload'); //livereload

// HTML处理
gulp.task('html', ['clean'], function() {
    gulp.src(['views/*.html', 'views/**/*.html'])
        .pipe(livereload(server))
        .pipe(gulp.dest('dist/views'));
});

// css处理
gulp.task('css', ['clean'], function() {
    gulp.src(['style/*.css', 'style/**/*.css'])
        .pipe(gulp.dest('dist/style'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest('dist/style'));
});
// 图片处理
gulp.task('img', ['clean'], function() {
    gulp.src(['images/*'])
        .pipe(imagemin())
        .pipe(livereload(server))
        .pipe(gulp.dest('dist/images'));
});
// js处理
gulp.task('js', ['clean'], function() {
    gulp.src(['js/*.js', 'js/**/*.js'])
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(gulp.dest('dist/js'));
});

// 删除文件夹
gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('all',function(){
    gulp.start('html','css','js');
});

// 监听任务
gulp.task('watch', function() {

    server.listen(port, function(err) {
        if (err) {
            return console.log(err);
        }

        // // 监听html
        // gulp.watch(['views/*.html', 'views/**/*.html'], function(event) {
        //     gulp.run('html');
        // });

        // // 监听css
        // gulp.watch(['style/*.css', 'style/**/*.css'], function() {
        //     gulp.run('css');
        // });

        // // 监听images
        // gulp.watch('images/*', function() {
        //     gulp.run('img');
        // });

        // // 监听js
        // gulp.watch(['js/*.js', 'js/**/*.js'], function() {
        //     gulp.run('js');
        // });
    gulp.watch(['js/*','style/*.css','views/*.html'],['all'])

    });
});