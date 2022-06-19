const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/date-picker.js",
    output: {
        library: {
            type: 'umd',
        },
        filename: "date-picker.js",
        path: path.resolve(__dirname, "./dist"),
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.svg$/i,
                type: 'asset/inline',
            },
            {
                test: /\.css$/i,
                use: [ "style-loader", "css-loader" ],
            },
        ]
    }
}