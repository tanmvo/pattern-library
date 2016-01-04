'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		site: grunt.file.readYAML('_config.yaml'),

		assemble: {
      options: {
        flatten: false,
        partials: ['<%= site.includes %>/*.hbs'],
        helpers: ['<%= site.helpers %>/helper-*.js'],
        layout: '<%= site.layouts %>/default.hbs',
        data: ['<%= site.data %>/*.{json,yml}'],
      },
      pages: {
    		expand: true,
    		cwd: '<%= site.pages %>/',
        src: ['**/*.hbs', '*.hbs'],
        dest: 'dist/'
      }
    },
		clean: ['dist/**/*'],
		connect: {
			options: {
				port: 8000,
				livereload: 35729,
				hostname: 'localhost',
				open: {appName: 'Google Chrome'},
				base: ['dist/']
			},
			livereload: true,
		},
		copy: {
			images: {
				expand: true,
			    cwd: 'src/img/',
			    src: '**',
			    dest: 'dist/assets/img/',
			    flatten: true,
			}
		},
    sass: {},
		watch: {
			options: {
					livereload: true,
				},
			hbs: {
				files: ['./index.hbs', 'atoms/*.hbs', 'molecules/*.hbs', 'organisms/*.hbs', 'templates/*.hbs', 'pages/*.hbs'],
				tasks: ['assemble'],
			},
			less: {
				files: ['src/less/*.less'],
				tasks: ['less']
			}
		},
	});
	
	// Load npm plugins to provide necessary tasks.
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	// Grunt tasks
	grunt.registerTask('default', ['clean', 'assemble']);
	grunt.registerTask('serve', ['clean', 'copy', 'assemble', 'connect', 'watch']);
};
