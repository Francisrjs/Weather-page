const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Importa el plugin

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Limpia la carpeta dist en cada build
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,   // Regla para archivos CSS
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        static: path.join(__dirname, 'dist'), // Sirve archivos estáticos desde dist
        port: 8080, // Puerto que usará el servidor
        open: true, // Abre el navegador automáticamente
        hot: true, // Habilita Hot Module Replacement
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Especifica tu archivo HTML de origen
            inject: 'body', // Inyecta los scripts en el body
        })
    ]
};
