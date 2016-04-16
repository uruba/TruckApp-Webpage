var gulp = require("gulp");
var slim = require("gulp-slim");
var stylus = require("gulp-stylus");
var browserSync = require('browser-sync').create();

var paths = {
  dist: "dist/",
  src: "src/"
}

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: paths.dist
      }
  });
  
    gulp.watch(paths.dist.concat("**/*")).on('change', browserSync.reload);
});

gulp.task("slim", function(){
gulp.src(paths.src.concat("slim/*.slim"))
  .pipe(slim({
    pretty: false
  }))
  .pipe(gulp.dest(paths.dist));
});

gulp.task("stylus", function() {
  gulp.src(paths.src.concat("stylus/main.styl"))
  .pipe(stylus({
    paths: ['node_modules'],
    import: ['jeet/stylus/jeet', 'rupture/rupture', 'nib'],
    compress: true
  }))
  .pipe(gulp.dest(paths.dist.concat("css/")));
});

gulp.task("images", function() {
  gulp.src(paths.src.concat("img/*.{jpg,png}"))
  .pipe(gulp.dest(paths.dist.concat("images/")));
});

gulp.task("scripts", function() {
  gulp.src(paths.src.concat("js/*.{js, min.js}"))
  .pipe(gulp.dest(paths.dist.concat("js/")));
});

gulp.task("favicon", function() {
  gulp.src(paths.src.concat("favicon/*.{ico,json,png,svg,xml}"))
  .pipe(gulp.dest(paths.dist));
});

gulp.task("watch", function() {
  gulp.watch(paths.src.concat("slim/*.slim"), ["slim"]);
  gulp.watch(paths.src.concat("stylus/*.styl"), ["stylus"]);
});

gulp.task("default", ["slim", "stylus", "images", "scripts", "favicon", "browser-sync", "watch"]);