var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function() {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: ['dist/']
  }).on('restart', function() {
    console.log('Bot Restarted!');
  })
});
