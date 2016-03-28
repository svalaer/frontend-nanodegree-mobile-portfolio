const gulp = require('gulp');
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

const mincss = require("gulp-minify-css");
const replace = require("gulp-html-replace");
const sourcemap = require("gulp-sourcemaps");

const imagemin = require('gulp-imagemin');
const imageresize = require('gulp-image-resize');

const htmlmin = require('gulp-htmlmin');

const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');

gulp.task('content', function() {
    gulp.src('./src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: false}))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}))
});

gulp.task('scripts', function() {
    gulp.src('./src/**/*.js')
        // comment the next line to disbale maping js files
        .pipe(sourcemap.init({loadMaps: true}))
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        // comment the next line to disbale maping js files
        .pipe(sourcemap.write())
        .pipe(gulp.dest('./dist'))
        .pipe(reload({stream: true}))
});

gulp.task('styles', function() {
    gulp.src('src/**/*.css')
        .pipe(mincss())
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}))
});

gulp.task('thumbs', function() {
    gulp.src(['src/**/*.png','src/**/*.jpg','src/**/*.gif','src/**/*.jpeg'])
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(imageresize({
            width: 115,
            upscale : false
        }))
        .pipe(rename({suffix: "-thumb"}))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    gulp.src(['src/**/*.png','src/**/*.jpg','src/**/*.gif','src/**/*.jpeg'])
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(imageresize({
            width: 960,
            upscale : false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
    gulp.watch('./src/**/*.html', ['content']);
    gulp.watch('./src/**/*.js', ['scripts']);
    gulp.watch('./src/**/*.css', ['styles']);
});

gulp.task('default', ['images', 'thumbs', 'scripts', 'styles', 'content']);
