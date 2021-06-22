const {
	src,
	dest,
	parallel,
	watch,
	series
} = require('gulp'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	browserSync = require('browser-sync').create()

const FilePath = {
	sassFiles: 'sass/*.sass',
	htmlFiles: 'views/*pug'
}
const {
	sassFiles,
	jsFiles,
	htmlFiles
} = FilePath;

function sassTask() {
	return src(sassFiles).pipe(sass())
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream());
}

function htmlTask() {
	return src(htmlFiles).pipe(pug({
			pretty: true
		}))
		.pipe(dest('dist'))
		.pipe(browserSync.stream());
}

function assetsTask() {
	return src('assets/**/*')
		.pipe(dest('dist/assets'));
}

function serve() {
	browserSync.init({
		server: {
			baseDir: './dist'
		}
	})
	watch([sassFiles, "sass/**/*"], sassTask);
	watch([htmlFiles, 'views/**/*.pug'], htmlTask);
}

exports.sass = sassTask;
exports.html = htmlTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, sassTask, assetsTask));
exports.serve = series(serve, parallel(htmlTask, sassTask, assetsTask));