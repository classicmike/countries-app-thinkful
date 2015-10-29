var dest = './build/';
var src = './src/';

module.exports = {
    destination: dest,
    indexFile: src + 'index.html',
    copy: {
        assetsToCopy: [
            src + ".nojekyll",
            src + '**/*.html',
            '!' + src + 'index.html',
            '!' + src + 'lib/index.html'
        ]
    },
    clean: {
    },
    usemin: {
    },
    connect: {
      root: src
    },
    images: {
        config: {
            src: src + 'img/**/*',
                dest: dest + 'img/'
        }
    },
    build: {
        tasks: [
            'usemin',
            'images'
        ]
    }
};