var gulp      = require('gulp'),
    imagemin  = require('gulp-imagemin'),
    cssmin    = require('gulp-cssmin'),
    htmlmin   = require('gulp-htmlmin'),
    inline    = require('gulp-inline'),
    minline   = require('gulp-minify-inline'),
    uglify    = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    // browserSync = require("browser-sync").create(),
    // reload = browserSync.reload,
    replace = require("gulp-html-replace"),
    imageresize = require('gulp-image-resize'),
    jsmin = require('gulp-jsmin'), 
    rename = require('gulp-rename');



var config = {
    "build": "dist",
    "css": {
        "source": "css/*",
        "target": "/css"
    },
    "html": {
        "source": "*.html",
        "target": "/"
    },
    "images": {
        "source": "img/*",
        "target": "/img",
        "views": "images/"
    },
    "js": {
        "source": "js/*",
        "target": "/js"
    },
    "views": {
        "images": {
            "source": "views/images/*",
            "target": "/views/images"
        },
        "html": {
            "source": "views/*.html",
            "target": "/views"
        },
        "css": {
            "source": "views/css/*",
            "target": "/views/css"
        },
        "js": {
            "source": "views/js/*",
            "target": "/views/js"
        }
    }
};

// gulp.task('clean', function () {
//     return gulp.src('dist/*', {read: false})
//         .pipe(clean())
//         .pipe(gulp.dest('dist/'))
// });

gulp.task('clean-dist', function () {
    return gulp.src('dist/*')
        .pipe(clean({force: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
    return gulp.src(config.css.source)
        .pipe(cssmin())
        .pipe(gulp.dest(config.build + config.css.target))
});


gulp.task('html', function () {
    return gulp.src(config.html.source)
        .pipe(inline())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(minline())
        .pipe(gulp.dest(config.build + config.html.target))
});

gulp.task('img', function() {
    return gulp.src(config.images.source)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(config.build + config.images.target));
});

// gulp.task('js', function () {
//     return gulp.src(config.js.source)
//         .pipe(uglify())
//         .pipe(gulp.dest(config.build + config.js.target))
// });

gulp.task('js', function() {
    return gulp.src(config.js.source)
        .pipe(sourcemaps.init())
        //only uglify if gulp is ran with '--type production'
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build + config.js.target));
});

gulp.task('views-css', function () {
    return gulp.src(config.views.css.source)
        .pipe(cssmin())
        .pipe(gulp.dest(config.build + config.views.css.target))
});

gulp.task('views-html', function () {
    return gulp.src(config.views.html.source)
        .pipe(inline({ base: 'views/'}))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(minline())
        .pipe(gulp.dest(config.build + config.views.html.target))
});

gulp.task('views-img', function() {
    return gulp.src(config.views.images.source)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(config.build + config.views.images.target));
});

// gulp.task('views-js', function () {
//     return gulp.src(config.views.js.source)
//         .pipe(uglify())
//         .pipe(gulp.dest(config.build + config.views.js.target))
// });

gulp.task('views-js', function () {
    return gulp.src(config.views.js.source)
        .pipe(sourcemaps.init())
        //only uglify if gulp is ran with '--type production'
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build + config.views.js.target));
});

gulp.task('build', ['css', 'html', 'img', 'js','views-css', 'views-html', 'views-img', 'views-js']);

gulp.task('default', ['build']);

gulp.task('clean', ['clean-dist']);
