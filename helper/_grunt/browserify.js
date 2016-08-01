module.exports = {
	dev: {
		options: {
			external: [],
			browserifyOptions: {
				debug: true
			},
			watch: true
		},
		files:[{
			expand: true,
			cwd: '<%= paths.src %>/js/pages/',
			src: ['*.js'],
			dest:  '<%= paths.dev %>/js',
			ext: '.js'
		}]
	},
};