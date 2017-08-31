module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        libraryTarget: 'umd',
        library: 'aui'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel-loader",exclude: /node_modules/ },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    externals: {
        react: 'react'
    }
};
