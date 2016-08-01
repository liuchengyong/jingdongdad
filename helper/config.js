var src = 'resources',dev = '_output',dist = 'dist';

module.exports.options = {
	config:{
		src : 'helper/_grunt/*.js'
	},
	paths:{
		src : src,
		dev : dev,
		dist : dist,
		scss : src + '/sass',
		js : src + '/js'
	},
	ports:{
		app: 3000,
		livereload: 35731
	}
};
