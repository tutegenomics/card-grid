module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            livereload: {
                files: [
                    'src/**/*.js',
                    'src/**/*.html',
                    'src/**/*.css'
                ],
                tasks: [],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729,
                base: ['src']
            },
            livereload: {
                options: {
                    open: true
                }
            }
        }

    });

    grunt.registerTask('serve', function (target) {

        grunt.task.run([
            'connect:livereload',
            'watch:livereload'
        ]);
    });

    grunt.registerTask('default', []);
};