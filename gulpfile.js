const gulp = require('gulp');
const { src, dest, watch, parallel, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const svgSprite = require('gulp-svg-sprite');
const include = require('gulp-include');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const gulpIf = require('gulp-if');
const path = require('path');

function styles() {
  return src('app/scss/style.scss')
    .pipe(autoprefixer({ overrideBrowserslist: ['last 3 versions'] }))
    .pipe(concat('style.min.css'))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(dest('app/public/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src('app/public/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/public/js'))
    .pipe(browserSync.stream());
}

function images() {
  return src(['app/public/images/src/*.*', '!app/public/images/src/*.svg'])
    .pipe(newer('app/public/images'))
    .pipe(avif({ quality: 50 }))

    .pipe(src('app/public/images/src/*.*'))
    .pipe(newer('app/public/images'))
    .pipe(webp())

    .pipe(src('app/public/images/src/*.*'))
    .pipe(newer('app/public/images'))
    .pipe(imagemin())

    .pipe(dest('app/public/images'));
}

function sprite() {
  return src('app/public/images/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
            example: true,
          },
        },
      }),
    )
    .pipe(dest('app/public/images'));
}

function fonts() {
  return src('app/public/fonts/src/*.*')
    .pipe(
      fonter({
        formats: ['woff', 'ttf'],
      }),
    )
    .pipe(src('app/public/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/public/fonts'));
}

function html() {
  return gulp
    .src('app/public/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('app/public'));
}

function pages() {
  return src('app/pages/*.html')
    .pipe(
      include({
        includePaths: 'app/components',
      }),
    )
    .pipe(dest('app'))
    .pipe(browserSync.stream());
}

function watching() {
  browserSync.init({
    server: {
      baseDir: 'app/public',
    },
  });
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/public/images/src'], images);
  watch(['app/public/js/main.js'], scripts);
  watch(['app/components/*', 'app/pages/*'], pages);
  watch(['app/public/*.html']).on('change', browserSync.reload);
}

function cleanDist() {
  return src('dist', { allowEmpty: true, read: false }).pipe(clean());
}

function building() {
  return src(
    [
      'app/public/css/style.min.css',
      'app/public/images/*.*',
      '!app/public/images/*.svg',
      'app/public/images/sprite.svg',
      'app/public/fonts/*.*',
      'app/public/js/main.min.js',
      'app/api/send_mail.php',
      'app/vercel.json',
      'app/composer.json',
      'app/composer.lock',
      'app/public/index.html',
      'app/template_mail.html',
      'app/.vercelignore',
    ],
    {
      base: 'app',
    },
  ).pipe(dest('dist'));
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.sprite = sprite;
exports.fonts = fonts;
exports.pages = pages;
exports.html = html;
exports.building = building;
exports.watching = watching;

exports.build = series(cleanDist, html, building);
exports.default = parallel(styles, scripts, images, fonts, pages, watching);
