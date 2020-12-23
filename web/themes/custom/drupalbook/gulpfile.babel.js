'use strict'

import gulp from 'gulp'
import scss from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import plumber from 'gulp-plumber'
import gif from 'gulp-if'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import terser from 'gulp-terser'
import rename from 'gulp-rename'

const liveEnv = process.argv.indexOf('--live') !== -1

// init all paths
const config = {
    'sass': {
        'src': './src/scss/**/*.scss',
        'dest': './css'
    },
    /*'css': {
      'src': './css/style.css',
      'dest': './css'
    },*/
    'js': {
        'src': './src/js/*.js',
        'dest': './js'
    }
};

let SASS_INCLUDE_PATHS = []

function handleError (err) {
    console.log(err.toString())
    this.emit('end')
}

export function sass () {
    return gulp.src(config.sass.src)
        .pipe(plumber({errorHandler: handleError}))
        .pipe(gif(!liveEnv, sourcemaps.init()))
        .pipe(scss({includePaths: SASS_INCLUDE_PATHS}))
        .pipe(autoprefixer({
/*            browsers: [
                'last 2 versions',
                'safari 8',
                'ie 11',
                'opera 12.1',
                'ios 6',
                'android 4'
            ]*/
          overrideBrowserslist:  ['last 2 versions'],
          cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gif(!liveEnv, sourcemaps.write()))
        .pipe(gulp.dest(config.sass.dest))
}

/*export function css () {
    return gulp.src(config.css.src)
        .pipe(plumber({errorHandler: handleError}))
        .pipe(gif(!liveEnv, sourcemaps.init()))
        .pipe(scss({includePaths: SASS_INCLUDE_PATHS}))
        .pipe(autoprefixer({
            browsers: [
                'last 2 versions',
                'safari 8',
                'ie 11',
                'opera 12.1',
                'ios 6',
                'android 4'
            ]
        }))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gif(!liveEnv, sourcemaps.write()))
        .pipe(gulp.dest(config.css.dest))
}*/

export function js () {
    return gulp.src(config.js.src)
        .pipe(plumber({errorHandler: handleError}))
        .pipe(gif(!liveEnv, sourcemaps.init()))
        .pipe(babel({compact: true}))
        .pipe(concat('main.min.js'))
        .pipe(terser())
        .pipe(gif(!liveEnv, sourcemaps.write()))
        .pipe(gulp.dest(config.js.dest))
}

export function watch () {
    gulp.watch(config.sass.src, sass)
    /*gulp.watch(config.css.src, css)*/
    gulp.watch(config.js.src, js)
}

function build (done) {
    return gulp.series(
        'css', 'sass', 'js',
    )(done)
}

export default build
