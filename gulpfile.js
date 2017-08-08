"use strict";

const gulp          = require("gulp");
const sass          = require("gulp-sass");
const postcss       = require("gulp-postcss");
const mqpacker      = require("css-mqpacker");
const autoprefixer  = require("autoprefixer");
const cleanCSS      = require("gulp-clean-css");
const jshint        = require('gulp-jshint');
const stylish       = require('jshint-stylish');
const rename        = require("gulp-rename");
const del           = require("del");
const browserSync   = require("browser-sync");
const reload        = browserSync.reload;

const paths = {
  html: "src/*.html",
  css: "src/css/style.css",
  sass: "src/sass/**/*.scss",
  js: "src/js/main.js",
  img: "src/img/**/*"
}

gulp.task("style", () => {
  return gulp.src(paths.sass)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ["last 2 versions"] }),
      mqpacker({ sort: true })
    ]))
    .pipe(gulp.dest("src/css"))
    .pipe(cleanCSS({compatibility: "*"}))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("src/css"))
    .pipe(reload({stream:true}));
});

gulp.task("html", () => {
  return gulp.src(paths.html)
    .pipe(reload({stream:true}));
});

gulp.task("script", () => {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(reload({stream:true}));
});

gulp.task("browserSync", () => {
  browserSync({
    server: {
      baseDir: "./src"
    },
    port: 3000,
    // tunnel: true,
    notify: false
  });
});

gulp.task("watcher", () => {
  gulp.watch(paths.sass, ["style"]);
  gulp.watch(paths.html, ["html"]);
  gulp.watch(paths.js, ["script"]);
  gulp.watch(paths.img).on("change", reload);
});

gulp.task("default", ["watcher", "browserSync"]);
