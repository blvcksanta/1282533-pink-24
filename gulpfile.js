import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import del from 'del';
import svgmin from 'gulp-svgmin';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe (rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//  HTML

const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({collapseWhitespace: true }))
  .pipe(gulp.dest('build'))
}

// JS

const js = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'))
}

// IMG

const optimizeImg = () => {
  return gulp.src('source/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build'))
}

const webp = () => {
  return gulp.src('source/**/*.{jpg,png}')
  .pipe(squoosh({
    webp: {}
  }
  ))
  .pipe(gulp.dest('build'))
}

const copyImg = () => {
  return gulp.src('source/**/*.{jpg,png}')
  .pipe(gulp.dest('build'))
}

// Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/img/svg/**/*.svg'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

// Del

export const clean = () => {
  return del('build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload =(done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(js));
  gulp.watch('source/*.html', gulp.series(html, reload));
  // gulp.watch('source/*.html').on('change', browser.reload);
}

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImg,
  gulp.parallel(
    html,
    styles,
    js,
    webp,
  )
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImg,
  gulp.parallel(
    html,
    styles,
    js,
    webp,
  ),
  gulp.series(
    server,
    watcher
  ));
