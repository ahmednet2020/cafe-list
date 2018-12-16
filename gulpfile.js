'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserify = require('browserify');
const tsify = require("tsify");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const mergeStream = require('merge-stream');

const copy = (cd) =>{
  return mergeStream(
    gulp.src('./src/html/**/*').pipe(gulp.dest('./public/'))
  )
  cd();
};
const ts = (cd) => {
  return browserify({
    entries: ['./src/ts/index.ts'],
    debug: true
  }).plugin(tsify)
    .transform('babelify',{
      presets: ["@babel/preset-env"],
      extensions: [".babel",".ts"]
    })
    .bundle()
    .on('error', err => console.log(`browserify ${err}`))
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/js/'));
    cd();
}

const css = (cd) => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .on('error', plugins.sass.logError)
    .pipe(plugins.postcss([ autoprefixer({browsers: 'last 2 versions'}), cssnano()]))
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css/'));
    cd();
};
gulp.watch('./src/ts/**/*.ts',ts);
gulp.watch('./src/sass/**/*.scss', css);
gulp.watch('./src/html/**/*', copy);
exports.default = gulp.series(ts, css, copy)