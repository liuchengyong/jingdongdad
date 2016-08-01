module.exports = {
	livereload: {
		options: {
			livereload: '<%= ports.livereload %>'
		},
		files: [
			'<%= paths.dev %>/{,*/}*.html',
			'<%= paths.dev %>/styles/{,*/}*.css',
			'<%= paths.dev %>/js/{,*/}*.js',
			'<%= paths.dev %>/images/**/*.{jpg,png}'
		]
	},
	static: {
		files: '<%= paths.src %>/**/*.html',
		tasks: 'sync:static'
	},
	assets: {
		files: [
			'<%= paths.src %>/assets/**/*'
			],
		tasks: 'sync:assets'
	},
	scss: {
		files: '<%= paths.src %>/sass/**/*',
		tasks: ['sass','autoprefixer'],
	    options: {
			spawn: false
		}
	},
};