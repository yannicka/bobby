const path = require('path')

module.exports = {
  entry: './src/index.ts',

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [ '.ts' ],
  },

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public'),
  },
}
