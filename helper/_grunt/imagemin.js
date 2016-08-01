'use strict';
//produce minified images in the dist folder
module.exports = {
	dist : {
		files : [
			{
				expand : true,
				cwd    : '<%= paths.dist %>/images',
				src    : '{,*/}*.{gif,jpeg,jpg,png}',
				dest   : '<%= paths.dist %>/images'
			}
		]
	}
};