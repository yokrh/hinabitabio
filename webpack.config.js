const Webpack = require('webpack');
const definePlugin = new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: '"production"'
  }
})
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractTextPlugin = new ExtractTextPlugin({
  filename: './css/app.bundle.css'
});
const HTMLWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HTMLWebpackPlugin({
  template: __dirname + '/src/view/index.html',
  filename: 'index.html',
  inject: 'body'
});


module.exports = {
  mode: 'production',
  entry: {
    app: __dirname + '/src/app.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [
            require('autoprefixer')({browsers: ['last 2 versions']}),
            require('postcss-nested')(),
            require('cssnano')(),
            require('postcss-assets')()
          ]
        }
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('postcss-nested')(),
                  require('autoprefixer')({browsers: ['last 2 versions']}),
                  require('cssnano')()
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader?name=img/[name].[ext]'
      },
      {
        test: /serviceworker\.js$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'file-loader?name=[name].[ext]' }
        ]
      },
      {
        test: /manifest\.json$/,
        type: 'javascript/auto',
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /favicon\.ico/,
        loader: 'file-loader?name=[name].[ext]'
      }      
    ]
  },
  plugins: [
    extractTextPlugin,
    htmlWebpackPlugin,
    definePlugin
  ],
  resolve: {
    alias: {
      'Vue': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    host: '0.0.0.0'  // with vagrant port forwarding
    //disableHostCheck: true
  }
}
