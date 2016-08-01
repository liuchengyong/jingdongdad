'use strict';

module.exports = {
	dist : {
		files: [{
          expand: true,
          cwd: '<%= paths.dist %>/js',
          src: '**/*.js',
          dest:'<%= paths.dist %>/js'
        }]
	}
};