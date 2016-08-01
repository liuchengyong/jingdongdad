module.exports = {
	static: {
		files: [
			// includes files within path and its sub-directories
			{
				cwd: '<%= paths.src %>',
				src: '**/*.html',
				dest: '<%= paths.dev %>'
			}
		]
	},
	assets: {
		files: [
			// includes files within path and its sub-directories
			{
				cwd: '<%= paths.src %>/assets',
				src: [
					'**/{,*/}*'
				],
				dest: '<%= paths.dev %>'
			}
		]
	}
};
