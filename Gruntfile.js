'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		site: grunt.file.readYAML('_config.yaml'),

		assemble: {
			options: {
		        flatten: true,
		        prettify: {
		          indent: 2,
		          condense: true,
		          newlines: true
		        },
		        assets: 'dist/assets/',
		        helpers: 'src/templates/helpers/*.js',
		        partials: 'src/templates/includes/*.hbs',
		        layoutdir: 'src/templates/layouts',
		        layout: 'default.hbs',
		    },
	      	globals: {
	      		files: {'dist/globals': ['globals/index.hbs']},
	      		options: {
	      			partials: 'globals/*.hbs',
	      			data: 'globals/*.json'
	      		}
	      	},
			modules: {
	      		files: {'dist/modules': ['modules/index.hbs']},
	      		options: {
	      			partials: 'modules/*.hbs',
	      			data: 'modules/*.json'
	      		}
	      	},
	      	objects: {
	      		files: {'dist/objects': ['objects/index.hbs']},
	      		options: {
	      			partials: 'objects/*.hbs',
	      			data: 'objects/*.json'
	      		}
	      	},
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
		watch: {
			options: {
					livereload: true,
				},
			hbs: {
				files: ['globals/*.hbs', 'modules/*.hbs', 'objects/*.hbs', 'templates/**/*.hbs'],
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
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	// Grunt tasks
	grunt.registerTask('default', ['clean', 'assemble']);
	grunt.registerTask('serve', ['clean', 'less', 'copy', 'assemble', 'connect', 'watch']);
};
