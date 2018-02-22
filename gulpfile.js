// Gulpfile
// Lesson url: https://semaphoreci.com/community/tutorials/getting-started-with-gulp-js

var gulp = require('gulp');
// gulp.task('name', function() {
//     //implementation of the task
// });
// 1. create a simple task to get familiar with basic methods. We will take index.html and copy it to the folder assets
gulp.task('copy', function() {
  gulp.src('index.html')
  .pipe(gulp.dest('assets'))
});
// You can also pass arrays, or use globs with src and dest:

// folder/*.html - will match all the HTML files in folder
// root/**/*.html - will match all the HTML files in all the folders from root to its children

// 2. we will use a plug-in called gulp-util. Its purpose is to log custom messages to the terminal.
var gutil = require('gulp-util');
gulp.task('log', function() {
  gutil.log('== My Log Task ==')
});

// 3. create a task to process the styles/main.scss which can be then used in our HTML file.
var sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('styles/main.scss')
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest('assets'))
});

// 4. process CoffeeScript file we will do the same as previously
var coffee = require('gulp-coffee');

gulp.task('coffee', function() {
  gulp.src('scripts/hello.coffee')
  .pipe(coffee({bare: true})
    .on('error', gutil.log))
  .pipe(gulp.dest('scripts'))
});

// 5. we will minify all the JavaScript files using gulp-uglify plug-in, and then merge them using gulp-concat.
var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('js', function() {
  gulp.src('scripts/*.js')
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('assets'))
});

// 6. Combine 4 and 5 above
gulp.task('default', ['coffee', 'js']);

// 7. Automatically do all the processing tasks when a change happens in the code
gulp.task('watch', function() {
  gulp.watch('scripts/hello.coffee', ['coffee']);
  gulp.watch('scripts/*.js', ['js']);
  gulp.watch('styles/main.scss', ['sass']);
});

// 8. Creating server for live reload
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});
// Navigate to localhost:8080 in your browser and you should see index.html
