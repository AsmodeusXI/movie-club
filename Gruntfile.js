module.exports = function (grunt) {

    var config = require('./project.conf.js');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        clean: {
            outputDir: [config.output.dir]
        },

        concat: {
            internal: {
                src: config.input.js.internal,
                dest: config.output.js.internal
            },

            external: {
                src: config.input.js.external,
                dest: config.output.js.external
            }
        },

        connect: {
            server: {
                options: {
                    base: config.output.dir,
                    protocol: config.dev.server.protocol,
                    hostname: config.dev.server.hostname,
                    port: config.dev.server.port,
                    open: true,
                    livereload: config.dev.server.livereload
                }
            }
        },

        copy: {
            index: {
                files: [{
                    src: config.input.html.internal,
                    dest: config.output.dir,
                    expand: true,
                    flatten: true
                }]
            }
        },

        html2js: {

            options: {
                fileHeaderString: '(function (angular) {\n\'use strict\';\n',
                fileFooterString: '}(window.angular));'
            },

            main: {
                src: config.input.templates,
                dest: config.output.templates
            }
        },

        watch: {

            dist: {
                files: config.output.dir + '/*.*',
                tasks: [],
                options: {
                    livereload: config.dev.server.livereload
                }
            },

            copyIndex: {
                files: config.input.html.internal,
                tasks: 'copy:index',
            },

            concatInternal: {
                files: config.input.js.internal,
                tasks: 'concat:internal'
            },

            concatExternal: {
                files: config.input.js.external,
                tasks: 'concat:external'
            },

            html2js: {
                files: config.input.templates,
                tasks: 'html2js'
            }
        }
    });

    grunt.registerTask('compile', ['clean', 'copy', 'concat', 'html2js']);
    grunt.registerTask('serve', ['compile', 'connect', 'watch']);
};
