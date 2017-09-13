const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'calendar-bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};