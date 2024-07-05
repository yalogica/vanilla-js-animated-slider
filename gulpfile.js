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
    watch: {
        scss: ['src/**/*.scss'],
        scripts: ['src/**/*.js'],
        demo: ['demo/**/*.html', 'demo/**/*.css']
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
    return gulp.src(config.watch.scss, { base: 'src' })
    .pipe(cached('cache_scss'))
    .pipe(debug())
    .pipe(gsass(sass)())
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.build));
}

const do_scripts = () => {
    return gulp.src(config.watch.scripts, { base: 'src' })
    .pipe(cached('cache_scripts'))
    .pipe(debug())
    .pipe(gulp.dest(config.build));
}

const do_watch = (done) => {
    gulp.watch(config.watch.scss, gulp.series(do_scss, do_reload));
    gulp.watch(config.watch.scripts, gulp.series(do_scripts, do_reload));
    gulp.watch(config.watch.demo, gulp.series(do_reload));
    done();
}

const build = gulp.series(
    do_clean,
    do_scss,
    do_scripts,
    do_watch,
    do_browserSync
)

export default build;