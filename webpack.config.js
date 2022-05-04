const path = require('path');

module.exports = {
    mode: "none",
    entry: "./src/index.js",
    output: {
        "path": __dirname + '/dist',
        "filename": "bundle.js"
    },
    devServer: {
        port: "auto",
        open: true,
        static: {
            directory:path.join(__dirname, 'dist')
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            }
        ],
    },

}