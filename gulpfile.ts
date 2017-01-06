/**
 * Created by SoundIt on 01-06-2017.
 */


"use strict";

const gulp = require("gulp"),
    del = require("del"),
    tsc = require("gulp-typescript"),
    sourcemaps = require('gulp-sourcemaps'),
    tsProject = tsc.createProject("tsconfig.json"),
    tslint = require('gulp-tslint'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    nodemon = require('gulp-nodemon'),
    gulpTypings = require("gulp-typings");

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del(["dist"], cb);
});

/**
 * Build Express server
 */
gulp.task('build:server', function () {
    var tsProject = tsc.createProject('server/tsconfig.json');
    var tsResult = gulp.src('server/src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/server'));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("server/src/app/**/*.ts")
        .pipe(tslint({
			formatter: "prose"
		}))
		.pipe(tslint.report());
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compileServer", ["tslint"], () => {
    let tsResult = gulp.src("server/src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/server"));
});

/**
 * Copy bin directory for www
 */
gulp.task("serverResources", () => {
    return gulp.src(["server/src/bin/**"])
        .pipe(gulp.dest("dist/server/bin"));
});

/**
 * Install typings for server and client.
 */
gulp.task("installTypings", function () {
    var stream = gulp.src(["./server/typings.json" ])
        .pipe(gulpTypings(null)); //will install all typingsfiles in pipeline.
    return stream; // by returning stream gulp can listen to events from the stream and knows when it is finished.
});

/**
 * Start the express server with nodemon
 */
gulp.task('start', function () {
    nodemon({
        script: 'dist/server/bin/www'
        , ext: 'html js'
        , ignore: ['ignored.js']
        , tasks: ['tslint']
    })
        .on('restart', function () {
            console.log('restarted!');
        });
});

/**
 * Build the project.
 * 1. Clean the build directory
 * 2. Build Express server
 * 3. Build the Angular app
 * 4. Copy the resources
 * 5. Copy the dependencies.
 */

gulp.task("build", function (callback) {
    runSequence('clean', 'build:server', 'serverResources', callback);
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {

    gulp.watch(["server/src/**/*.ts"], ['compileServer']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
});


gulp.task('default', function () {
    runSequence('build:server', 'serverResources', 'watch', 'start');
});
