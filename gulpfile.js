var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var concat = require('gulp-concat');

gulp.task("sass", function() {
  return gulp
    .src("public/stylesheets/**/*.scss")
	.pipe(sass())
	.pipe(concat('styles.css'))
    .pipe(gulp.dest("public/css"));
});

gulp.task("watch", function() {
	gulp.watch("public/stylesheets/**/*.scss", ["sass"]);
});
