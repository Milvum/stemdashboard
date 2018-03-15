import { DefinePlugin } from 'webpack';
import { argv } from 'yargs';
import * as fs from 'fs';
import * as path from 'path';
import * as CircularDependencyPlugin from 'circular-dependency-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as ModernizrWebpackPlugin from 'modernizr-webpack-plugin';

function getBuildEnv() {
  switch (argv.env as Environment) {
    case 'TEST':
    case 'ETEST':
    case 'ACCEPTANCE':
    case 'PRODUCTION':
      return argv.env;
    default:
      return 'TEST';
  }
}

function getBuildConfig() {
  const configContent = fs.readFileSync(path.join(__dirname, 'config', 'config.json'), { encoding: 'utf8' });
  const config = JSON.parse(configContent);

  return config[getBuildEnv()];
}

console.log(`===== ${getBuildEnv()} build =====`);

export default {
  entry: {
    main: path.join(__dirname, 'src', 'main', 'index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'public', 'build'),
    publicPath: '/build/',
    filename: 'bundle.js',
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: [/node_modules/, /build/, /__test__/],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.s?css$/,
        loader: ['webpack-extract-css-hot-reload'].concat(ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
          }, {
            loader: 'sass-loader',
          },
        ]) as string[]),
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        loader: 'file-loader?name=[name].[ext]',
        query: {
          outputPath: 'fonts/',
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
    new DefinePlugin({
      APP_ENV: JSON.stringify(getBuildEnv()),
      APP_CONFIG: JSON.stringify(getBuildConfig()),
    }),
    new ModernizrWebpackPlugin({
      'feature-detects': [
        'touchevents',
      ],
    }),
    new CircularDependencyPlugin({
      // Exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // Add errors to webpack instead of warnings
      failOnError: false,
    }),
  ],
  node: {
    fs: 'empty',
  }
};
