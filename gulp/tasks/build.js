import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', (cb) => {
  runSequence(['assets', 'jade', 'sass', 'scripts', 'uncss', 'vendor'], 'inject', cb);
});
