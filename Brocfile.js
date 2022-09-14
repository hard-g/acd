var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var compileSass = require('broccoli-sass');
var autoprefixer = require('broccoli-autoprefixer'); 
var es6transpiler = require('broccoli-es6-transpiler');
var imagemin = require('broccoli-imagemin');
var browserify = require('broccoli-fast-browserify');

// Specify directories  
var svgsDir = 'assets/svg';
var sassDir = 'assets/sass';
var scriptDir = 'assets/app';

/*
	SVGs
*/
var appSVG = pickFiles('assets', {
  srcDir: 'svg',
  destDir: 'assets/svg'
});

/*
  WEBFONTS
*/
var fonts = pickFiles('assets', {
  srcDir: 'sass/fonts',
  destDir: 'assets/style/fonts'
});

/*
  images
*/
var images = pickFiles('assets', {
  srcDir: 'images',
  destDir: 'assets/images'
});


/*
	CSS
*/
var sass = compileSass([sassDir], 'style.scss', 'assets/style/style.css');
var appCSS = autoprefixer(sass, {
  sourcemap: true,
  browsers: ['> 1%', 'last 2 versions', 'Chrome 5', 'Firefox 6']
});

/*
	JS
*/
// var hintTree = jshint(scriptDir);
var jsTree = browserify(scriptDir, {
  bundles: {
    'assets/scripts/app.js': {
      entryPoints: ['app.js']
    }
  },
  browserify: {
    fullPaths: false
  }
});

var appJS = mergeTrees([jsTree], {overwrite: true});

module.exports = mergeTrees([appSVG, fonts, images, appCSS, appJS]);