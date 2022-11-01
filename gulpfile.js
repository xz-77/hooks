/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const tsconfig = require('./tsconfig.json');

function clean() {
  return del('./lib/**');
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
  });
  return gulp.src(['src/**/*.ts']).pipe(tsProject).pipe(gulp.dest('./lib/es'));
}

function buildCJS() {
  return gulp
    .src(['lib/es/**/*.js'])
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(gulp.dest('lib/cjs/'));
}

function copyMetaFiles() {
  return gulp.src(['./README.md', './LICENSE']).pipe(gulp.dest('./lib/'));
}

function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
    declaration: true,
    emitDeclarationOnly: true,
  });
  return gulp.src(['src/**/*.ts']).pipe(tsProject).pipe(gulp.dest('lib/es/')).pipe(gulp.dest('lib/cjs/'));
}

exports.default = gulp.series(clean, buildES, buildCJS, buildDeclaration, copyMetaFiles);
