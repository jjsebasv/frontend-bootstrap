import gulp from 'gulp';
import uncss from 'gulp-uncss';

const localConfig = {
  src: ['./build/css/application.css'],
  dest: './build/css/out',
  html: ['./build/**/*.html']
};

gulp.task('uncss', () => {
  return gulp.src(localConfig.src)
    .pipe(uncss({
      html: localConfig.html
    }))
    .pipe(gulp.dest(localConfig.dest));
});
