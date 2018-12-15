'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const browserify = require('browserify');
const tsify = require("tsify");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

function ts(cd) {
  return browserify({
    entries: ['./src/index.ts'],
    debug: true
  }).plugin(tsify)
    .transform('babelify',{
      presets: ["@babel/preset-env"],
      extensions: ['.ts']
    })
    .bundle()
    .on('error', err => console.log(`browserify ${err}`))
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({loadMaps: true}))//uglify
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/js/'));
    cd();
}
gulp.watch(['./src/index.ts']).on('change', function() {
  gulp.series(ts)
});
 exports.default = gulp.series(ts)