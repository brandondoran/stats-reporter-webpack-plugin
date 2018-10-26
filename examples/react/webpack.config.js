const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
  StatsReporterPlugin,
  DataDogStatsReporter
} = require("../../lib/index");

module.exports = {
  context: path.join(__dirname, "src"),
  mode: "production",
  entry: {
    app: "./index"
  },
  output: {
    chunkFilename: "[name]-[contenthash:8].js",
    filename: "[name]-[contenthash:8].js",
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          name: "vendor",
          test: /node_modules/
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash:8].css",
      chunkFilename: "[name]-[contenthash:8].css"
    }),
    new StatsReporterPlugin({
      reporter: new DataDogStatsReporter({
        apiKey: process.env.DATADOG_API_KEY,
        metricName: "test-app.assets"
      })
    })
  ]
};
