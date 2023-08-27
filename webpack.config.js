// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//     entry: {
//         main: './src/index.js',
//         styles: './src/index.css'
//       },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader', 'postcss-loader'],
//       },
      
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './public/index.html',
//       filename: 'index.html',
//     }),
//   ],
//   devServer: {
//     contentBase: path.join(__dirname, 'dist'),
//     compress: true,
//     port: 9000,
//   },
// };
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    client: './src/index.js', // Точка входа для клиентской части
    server: './server.js', // Точка входа для серверной части
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Другие правила для обработки файлов клиента
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Путь до HTML-шаблона для клиента
      filename: 'index.html',
      chunks: ['client'], // Включаем только клиентскую часть
    }),
  ],
  target: 'node', // Указываем, что собираем для среды Node.js
  node: {
    __dirname: false, // Отключаем замену __dirname
  },
};