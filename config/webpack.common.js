const webpack = require('webpack');
const helpers = require('./helpers');


const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');


const HMR = helpers.hasProcessFlag('hot');
const AOT = helpers.hasNpmFlag('aot');


module.exports = function (options) {
  isProd = options.env === 'production';
  return {
    entry: {
      'assets/js/polyfills': './src/polyfills.ts',
      'assets/js/main': AOT ? './src/main.aot.ts' : './src/main.ts'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [helpers.root('src'), helpers.root('node_modules')]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
            'awesome-typescript-loader?{configFileName: "tsconfig.webpack.json"}',
            'angular2-template-loader',
            {
              loader: 'ng-router-loader',
              options: {
                loader: 'async-system',
                genDir: 'compiled',
                aot: AOT
              }
            }
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
          exclude: [helpers.root('src', 'styles')]
        },
        {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
          exclude: [helpers.root('src', 'styles')]
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        }, {
          test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
          loader: 'url-loader'
        }

      ]

    },
    plugins: [
      new AssetsPlugin({
        path: helpers.root('demo'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),
      new CheckerPlugin(),
      new CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['assets/js/polyfills']
      }),
      new CommonsChunkPlugin({
        name: 'vendor',
        filename: 'assets/js/vendor.js',
        chunks: ['assets/js/main'],
        minChunks: module => /node_modules\//.test(module.resource)
      }),
      // // Specify the correct order the scripts will be injected in
      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor']
      }),

      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
        helpers.root('src'), // location of your src
        {
          // your Angular Async Route paths relative to this root directory
        }
      ),
      new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' }
      ]),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency',
        inject: 'head'
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),
      new LoaderOptionsPlugin({}),

      new NormalModuleReplacementPlugin(
        /facade(\\|\/)async/,
        helpers.root('node_modules/@angular/core/src/facade/async.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)collection/,
        helpers.root('node_modules/@angular/core/src/facade/collection.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)errors/,
        helpers.root('node_modules/@angular/core/src/facade/errors.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)lang/,
        helpers.root('node_modules/@angular/core/src/facade/lang.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)math/,
        helpers.root('node_modules/@angular/core/src/facade/math.js')
      ),

      new ngcWebpack.NgcWebpackPlugin({
        disabled: !AOT,
        tsConfig: helpers.root('tsconfig.webpack.json'),
        resourceOverride: helpers.root('config/resource-override.js')
      })

    ],
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
}
