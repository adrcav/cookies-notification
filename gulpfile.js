const gulp = require('gulp');

const sass = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');
const wait = require('gulp-wait');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('gulp-buffer');
const tap = require('gulp-tap');

const babelify = require('babelify');

// Browser Sync
const browserSync = require('browser-sync').create();

// Files
const files = {
  src: {
    scss: './src/scss/**/*.scss',
    js: './src/js/**/*.js',
    jsRoot: './src/js/index.js'
  },
  dest: {
    css: './dist/css',
    js: './dist/js'
  }
};

const compileSCSS = () => {
  return gulp.src('./src/scss/main.scss')
    .pipe(wait(500))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoPrefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename('cookies-notification.min.css'))
    .pipe(gulp.dest(files.dest.css))
    .pipe(browserSync.stream());
};

const compileJS = () => {
  return gulp.src(files.src.jsRoot, { read: false })
    .pipe(tap((file, t) => {
      var bundler = browserify(file.path, { debug: true }).transform(babelify);
      bundler.bundle()
        .pipe(source('cookies-notification.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(files.dest.js));
    }));
};

// Watch files change
gulp.task('compile', () => {
  gulp.watch(files.src.scss, gulp.series('compile-style'));
  gulp.watch(files.src.js, gulp.series('compile-script'));
});

gulp.task('compile-style', () => compileSCSS());
gulp.task('compile-script', () => compileJS());

// Build task
gulp.task('build', gulp.series('compile-style', 'compile-script'));

// Default task
gulp.task('default', gulp.series('compile'));

// Server task
gulp.task('server', () => {
  browserSync.init({
    server: './examples/'
  });

  gulp.watch(files.src.scss, gulp.series('compile-style'));
  gulp.watch(files.src.js, gulp.series('compile-script'));
  gulp.watch('./examples/*.html', browserSync.reload);
});
