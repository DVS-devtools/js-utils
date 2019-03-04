const path = require('path');

const buildPackageName = path.basename(process.cwd());

module.exports = {
    tags: {
        allowUnknownTags: true,
        'dictionaries': ['jsdoc']
    },
    source: {
        include: [
            './src',
            './README.md',
        ],
        includePattern: '.js$',
        excludePattern: '(node_modules/|docs|dist|examples)'
    },
    plugins: [
        'plugins/markdown'
    ],
    templates: {
        cleverLinks: false,
        monospaceLinks: true,
        useLongnameInNav: false,
        showInheritedInNav: true
    },
    opts: {
        destination: path.resolve(__dirname, 'docs', buildPackageName),
        encoding: 'utf8',
        private: true,
        recurse: true,
        template: path.resolve(__dirname, 'node_modules', 'minami')
    },
};
