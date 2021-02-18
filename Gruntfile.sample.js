module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: '<EMAIL>',
                token: '<TOKEN>',
                branch: '<BRANCH>',
                // server: 'season'
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**/*.{js,wasm}'],
                        flatten: true
                    }
                ]
            }
        }
    });
}
