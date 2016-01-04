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
        dest: '<%= site.dest %>'
      }
    },
		clean: ['dist/**/*'],
		connect: {
			options: {
				port: 8000,
				livereload: 35729,
				hostname: 'localhost',
				open: {appName: 'Google Chrome'},
				base: ['<%= site.dest %>']
			},
			livereload: true,
		},
    concurrent: {
      dist: ['assemble', 'sass'],
    },
		copy: {
			images: {
				expand: true,
		    cwd: 'src/img/',
		    src: '**',
		    dest: 'dist/assets/img/',
		    flatten: true,
			},
      twbsjs: {
        expand: true,
        cwd: 'bower_components/bootstrap-sass/assets/javascripts/',
        src: 'bootstrap.min.js',
        dest: 'dist/assets/js/',
        flatten: true,
      },
		},
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= site.sass %>/',
          src: ['main.scss'],
          dest: '<%= site.dest %>/assets/css/',
          ext: '.css'
        }]
      }
    },
		watch: {
			options: {
					livereload: true,
				},
			hbs: {
				files: ['<%= site.pages%>/*.hbs', '<%= site.pages%>/**/*.hbs'],
				tasks: ['assemble'],
			},
			sass: {
				files: ['src/sass/*.scss'],
				tasks: ['newer:sass'],
        options: {
          livereload: false
        }
			},
      grunt: {
        files: ['Gruntfile.js'],
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= site.dest %>/*.html',
          '<%= site.assets %>/css/*.scss',
          '<%= site.assets %>/img/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      },
		},
	});
	
	// Load npm plugins to provide necessary tasks.
	grunt.loadNpmTasks('grunt-assemble');
	grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	// Grunt tasks
	grunt.registerTask('default', ['clean', 'assemble']);
	grunt.registerTask('serve', ['clean', 'copy', 'concurrent', 'connect', 'watch']);
};
