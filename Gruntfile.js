var jsFiles = ['src_select2/select2.js'];

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    version: grunt.file.readJSON('package.json').version,

    buildDir: 'dist',

    banner: [
      '/*!',
      ' * bootstrap-select2.js <%= version %>',
      ' * https://github.com/InWayOpenSource/bootstrap-select2.git',
      ' * Copyright 2014 InWay.pro and other contributors',
      ' * original scripts developers Igor Vaynberg (for select2), t0m & fk (for select2-bootstrap-css)',
      ' * Licensed under Apache License',
      ' */\n\n'
    ].join('\n'),

    uglify: {
      options: {
        banner: '<%= banner %>',
        //enclose: { 'window.jQuery': '$' }
      },
      js: {
        options: {
          mangle: false,
          beautify: true,
          compress: false
        },
        src: jsFiles,
        dest: '<%= buildDir %>/bootstrap-select2.js'
      },
      jsmin: {
        options: {
          mangle: true,
          compress: true
        },
        src: jsFiles,
        dest: '<%= buildDir %>/bootstrap-select2.min.js'
      }
    },

    copy: {
      locales: {
        expand: true,
        cwd: 'src_select2/',
        src: 'select2_locale_*.js',
        dest: 'dist/',
        rename: function(dest, src) { return dest + 'bootstrap_' + src }
      },
      css: {
        expand: true,
        cwd: 'src_bs2css/lib/',
        src: '*.less',
        dest: 'less/',
        options: {
          process: function(content, src) {
            return content.replace(new RegExp('\.\.\/components\/bootstrap/less(.*?)(".*)', 'g'), "./bootstrap$1.less$2");
          }
        }
      },
      less: {
        expand: true,
        cwd: 'src_bootstrap/less/',
        src: '**/*.less',
        dest: 'less/bootstrap/'
      }
    },

    less: {
      compile: {
        options: {
          strictMath: true
        },
        files: {
          'dist/<%= pkg.name %>.css': 'less/build.less',
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'dist/<%= pkg.name %>.min.css': 'dist/<%= pkg.name %>.css',
        }
      }
    },

    exec: {
      clone_s2: {
        cmd: 'test ! -e src_select2 && git clone --depth 1 https://raw.github.com/InWayOpenSource/select2.git src_select2',
        exitCode: [0,1]
      },
      clone_bs2css: {
        cmd: 'test ! -e src_bs2css && git clone --depth 1 https://raw.github.com/InWayOpenSource/bootstrap-select2-css.git src_bs2css',
        exitCode: [0,1]
      },
      clone_b: {
        cmd: 'test ! -e src_bootstrap && git clone --depth 1 https://raw.github.com/InWayOpenSource/bootstrap.git src_bootstrap',
        exitCode: [0,1]
      }
    },
    
    usebanner: {
      css: {
        options: {
          position: 'top',
          banner: '<%= banner %>',
          linebreak: true
        },
        src: ['dist/<%= pkg.name %>.css']
      }
    },

    clean: {
      boostrap: 'less',
      src: ['src_bs2css', 'src_select2', 'src_bootstrap']
    },
  });

  // aliases
  // -------

  grunt.registerTask('default', 'build');
  grunt.registerTask('css', 'less');
  grunt.registerTask('banner', 'usebanner');
  grunt.registerTask('build', ['exec:clone_s2', 'exec:clone_bs2css', 'exec:clone_b', 'copy', 'uglify', 'css', 'banner']);

  // load tasks
  // ----------

  grunt.loadNpmTasks('grunt-sed');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
};
