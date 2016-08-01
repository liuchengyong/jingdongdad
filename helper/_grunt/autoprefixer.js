'use strict';
// Add vendor prefixed styles
module.exports = {
	options : {
		browsers : ['last 1 version']
	},
	dist    : {
		files : [
			{
				expand : true,
				cwd    : '<%= paths.dev %>/styles/',
				src    : '{,*/}*.css',
				dest   : '<%= paths.dev %>/styles/'
			}
		]
	}
};