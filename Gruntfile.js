module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Run specific tasks when the source files change (currently any SCSS, CSS or JS file)
		watch: {
			css: {
				files: ['assets/css/*.css', 'assets/sass/*.scss'],
				tasks: ['build:css'],
				options: {
					spawn: false
				}
			},
			js: {
				files: ['assets/js/*.js', 'assets/js/*/*.js'],
				tasks: ['build:js'],
				options: {
					spawn: false
				}
			}
		},

		// Cleans the min folder when called
		clean: {
			build: {
				src: ['assets/min/*']
			}
		},

		// Processes the SASS CSS files, no minification
		sass: {
			dist: {
				options: {
					sourcemap: true
				},
				files: {
					'assets/css/main.css': 'assets/sass/main.scss'
				}
			}
		},

		// Uses 'clean-css' to minify
		cssmin: {
			add_banner: {
				options: {
					banner: '/* Source: assets/css/main.css */',
					keepSpecialComments: 0
				},
				files: {
					'assets/min/main.min.css': ['assets/css/main.css']
				}
			}
		},

		// Minify the JS
		uglify: {
			yourTask : {
				//options: {
					//beautify: true,
					//sourceMap: true
				//},
				files: {
					// Forces the correct loading of the master library first
					'assets/min/plugins.min.js': ['assets/js/lib/jquery.js', 'assets/js/lib/*.js', '!assets/js/lib/modernizer.min.js'],
					'assets/min/main.min.js': ['assets/js/main.js']
				}
			}
		},
		
		// Helps to detect errors and potential problems in JS
		jshint: {
			all: [
				'Gruntfile.js', 'assets/js/*.js',
				'!' + 'assets/js/main.min.js'
			]
		}
	});

	// Load tasks (see package.json)
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-strip');

	// Register terminal commands
	grunt.registerTask('build', ['clean', 'uglify', 'lint', 'sass', 'cssmin']);
	grunt.registerTask('build:css', ['sass', 'cssmin']);
	grunt.registerTask('build:js', ['uglify']);
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('default', ['build']);
};
