module.exports = function(grunt) {
  grunt.initConfig ({
    sass: {
      dist: {
        files: {
          'public/stylesheets/style.css' : 'sass/style.scss'
        }
      }
    },
    watch: {
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      },
      jade: {
        files: ['*.jade'],
        tasks: ['jade', 'browserify']
      },
      babel: {
        files: ['views/*.jsx'],
        tasks: ['babel:jsx', 'browserify']
      },
      browserify: {
        files: ['views/js/main.js'],
        tasks: ['browserify']
      }
    },

    jade: {
      compile: {
        options: {
            client: false,
            pretty: true
        },
        files: [ {
          src: '**/*.jade',
          dest: 'public',
          expand: true,
          ext: '.html'
        } ]
      }
    },

    babel: {
      options: {
        plugins: ['transform-react-jsx'], // npm install babel-plugin-transform-react-jsx
        presets: ['es2015', 'react'] // npm install babel-preset-es2015 babel-preset-react
      },
      jsx: {
        files: [{
          expand: true,
          cwd: 'views',
          src: ['*.jsx'],
          dest: 'public/js',
          ext: '.js'
        }]
      }
    },

    browserify: {
      dist: {
        files: [ {
          src: "public/js/main.js",
          dest: "public/js/bundle.js"
        } ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('default', ['sass','jade','babel:jsx','browserify']);
};