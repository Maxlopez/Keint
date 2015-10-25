
module.exports = function(grunt){
	//Cargamos todas las tareas, esto evita usar: grunt.loadNpmTasks('dependencia');
	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	// Rutas
	var app = {
		dir: 'app',
		name: 'keint',
	};

   grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),

    	app: app,

    	// TAREAS =====================================/
    	watch: {
    		// sass :{
    		// Tarea gestionada por Compass Watch
    		// },
        	js: {
        		files: ['<%= app.dir %>/js/*.js', '!<%= app.dir %>/js/<%= app.name %>.js'],
        		tasks: ['concat:dev']
        	}
		},

		compass: {
			init: {
				options: {
					sassDir: 'sass',
					cssDir: '<%= app.dir %>/css',
					noLineComments: true,
					watch: false,
					outputStyle: 'expanded', //nested, compact, compressed, expanded
					environment: 'development',
					raw: 'Encoding.default_external = \'utf-8\'\n'
				}
			},
			dev: {
				options: {
					sassDir: 'sass',
					cssDir: '<%= app.dir %>/css',
					noLineComments: true,
					watch: true,
					outputStyle: 'expanded', //nested, compact, compressed, expanded
					environment: 'development',
					raw: 'Encoding.default_external = \'utf-8\'\n'
				}
			},
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= app.dir %>/css',
					src: ['*.css', '!*.min.css'],
					dest: '<%= app.dir %>/css',
					ext: '.min.css'
				}]
			}
		},
		copy: {
			dist: {
				files: [
				  {	// Normalize
				  	expand: true,
				  	flatten: true,
				  	src: ['bower_components/normalize.css/*.css'],
				  	dest: '<%= app.dir %>/css/'
				  },
				  {	// Bootstrap Fonts
				  	expand: true,
				  	dot: true,
				  	//flatten: true,//para copiar solo archivos sin las carpetas
				  	cwd: 'bower_components/bootstrap/dist/',
				  	src: ['fonts/*'],
				  	dest: '<%= app.dir %>/'
				  },
				  {	// Bootstrap CSS
				  	expand: true,
				  	dot: true,
				  	//flatten: true,//para copiar solo archivos sin las carpetas
				  	cwd: 'bower_components/bootstrap/dist/',
				  	src: ['css/*.min.css'],
				  	dest: '<%= app.dir %>/'
				  },
				  {	// Bootstrap Js
				  	expand: true,
				  	dot: true,
				  	//flatten: true,//para copiar solo archivos sin las carpetas
				  	cwd: 'bower_components/bootstrap/dist/',
				  	src: ['js/*.min.js'],
				  	dest: '<%= app.dir %>/'
				  },
				  {	// jQuery
				  	expand: true,
				  	dot: true,
				  	//flatten: true,//para copiar solo archivos sin las carpetas
				  	cwd: 'bower_components/jquery/',
				  	src: ['jquery{,.min}.js'],
				  	dest: '<%= app.dir %>/js/'
				  },
				  {	// Modernizr
				  	expand: true,
				  	dot: true,
				  	//flatten: true,//para copiar solo archivos sin las carpetas
				  	cwd: 'bower_components/modernizr/',
				  	src: ['modernizr.js'],
				  	dest: '<%= app.dir %>/js/'
				  }
				],
			},
		},

		rename: {
			moveThis: {
				src: 'sass/*.scss',
				dest: 'sass/<%= app.name %>.scss'
			},
		},

		concat : {
			options : {
				separator: ';',
				sourceMap : false
			},
			dev: {
				src  : ['<%= app.dir %>/js/*.js', '!<%= app.dir %>/js/<%= app.name %>.js'],
				dest : '<%= app.dir %>/js/<%= app.name %>.js'
			}
		},
		uglify: {
			modernizr: {
				files: {
					'<%= app.dir %>/js/modernizr.min.js': ['<%= app.dir %>/js/modernizr.js']
				},
			}
		},

    	//Tarea para sincronizar y actualizar navegadores
		browserSync: {
			dev: {
				bsFiles: {
					src : [
						'<%= app.dir %>/**/*.html',
						'<%= app.dir %>/css/*.css',
						'<%= app.dir %>/js/<%= app.name %>.js',
						'<%= app.dir %>/**/*.php',
					],
				},
				options: {
					server: '<%= app.dir %>/',
					//proxy: 'localhost/'+projec_name, //Servidor Local
					watchTask: true // muy importante cuando se usa SASS
				},
			}
	    },
		concurrent: {
			watch: ['compass:dev', 'watch'],
		}
    });

    grunt.registerTask('default', ['compass:init', 'concat', 'uglify:modernizr', 'copy', 'browserSync', 'concurrent:watch']);
    grunt.registerTask('build', ['cssmin']);
    grunt.registerTask('bk', ['backup']);
};