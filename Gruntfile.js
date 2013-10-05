module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            scripts: {
                files: ['**/*.js', '**/*.scss', '**/*.html'],
                tasks: ['replace', 'compass']
            },
            options: {
                atBegin: true,
                dateFormat: function(time) {
                    grunt.log.writeln('Complete in ' + time + 's at ' + new Date().toLocaleTimeString());
                    grunt.log.writeln('Waiting for changes...');
                }
            }
        },

        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'hash',
                            replacement: '<%= new Date().getTime() %>'
                        }
                    ]
                },
                files: [
                    {src: ['public/index.html'], dest: 'public/indexCacheBusted.html'}
                ]
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'public/stylesheets/sass',
                    cssDir: 'public/stylesheets/css'
                }
            }
        }

    });




    grunt.registerTask('watchDev', ['watch']);
    grunt.registerTask('prod', ['replace']);

    // Default task(s).
    grunt.registerTask('default', ['watchDev']);

};