module.exports = {
	options: {
		notify: false,
		host: 'localhost',
		server: {
			baseDir: '<%= paths.dev %>',
			index: "index.html"
		},
		watchTask: true,
		ghostMode: {
			clicks: true,
			scroll: true,
			forms: true
		}
	},
	bsFiles: {
		src: [
			'<%= paths.dev %>/styles/*.css', 
			'<%= paths.dev %>/js/**/*.js',
			'<%= paths.dev %>/{,*/}*.html',
			'<%= paths.dev %>/images/*.{gif,jpeg,jpg,png}'
		]
	}
};