module.exports = {
	options: {
		processImport: false
	},
	minify: {
		expand: true,
		cwd: '<%= paths.dist %>/styles/',
		src: ['*.css'],
		dest: '<%= paths.dist %>/styles/'
	}
};