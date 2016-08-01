'use strict';

var config = require('./helper/config.js');
module.exports = function (grunt) {

	console.log('-------------------  grunt start  -----------------');
	
	// Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

	// load only used tasks and add fallbacks for those which cannot be find
	require('jit-grunt')(grunt, {
		'replace': 'grunt-text-replace'
	});

	// measures the time each task takes
	require('time-grunt')(grunt);

	
	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, config.options);

	// Define the configuration for all the tasks
	grunt.initConfig(configs);
	
	/**
	 * tasks
	 */
	
	grunt.registerTask('dev',[
		'browserify',
		'sass',
		'autoprefixer',
		'sync',
		'browserSync',
		'watch',
	]);

	grunt.registerTask('test',[
		'browserify',
		'sass',
		'autoprefixer',
		'sync',
	]);

	grunt.registerTask('build',[
		'sass',
		'autoprefixer',
		'browserify',
		'sync',
		'copy',
		'cssmin',
		'htmlmin',
		'uglify',
		'imagemin'
	]);
};