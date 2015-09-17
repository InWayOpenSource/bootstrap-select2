var jsFiles = ['src_select2/dist/js/select2.full.js'];

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    version: grunt.file.readJSON('package.json').version,

    buildDir: 'dist',

    banner: [
      '/*! bootstrap-select2.js <%= version %> | https://github.com/InWayOpenSource/bootstrap-select2/blob/master/LICENSE',
      ' * Merged version: Copyright 2014,2015 InWay.pro and other contributors',
      ' * Original source developed by Igor Vaynberg (for select2), t0m & fk (for select2-bootstrap-theme)',
      ' */\n\n'
    ].join('\n'),

    uglify: {
      options: {
        banner: '<%= banner %>',
      },
      js: {
        options: {
          mangle: false,
          beautify: true,
          compress: false
        },
        src: jsFiles,
        dest: '<%= buildDir %>/js/bootstrap-select2.js'
      },
      jsmin: {
        options: {
          mangle: true,
          compress: true
        },
        src: jsFiles,
        dest: '<%= buildDir %>/js/bootstrap-select2.min.js'
      }
    },

    subgrunt: {
        s2grunt: {
            options: {
                npmInstall: true
            },
            projects: {
                'src_select2': 'default'
            }
        }
    },

    copy: {
      locales: {
        expand: true,
        cwd: 'src_select2/dist/js/i18n',
        src: '*.js',
        dest: '<%= buildDir %>/js/select2-i18n',
        //rename: function(dest, src) { return dest + 'bootstrap_' + src }
      },
      s2css: {
        expand: true,
        cwd: 'src_select2/dist/css',
        src: 'select2.css',
        dest: 'less/',
        options: {
          process: function(content, src) {
            return content.replace(/url\('(.*?)'\)/g, "url('../images/bootstrap_$1')");
          }
        }
      },
      css: {
        expand: true,
        cwd: 'src_bs2theme/src/',
        src: '*.less',
        dest: 'less/',
        options: {
          process: function(content, src) {
            return content.replace(new RegExp('\.\.\/components\/bootstrap/less(.*?)(".*)', 'g'), "./bootstrap$1.less$2");
          }
        }
      },
      /*
      images: {
        expand: true,
        cwd: 'src_select2/',
        src: ['select2*.gif', 'select2*.png'],
        dest: '<%= buildDir %>/images/',
        rename: function(dest, src) { return dest + 'bootstrap_' + src }
      },
      */
      less: {
        expand: true,
        cwd: 'src_bootstrap/less/',
        src: '**/*.less',
        dest: 'bower_components/bootstrap/less/'
      }
    },

    less: {
      compile: {
        options: {
          strictMath: true
        },
        files: {
          'less/<%= pkg.name %>.css': 'less/build.less',
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          '<%= buildDir %>/css/<%= pkg.name %>.min.css': '<%= buildDir %>/css/<%= pkg.name %>.css',
        }
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '<%= banner %>'
      },
      dist: {
        src: ['less/select2.css', 'less/<%= pkg.name %>.css'],
        dest: '<%= buildDir %>/css/<%= pkg.name %>.css'
      }
    },

    exec: {
      clone_s2: {
        cmd: 'test ! -e src_select2 && git clone --depth 1 https://raw.github.com/InWayOpenSource/select2.git src_select2',
        exitCode: [0,1]
      },
      clone_bs2theme: {
        cmd: 'test ! -e src_bs2theme && git clone --depth 1 https://raw.github.com/InWayOpenSource/select2-bootstrap-theme.git src_bs2theme',
        exitCode: [0,1]
      },
      clone_b: {
        cmd: 'test ! -e src_bootstrap && git clone --depth 1 https://raw.github.com/InWayOpenSource/bootstrap.git src_bootstrap',
        exitCode: [0,1]
      },
      update_s2: {
        cmd: 'cd src_select2 && git pull',
      },
      update_bs2theme: {
        cmd: 'cd src_bs2theme && git pull',
      },
      update_b: {
        cmd: 'cd src_bootstrap && git pull',
      }
    },

    clean: {
      less: ['less'],
      src: ['src_bs2theme', 'src_select2', 'src_bootstrap']
    },
  });

  // aliases
  // -------

  grunt.registerTask('default', 'build');
  
  grunt.registerTask('js', ['uglify']);
  grunt.registerTask('css', ['less:compile', 'concat', 'less:minify']);
  grunt.registerTask('banner', 'usebanner');
  grunt.registerTask('clone', ['exec:clone_s2', 'exec:clone_bs2theme', 'exec:clone_b']);
  grunt.registerTask('update', ['exec:update_s2', 'exec:update_bs2theme', 'exec:update_b']);
  grunt.registerTask('build_s2', ['subgrunt:s2grunt']);

  grunt.registerTask('build', ['clone', 'update', 'build_s2', 'copy', 'js', 'css']);

  // load tasks
  // ----------

  grunt.loadNpmTasks('grunt-sed');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-subgrunt');
};
