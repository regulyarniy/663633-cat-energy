"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");
var rename = require("gulp-rename");
var csso = require("gulp-csso");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var path = require("path");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var concat = require("gulp-concat");
var pump = require("pump");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");

gulp.task("clean", function() {
    return del("build");
});

gulp.task("cleanImages", function() {
    return del("source/img/*.+(jpg|png|webp|svg)");
});

gulp.task("images", function () {
  return gulp.src("source/img/unoptimized/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
return gulp.src("source/img/unoptimized/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("source/img"));
});

gulp.task("copy", function() {
  return gulp.src([
      "source/img/*.+(jpg|png|webp|svg)",
      "source/fonts/*.+(woff|woff2)",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("css", function() {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass({
      includePaths: ["node_modules/normalize-scss/sass"]
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(rename("style.min.css"))
    .pipe(csso())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("js", function(done) {
  pump([
      gulp.src("source/**/*.js"),
      concat("script.min.js"),
      uglify(),
      gulp.dest("build/js"),
      server.stream()
    ],
    done
  );
});

gulp.task("sprite", function () {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
          plugins: [{
              cleanupIDs: {
                  prefix: prefix + "-",
                  minify: true
              }
          }]
      }
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/sprite/*.svg", gulp.series("sprite", "html"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/img/*.+(jpg|png|webp|svg)", gulp.series("copy", "refresh"));
  gulp.watch("source/fonts/*.+(woff|woff2)", gulp.series("copy", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js"));
});

gulp.task("optimizeImages", gulp.series(
  "cleanImages",
  "images",
  "webp"
));

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "js",
  "sprite",
  "html"
));

gulp.task("start", gulp.series(
  "build",
  "server"
));
