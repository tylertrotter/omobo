var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {

  },
  module: {
    rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							// Provide path to the file with resources
						},
					},
        ],
      },
      {
        test: /\.vue$/,
        loaders: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
							'sass-loader',
							{
								loader: 'sass-resources-loader',
								options: {
									// Provide path to the file with resources
									resources: ['./src/sass/_theme.scss', './src/sass/_field-style.scss', './src/sass/_mixins.scss', './src/sass/_functions.scss']
								},
							},
							{
								loader: 'condition-loader',
								options: {
									chameleon: false
								}
							}
            ]
          }
          // other vue-loader options go here
				}
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
			},
			{
				test: /\.svg$/,
				loader: 'vue-svg-loader',
			},
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
