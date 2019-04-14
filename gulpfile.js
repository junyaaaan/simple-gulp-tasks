const gulp = require('gulp')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')

// setting paths
const paths = {
  scss: './src/scss/',
  css: './dist/css/',
  jsSrc: './src/js/',
  jsDist: './dist/js/',
}

// setting SASS options
const sassOptions = {
  outputStyle: 'compressed',
}

//gulpコマンドの省略
const { watch, series, task, src, dest } = require('gulp')

// SASS
task('sass', function() {
  return src(paths.scss + '**/*.scss')
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(sass(sassOptions))
    .pipe(autoprefixer())
    .pipe(dest(paths.css))
})

// JS
task('js', function() {
  return src(paths.jsSrc + '**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(dest(paths.jsDist))
})

watch([paths.scss + '**/*.scss'], task('sass'))
watch([paths.jsSrc + '**/*.js'], task('js'))
task('default', series('sass', 'js'))
