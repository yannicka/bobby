const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
  entry: './src/index.ts',

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.png$/,
        use: [
          'file-loader',
        ],
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  output: {
    filename: 'app-[contenthash].js',
    path: path.resolve(__dirname, 'public'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/assets/index.html',
    }),

    new WebpackPwaManifest({
      name: 'Bobby',
      short_name: 'Bobby',
      icons: [
        {
          src: path.resolve('src/assets/icons/icon.png'),
          sizes: [ 96, 128, 192, 256, 384, 512 ],
        },
      ],
      start_url: '/',
      background_color: '#42c79c',
      display: 'standalone',
      theme_color: '#42c79c',
    }),

    new OfflinePlugin({
      caches: {
        additional: [
          ':rest:',
        ]
      },
      safeToUseOptionalCaches: true,
      updateStrategy: 'changed',
    }),
    
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
}
