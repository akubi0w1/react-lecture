var gulp = require("gulp");
var sass = require("gulp-sass");

gulp.task("sass", function () {
  return (
    gulp.src("src/assets/sass/**/*.scss")  // 取得するファイル
      .pipe(sass({ outputStyle: "expanded" }))  // コンパイル時のオプション
      .pipe(gulp.dest("src/assets/css"))  // 保存先
  );
});

gulp.task("sass-watch", function () {
  return gulp.watch("src/assets/sass/**/*.scss", function () {
    return (
      gulp.src("src/assets/sass/**/*.scss")
        .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
        .pipe(gulp.dest("src/assets/css"))
    );
  });
});