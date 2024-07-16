'use strict';

import gulp from 'gulp';
import rimraf from 'gulp-rimraf';
import cached from 'gulp-cached';
import debug from 'gulp-debug';
import autoprefixer from 'gulp-autoprefixer';
import * as sass from 'sass'
import gsass from 'gulp-sass';
import browserSync from 'browser-sync';

const config = {
    demo: 'demo',
    build: 'build',
    routes: {
        scss: {
            src: ['src/**/*.scss'],
            watch: ['src/**/*.scss']
        },
        js: {
            src: ['src/**/*.js'],
            watch: ['src/**/*.js']
        },
        demo: {
            watch: ['demo/**/*.html',  'demo/**/*.css']
        }
    }
}

const do_clean = () => {
    return gulp.src([config.build + '/*'], { read: false }).pipe(rimraf({ force: true }));
}

const do_browserSync = (done) => {
    browserSync({
        server: {
            baseDir: '.'
        },
        startPath: config.demo
    });
    done();
}

const do_reload = (done) => {
    browserSync.reload();
    done();
}

const do_scss = () => {
    return gulp.src(config.routes.scss.src, { base: 'src' })
    .pipe(cached('cache_scss'))
    .pipe(debug())
    .pipe(gsass(sass)())
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.build));
}

const do_js = () => {
    return gulp.src(config.routes.js.src, { base: 'src' })
    .pipe(cached('cache_js'))
    .pipe(debug())
    .pipe(gulp.dest(config.build));
}

const do_watch = (done) => {
    gulp.watch(config.routes.scss.watch, gulp.series(do_scss, do_reload));
    gulp.watch(config.routes.js.watch, gulp.series(do_js, do_reload));
    gulp.watch(config.routes.demo.watch, gulp.series(do_reload));
    done();
}

const build = gulp.series(
    do_clean,
    do_scss,
    do_js,
    do_watch,
    do_browserSync
)

export default build;