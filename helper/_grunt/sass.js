module.exports = function(){
	return {
		options: {
			outputStyle: 'nested',
			sourceMap: false
		},
		dev: {
			files:[{
				expand: true,
				cwd: '<%= paths.scss %>/pages/',
				src: ['*.scss'],
				dest:  '<%= paths.dev %>/styles',
				ext: '.css'
			}]
		}
	};
};


