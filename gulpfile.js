const gulp        = require('gulp');
const browsersync = require('browser-sync').create();
const sass        = require('gulp-sass');


// BrowserSync
function browserSync(done) {
    browsersync.init({
      server: {
        baseDir: "./src"
      },
      port: 3000
    });
    done();
  }
  
  // BrowserSync Reload
  function browserSyncReload(done) {
    browsersync.reload();
    done();
  }

// CSS task
function css() {
    return gulp
      .src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
      .pipe(sass({
        outputStyle: "expanded"
      }).on('error', sass.logError))
      .pipe(gulp.dest('src/css'))
      .pipe(browsersync.stream());
  }

// Move JS Files to src/js
function js() {
    return gulp
    .src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('src/js'))
    .pipe(browsersync.stream());
}

// Watch Sass & Serve
function serve(){

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], css);
    gulp.watch("src/*html", browserSyncReload);
}

// Move Fonts to src/fonts
function fonts() {
    return gulp.src('node_modules/font-awesome/fonts/*')
      .pipe(gulp.dest('src/fonts'))
  }

// Move Font Awesome CSS to src/css
  function fa() {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
      .pipe(gulp.dest('src/css'))
  }



exports.css = css;
exports.serve = serve;
exports.fonts = fonts;
exports.fa = fa;
exports.js = js;


// define complex task
const watch = gulp.parallel(serve, browserSync);
const build = gulp.series(css, js, fa, fonts, watch);

// export tasks
exports.default = build;