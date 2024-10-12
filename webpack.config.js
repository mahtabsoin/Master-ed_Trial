// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel loader
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Add necessary presets
          },
        },
      },
      {
        test: /\.html$/, // Match .html files
        use: 'html-loader', // Use HTML loader
      },
      // ... other rules for different file types
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
  },
  devtool: 'source-map', // Optional: for better debugging
};
