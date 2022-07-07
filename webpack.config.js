const path = require('path');

module.exports = {
  entry: {
    dashboardIndex: './src/assets/js/dashboard/index.ts',
    dashboardSurvey: './src/assets/js/dashboard/survey.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/js'),
  },
  mode: 'development',
};