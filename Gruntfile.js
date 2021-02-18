module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'estevo.andr@gmail.com',
                token: 'fea3a747-4739-47ac-9350-1b80d91ee7ac',
                branch: 'bonitao',
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
