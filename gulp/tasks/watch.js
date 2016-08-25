import gulp from 'gulp';
import runSequence from 'run-sequence';

const localConfig = {
  scssWatchedFiles: 'src/**/*.scss',
  jsWatchedFiles: 'src/**/*.js',
  jadeWatchedFiles: 'src/**/*.jade',
  assetsWatchedFiles: 'src/assets/**/*',
  vendorJsFile: 'vendorJs.js',
  vendorCssFile: 'vendorCss.js'
};

gulp.task('watch:scss', () => {
  gulp.watch(localConfig.scssWatchedFiles, () => {
    runSequence('sass', 'uncss');
  });
});

gulp.task('watch:js', () => {
  gulp.watch(localConfig.jsWatchedFiles, () => {
    runSequence('scripts', 'uncss', 'inject');
  });
});

gulp.task('watch:jade', () => {
  gulp.watch(localConfig.jadeWatchedFiles, () => {
    runSequence('jade', 'uncss', 'inject');
  });
});

gulp.task('watch:vendor:js', () => {
  gulp.watch(localConfig.vendorJsFile, () => {
    runSequence('vendor:js', 'inject');
  });
});

gulp.task('watch:vendor:css', () => {
  gulp.watch(localConfig.vendorCssFile, ['vendor:css']);
});

gulp.task('watch:assets', () => {
  gulp.watch(localConfig.assetsWatchedFiles, ['assets']);
});

gulp.task('watch', ['watch:jade', 'watch:js', 'watch:scss', 'watch:vendor:js',
                    'watch:vendor:css', 'watch:assets']);
