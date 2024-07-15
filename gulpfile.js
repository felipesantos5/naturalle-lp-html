const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Minificar CSS
gulp.task('minify-css', () => {
  return gulp.src('styles/*.css')
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/styles'));
});

// Minificar JS
gulp.task('minify-js', () => {
  return gulp.src('scripts/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/scripts'));
});

// Copiar HTML
gulp.task('copy-html', () => {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});

// Copiar assets (imagens) recursivamente
gulp.task('copy-assets', () => {
  return gulp.src('assets/**/*.{png,svg}')
    .pipe(gulp.dest('dist/assets'));
});

// Tarefa padrão
gulp.task('default', gulp.parallel('minify-css', 'minify-js', 'copy-html', 'copy-assets'));
